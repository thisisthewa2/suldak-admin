import styled from 'styled-components';

interface IProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

/** 페이지네이션 */
const Pagination = ({ currentPage, totalPages, onPageChange }: IProps) => {
  // 최대 페이지네이션 버튼 수
  const maxPageButtons = 5;

  // 페이지 범위 계산
  let startPage = Math.max(currentPage - 2, 1);
  let endPage = Math.min(startPage + maxPageButtons - 1, totalPages);

  // startPage 조정 (endPage가 최대 페이지 수보다 작으면 startPage를 조정)
  if (endPage - startPage + 1 < maxPageButtons) {
    startPage = Math.max(endPage - maxPageButtons + 1, 1);
  }

  // 페이지 번호 배열 생성
  const pageNumbers = Array.from(
    { length: Math.min(endPage - startPage + 1, totalPages) },
    (_, index) => startPage + index
  );

  if (totalPages === 0) {
    return null;
  }

  return (
    <Wrapper>
      {/* 처음 페이지로 이동 */}

      <PaginationButton onClick={() => onPageChange(1)}>&lt;&lt;</PaginationButton>

      {/* 이전 페이지로 이동 */}
      {currentPage > 1 && (
        <PaginationButton onClick={() => onPageChange(currentPage - 1)}>&lt;</PaginationButton>
      )}

      {/* 페이지 번호 버튼 */}
      {pageNumbers.map((page) => (
        <PaginationButton
          key={page}
          $active={currentPage === page}
          onClick={() => onPageChange(page)}
        >
          {page}
        </PaginationButton>
      ))}

      {/* 다음 페이지로 이동 */}
      {currentPage < totalPages && (
        <PaginationButton onClick={() => onPageChange(currentPage + 1)}>&gt;</PaginationButton>
      )}

      {/* 마지막 페이지로 이동 */}
      <PaginationButton onClick={() => onPageChange(totalPages)}>&gt;&gt;</PaginationButton>
    </Wrapper>
  );
};

export default Pagination;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  gap: 0.5rem;
`;

const PaginationButton = styled.button<{ $active?: boolean }>`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 1px solid ${(props) => props.theme.form.border};
  background-color: ${(props) => (props.$active ? props.theme.form.tableHeaderBg : 'transparent')};
  color: ${(props) => (props.$active ? '#FFFFFF' : props.theme.text.secondary)};
  padding: 0.5rem;

  &:hover {
    cursor: pointer;
    color: ${(props) => props.theme.text.primary};
    background-color: ${(props) =>
      props.$active ? props.theme.form.tableHeaderBg : props.theme.hoverColor};
  }
`;
