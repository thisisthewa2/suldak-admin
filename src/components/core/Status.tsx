import styled from 'styled-components';

interface IProps {
  label?: string;
  type?: 'complete' | 'pending' | 'cancel';
}

interface IStyledProps {
  $type?: 'complete' | 'pending' | 'cancel';
}

/** completed, pending, cancel 상태 컴포넌트 */
const Status = ({ label, type }: IProps) => {
  return (
    <StyledStatus $type={type}>
      {label && <span className="status-label">{label}</span>}
      <div className="status-icon" />
    </StyledStatus>
  );
};

export default Status;

const StyledStatus = styled.div<IStyledProps>`
  display: flex;
  align-items: center;
  gap: 1rem;

  .status-label {
    color: ${(props) => props.theme.text.primary};
  }

  .status-icon {
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background-color: ${(props) => {
      switch (props.$type) {
        case 'complete':
          return props.theme.green;
        case 'pending':
          return props.theme.yellow;
        case 'cancel':
          return props.theme.red;
        default:
          return props.theme.green;
      }
    }};
  }
`;
