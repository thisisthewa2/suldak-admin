import styled from 'styled-components';

// components
import Table from '@components/core/Table';
import Button from '@components/core/Button';

// hooks
import { useGetUserQuery } from '@hooks/apis/User/useUserQuery';
import useModal from '@hooks/useModal';

// types
import { IColumn } from '@components/core/Table';

/** 유저 목록 컴포넌트 */
const UserList = () => {
  const { openModal } = useModal();
  const { data: userList } = useGetUserQuery();

  return <></>;
};

export default UserList;
