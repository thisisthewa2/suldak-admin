import { AiFillHome, AiFillTag } from 'react-icons/ai';
import { MdLiquor } from 'react-icons/md';

export const menuList = [
  {
    id: 'dashboard',
    title: '대시보드',
    path: '/',
    icon: <AiFillHome />,
  },
  {
    id: 'liquor',
    title: '술',
    path: '/',
    icon: <MdLiquor />,
    submenu: [
      { id: 'add-info', title: '술 정보 추가', path: '/liquor/add-info' },
      { id: 'delete-info', title: '술 정보 삭제', path: '/liquor/delete-info' },
      { id: 'research-info', title: '술 정보 조회', path: '/liquor/research-info' },
      { id: 'manage-tag', title: '술 태그 관리', path: '/liquor/manage-tag' },
    ],
  },
  {
    id: 'tag',
    title: '태그',
    path: '/',
    icon: <AiFillTag />,
    submenu: [
      { id: 'add-tag', title: '태그 추가', path: '/tag/add' },
      { id: 'delete-tag', title: '태그 삭제', path: '/tag/delete' },
      { id: 'research-tag', title: '태그 조회', path: '/tag/research' },
    ],
  },
  {
    id: 'test',
    title: '테스트',
    path: '/test',
    icon: <AiFillHome />,
  },
];
