
import { atom } from 'jotai';

// 인풋 값을 관리할 atom을 생성합니다.
// 각 인풋이 고유한 atom을 참조하려면 이를 전역으로 정의해야 합니다.
export const inputAtom = atom('');
