import styled from 'styled-components';

// components
import Table from '@components/core/Table';
import Button from '@components/core/Button';
import TagEdit from '@components/Tag/TagEdit';

// hooks
import { useSearchFilter } from '@hooks/useSearchFilter';
import { useDeleteTagMutation } from '@hooks/apis/Tag/useTagMutation';
import { useGetTagQuery } from '@hooks/apis/Tag/useTagQuery';
import useModal from '@hooks/useModal';

// types
import { IColumn } from '@components/core/Table';

interface IProps {
  tagType: string;
  searchKeyword?: string;
  selecteTag: (row: any) => void;
}

/** 태그 목록 컴포넌트 */
const TagList = ({ tagType, searchKeyword = '', selecteTag }: IProps) => {
  const { openModal } = useModal();
  const { data: tagList } = useGetTagQuery(tagType);

  const filteredData = useSearchFilter(tagList?.data || [], searchKeyword, [
    'name',
    'id',
  ]);

  const { mutate: deleteTag } = useDeleteTagMutation();

  // 태그 삭제 확인 모달 열기
  const handleOpenDeleteModal = (priKey: number) => {
    openModal({
      content: <div>태그를 삭제하시겠습니까?</div>,
      onConfirm: () => handleDeleteTag(priKey),
    });
  };

  // 태그 삭제 함수
  const handleDeleteTag = (priKey: number) => {
    deleteTag({
      tagType: tagType,
      priKey: priKey,
    });
  };

  // 태그 수정 모달 열기
  const handleOpenEditModal = (row: any) => {
    openModal({
      title: '태그 수정',
      content: <TagEdit tagType={tagType} selectedTag={row} />,
    });
  };

  // 테이블 컬럼
  const columns: IColumn[] = [
    {
      Header: '아이디',
      accessor: 'id',
      width: '20%',
    },
    {
      Header: '태그명',
      accessor: 'name',
      width: '40%',
    },
    {
      Header: '',
      accessor: (row: any) => (
        // JSX를 반환하는 함수를 제공할 수 있습니다.
        <ButtonWrap>
          <Button onClick={() => handleOpenEditModal(row)}>수정</Button>
          <Button
            onClick={() => handleOpenDeleteModal(row.id)}
            buttonType="cancel"
          >
            삭제
          </Button>
        </ButtonWrap>
      ),
      width: '40%',
      align: 'right',
    },
  ];

  return (
    <>
      <div>{tagList && <Table data={filteredData} columns={columns} />}</div>
    </>
  );
};

export default TagList;

const ButtonWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;
`;
