import { AiFillHome, AiFillTag } from 'react-icons/ai';
import { MdLiquor, MdQuestionAnswer } from 'react-icons/md';
import { FaUserCog } from 'react-icons/fa';
import { HiDocumentText } from 'react-icons/hi';
import { PiTestTubeFill } from 'react-icons/pi';

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
    path: '/tag',
    icon: <AiFillTag />,
  },
  {
    id: 'user',
    title: '유저',
    path: '/user',
    icon: <FaUserCog />,
    submenu: [
      { id: 'user-common', title: '유저 관리', path: '/user/common' },
      { id: 'user-admin', title: '어드민 관리', path: '/user/admin' },
    ],
  },
  {
    id: 'question',
    title: '질문/답변',
    path: '/question',
    icon: <MdQuestionAnswer />,
  },
  {
    id: 'consent',
    title: '동의 항목',
    path: '/consent',
    icon: <HiDocumentText />,
  },
  {
    id: 'test',
    title: '실험실',
    path: '/test',
    icon: <PiTestTubeFill />,
  },
];
