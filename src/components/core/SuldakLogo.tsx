import styled from 'styled-components';
import { ReactComponent as SuldakWhite } from '@assets/suldak_logo.svg';
import { ReactComponent as SuldakDark } from '@assets/suldak_logo_dark.svg';

interface IProps {
  mode?: 'DARK' | 'LIGHT';
}

/** 술닥술닥 로고 컴포넌트 */
const SuldakLogo = ({ mode = 'LIGHT' }: IProps) => {
  return <>{mode === 'DARK' ? <SuldakDark /> : <SuldakWhite />}</>;
};

export default SuldakLogo;
