import { useGetNoticeQuery } from '@hooks/apis/Notice/useNoticeQuery';
import styled from 'styled-components';

import Table, { type IColumn } from '@components/core/Table';
import Button from '@components/core/Button';
import { formatKoreanDate } from '@libs/formatDatetime';
import useModal from '@hooks/useModal';
import NoticeEdit from './NoticeEdit';
import { Suspense } from 'react';

export default function NoticeList() {
  const { data: noticeList } = useGetNoticeQuery();
  const { openModal } = useModal();

  const handleOpenEditModal = (noticeId: number) => {
    openModal({
      title: '공지사항 수정',
      content: (
        <Suspense>
          <NoticeEdit noticeId={noticeId} />
        </Suspense>
      ),
      isCloseBtn: true,
    });
  };

  return (
    <>
      <NoticeItemWrap>
        {noticeList?.map((item: { noticeId: number; title: string; createdAt: string; modifiedAt: string }) => (
          <NoticeItem>
            <span>{item.title}</span>

            <RightWrapper>
              <DateWrapper>
                <span>작성일 : {formatKoreanDate(item.createdAt)}</span>
                <span>수정일 : {formatKoreanDate(item.modifiedAt)}</span>
              </DateWrapper>

              <Button onClick={() => handleOpenEditModal(item.noticeId)}>수정</Button>
            </RightWrapper>
          </NoticeItem>
        ))}
      </NoticeItemWrap>
    </>
  );
}

const NoticeItemWrap = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const NoticeItem = styled.li`
  width: 100%;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const DateWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RightWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;
