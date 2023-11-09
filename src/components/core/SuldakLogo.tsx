import styled from 'styled-components';
import { ReactComponent as Suldak } from '@assets/suldak_logo.svg';

interface IProps {
  color?: string;
}

/** 술닥술닥 로고 컴포넌트 */
const SuldakLogo = ({ color }: IProps) => {
  return <Suldak fill={color}></Suldak>;
};

export default SuldakLogo;
