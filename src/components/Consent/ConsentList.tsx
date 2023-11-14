import styled from 'styled-components';
import { useQuery } from 'react-query';

// components
import Table from '@components/core/Table';
import Button from '@components/core/Button';
import ConsentEdit from './ConsentEdit';

// hooks
import { useSearchFilter } from '@hooks/useSearchFilter';
import useModal from '@hooks/useModal';

// apis
import ConsentApi from '@apis/services/ConsentApi';

// types
import { itemType } from '@apis/services/ConsentApi';
import { IColumn } from '@components/core/Table';

interface IProps {
  consentType: itemType;
  searchKeyword?: string;
  selectedConsent: (row: any) => void;
}

/** 동의 항목 목록 컴포넌트 */
const ConsentList = ({ consentType, searchKeyword = '', selectedConsent }: IProps) => {
  const { openModal } = useModal();
  const { data: consentList } = useQuery(
    ['consentList', consentType],
    () => ConsentApi.get({ itemType: consentType }),
    {
      suspense: true,
      useErrorBoundary: true,
      retry: false,
      refetchOnWindowFocus: false,
    }
  );
  const filteredData = useSearchFilter(consentList?.data || [], searchKeyword, 'itemText');

  // 동의 항목 수정 모달 열기
  const handleOpenEditModal = (row: any) => {
    openModal({
      title: '동의 항목 수정',
      content: <ConsentEdit selectedConsent={row} />,
    });
  };

  const stripHtml = (html: string) => {
    return html.replace(/<[^>]*>?/gm, '');
  };

  // 테이블 컬럼
  const columns: IColumn[] = [
    {
      Header: '아이디',
      accessor: 'id',
      width: '20%',
    },
    {
      Header: '항목 순서',
      accessor: 'itemSeq',
      width: '20%',
    },
    {
      Header: '내용',
      accessor: (row: any) => <>{stripHtml(row.itemText)}</>,
      width: '60%',
    },
    // {
    //   Header: '내용',
    //   accessor: 'itemText',
    //   width: '60%',
    // },
    {
      Header: '',
      accessor: (row: any) => (
        // JSX를 반환하는 함수를 제공할 수 있습니다.
        <ButtonWrap>
          <Button onClick={() => handleOpenEditModal(row)}>수정</Button>
          <Button buttonType="cancel">삭제</Button>
        </ButtonWrap>
      ),
      width: '40%',
      align: 'right',
    },
  ];

  return (
    <>
      <div>{consentList && <Table data={filteredData} columns={columns} />}</div>
    </>
  );
};

export default ConsentList;

const ButtonWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;
`;
