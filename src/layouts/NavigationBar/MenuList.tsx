import { AiFillHome } from 'react-icons/ai';

export const menuList = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    path: '/',
    icon: <AiFillHome />,
  },
  {
    id: 'test',
    title: 'test',
    path: '/',
    icon: <AiFillHome />,
    submenu: [
      { id: 'test1', title: 'TEST1', path: '/test/1' },
      { id: 'test2', title: 'TEST2', path: '/test/2' },
    ],
  },
];
