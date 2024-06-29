import styled from 'styled-components';
import { BASE_URL } from '@apis/interceptor';

// components
import Table from '@components/core/Table';
import Button from '@components/core/Button';
import BannerEdit from '@components/Banner/BannerEdit';

// hooks
import { useSearchFilter } from '@hooks/useSearchFilter';
import { useDeleteBannerMutation } from '@hooks/apis/Banner/useBannerMutation';
import { useGetBannerQuery } from '@hooks/apis/Banner/useBannerQuery';
import useModal from '@hooks/useModal';

// types
import { IColumn } from '@components/core/Table';

// 배너 조회 Props
interface IProps {
  bannerCategory: string;
  isActive: boolean;
  searchKeyword?: string; // 배너 ID
}

/** 동의 항목 목록 컴포넌트 */
const BannerList = ({
  bannerCategory,
  isActive,
  searchKeyword = '',
}: IProps) => {
  const { openModal } = useModal();
  const { data: bannerList } = useGetBannerQuery({bannerCategory, isActive});
  const filteredData = useSearchFilter(bannerList?.data || [], searchKeyword, [
    'id',
  ]);

  console.log("배너리스트:", bannerList);

  // 배너 삭제
  const { mutate: deleteBanner } = useDeleteBannerMutation();

  // 배너 삭제 함수
  const handleDeleteBanner = (id: number) => {
    deleteBanner({
      id,
    });
  };

  // 배너 수정 모달 열기
  const handleOpenEditModal = (row: any) => {
    openModal({
      title: '배너 수정',
      content: <BannerEdit selectedBanner={row} />,
    });
  };

  // 배너 삭제 모달 열기
  const handleOpenDeleteModal = (id: number) => {
    openModal({
      content: <div>배너를 삭제하시겠습니까?</div>,
      onConfirm: () => handleDeleteBanner(id),
    });
  };

  // 테이블 컬럼
  const columns: IColumn[] = [
    {
      Header: '이미지',
      accessor: (row: any) => (
        <img
          src={
            row.bannerImageUrl
              ? `${BASE_URL}${row.bannerImageUrl}`
              : 'https://i.namu.wiki/i/kaaN8gvIGQkip-KfwUCHPD9G_Ls2rurrMJsvzIXVs_h0gr-w3y2YeBfEbFgtiQ3_egAtZYnwU3IqaYPjaVM1Zw7SL-9v7pqq_qHyN8QPKh45mU4QC449P6rVBaq_96_QLi9zhSvw8wsuCGR34fVuZ5Ds_9nYO4QRjouK3-ApGAY.webp'
          }
          width={100}
          height={100}
        />
      ),
      width: '20%',
    },
    {
      Header: '배너 ID',
      accessor: 'id',
      width: '40%',
    },
    {
      Header: '',
      accessor: (row: any) => (
        // JSX를 반환하는 함수를 제공할 수 있습니다.
        <ButtonWrap>
          <Button onClick={() => handleOpenEditModal(row)}>수정</Button>
          <Button
            buttonType="cancel"
            onClick={() => handleOpenDeleteModal(row.id)}
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
      <div>
        {bannerList && <Table data={filteredData} columns={columns} />}
      </div>
    </>
  );
};

export default BannerList;

const ButtonWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;
`;
