import { AiFillHome, AiFillTag } from 'react-icons/ai';
import { MdLiquor, MdQuestionAnswer } from 'react-icons/md';
import { FaUserCog } from 'react-icons/fa';
import { HiDocumentText } from 'react-icons/hi';
import { PiTestTubeFill, PiUsersThreeFill, PiFlagBannerFill } from 'react-icons/pi';

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
    path: '/liquor',
    icon: <MdLiquor />,
  },
  {
    id: 'tag',
    title: '태그',
    path: '/tag',
    icon: <AiFillTag />,
  },
  {
    id: 'banner',
    title: '배너',
    path: '/banner',
    icon: <PiFlagBannerFill />,
  },
  {
    id: 'party',
    title: '모임',
    path: '/party',
    icon: <PiUsersThreeFill />,
    submenu: [
      { id: 'party-tag', title: '모임 태그', path: '/party-tag' },
      {
        id: 'party-feedback',
        title: '모임 피드백',
        path: 'party-feedback',
      },
    ],
  },
  {
    id: 'user',
    title: '유저',
    path: '/user',
    icon: <FaUserCog />,
    submenu: [
      { id: 'user-common', title: '유저 관리', path: '/user' },
      { id: 'user-admin', title: '어드민 관리', path: '/admin' },
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
