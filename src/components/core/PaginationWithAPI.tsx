import styled from 'styled-components';

interface IProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

/** 페이지네이션 */
const PaginationWithAPI = ({
  currentPage,
  totalPages,
  onPageChange,
}: IProps) => {
  // 최대 페이지네이션 버튼 수
  const maxPageButtons = 5;

  // 페이지 범위 계산
  let startPage = Math.max(currentPage - 1, 0); // startPage 수정
  let endPage = Math.min(startPage + maxPageButtons - 1, totalPages - 1); // endPage 수정

  // startPage 조정 (endPage가 최대 페이지 수보다 작으면 startPage를 조정)
  if (endPage - startPage + 1 < maxPageButtons) {
    startPage = Math.max(endPage - maxPageButtons + 1, 0); // startPage 수정
  }

  // 페이지 번호 배열 생성
  const pageNumbers = Array.from(
    { length: Math.min(endPage - startPage + 1, totalPages) },
    (_, index) => startPage + index + 1 // 페이지 번호 0부터 시작이므로 +1 수정
  );

  if (totalPages === 0) {
    return null;
  }

  return (
    <Wrapper>
      {/* 처음 페이지로 이동 */}
      <PaginationButton onClick={() => onPageChange(0)}>
        {' '}
        {/* 0으로 보내줌 */}
        &lt;&lt;
      </PaginationButton>

      {/* 이전 페이지로 이동 */}
      {currentPage > 0 && ( // currentPage가 0보다 큰 경우에만 이전 페이지로 이동할 수 있도록 수정
        <PaginationButton onClick={() => onPageChange(currentPage - 1)}>
          &lt;
        </PaginationButton>
      )}

      {/* 페이지 번호 버튼 */}
      {pageNumbers.map((page) => (
        <PaginationButton
          key={page}
          $active={currentPage === page - 1} // 현재 페이지가 해당 페이지와 같을 때 활성화
          onClick={() => onPageChange(page - 1)} // 0부터 시작하는 페이지 번호를 보내기 위해 page - 1
        >
          {page}
        </PaginationButton>
      ))}

      {/* 다음 페이지로 이동 */}
      {currentPage < totalPages - 1 && ( // currentPage가 totalPages - 1보다 작은 경우에만 다음 페이지로 이동할 수 있도록 수정
        <PaginationButton onClick={() => onPageChange(currentPage + 1)}>
          &gt;
        </PaginationButton>
      )}

      {/* 마지막 페이지로 이동 */}
      <PaginationButton onClick={() => onPageChange(totalPages - 1)}>
        {' '}
        {/* 0부터 시작하는 페이지 번호를 보내기 위해 totalPages - 1 */}
        &gt;&gt;
      </PaginationButton>
    </Wrapper>
  );
};

export default PaginationWithAPI;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 1rem 0 1rem;
  gap: 0.5rem;
`;

const PaginationButton = styled.button<{ $active?: boolean }>`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.25rem;
  border: 1px solid
    ${(props) =>
      props.$active ? props.theme.form.point : props.theme.form.border};
  background-color: transparent;
  color: ${(props) => (props.$active ? '#FFFFFF' : props.theme.text.secondary)};
  padding: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    cursor: pointer;
    color: ${(props) => props.theme.text.primary};
    background-color: ${(props) => props.theme.hoverColor};
  }
`;
