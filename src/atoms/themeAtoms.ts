import { atomWithStorage } from 'jotai/utils'

// 테마 상태
export const themeMode = atomWithStorage<string>('theme', 'DARK');

