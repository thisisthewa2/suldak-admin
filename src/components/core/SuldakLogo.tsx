import styled from 'styled-components';
import { ReactComponent as Suldak } from '@assets/suldak_logo.svg';

interface IProps {
  mode?: 'DARK' | 'LIGHT';
}

/** 술닥술닥 로고 컴포넌트 */
const SuldakLogo = ({ mode = 'LIGHT' }: IProps) => {
  return <>{mode === 'LIGHT' ? <SuldakWhite /> : <SuldakDark />}</>;
};

export default SuldakLogo;

const SuldakWhite = styled(Suldak)`
  color: #f3f3f4;
`;

const SuldakDark = styled(Suldak)`
  color: #1e222d;
`;
