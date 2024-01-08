import styled from "styled-components";

// components
import Table from "@components/core/Table";
import Button from "@components/core/Button";
import UserInfo from "@components/User/UserInfo";

// hooks
import { useGetUserQuery } from "@hooks/apis/User/useUserQuery";
import { useSearchFilter } from "@hooks/useSearchFilter";
import useModal from "@hooks/useModal";

// types
import { IColumn } from "@components/core/Table";

interface IProps {
  searchKeyword?: string;
  selectUser: (row: any) => void;
}

/** 유저 목록 컴포넌트 */
const UserList = ({ searchKeyword = "", selectUser }: IProps) => {
  const { openModal } = useModal();
  const { data: userList } = useGetUserQuery();
  const filteredData = useSearchFilter(userList?.data || [], searchKeyword, [
    "nickname",
    "userEmail",
  ]);

  // 유저 상세 정보 모달 열기
  const handleOpenInfoModal = (userData: any) => {
    openModal({
      title: "유저 상세 정보",
      content: <UserInfo selectedUserData={userData} />,
    });
  };

  // 테이블 컬럼
  const columns: IColumn[] = [
    {
      Header: "이메일",
      accessor: "userEmail",
      width: "10%",
    },
    {
      Header: "닉네임",
      accessor: "nickname",
      width: "10%",
    },
    {
      Header: "경고 횟수",
      accessor: "warningCnt",
      width: "5%",
    },
    {
      Header: "",
      accessor: (row: any) => (
        <ButtonWrap>
          <Button
            onClick={() => {
              selectUser(row);
              handleOpenInfoModal(row);
            }}
          >
            상세
          </Button>
        </ButtonWrap>
      ),
      width: "10%",
    },
  ];

  return (
    <TableWrap>
      {userList && <Table data={filteredData} columns={columns} />}
    </TableWrap>
  );
};

export default UserList;

const ButtonWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;
`;

const TableWrap = styled.div`
  width: 100%;
  height: 100%;
`;
