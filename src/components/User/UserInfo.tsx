import React from "react";
import styled from "styled-components";

// components
import Input from "@components/core/Input";
import Button from "@components/core/Button";

// hooks
import useModal from "@hooks/useModal";

interface IProps {
  selectedUserData?: any;
}

/** 유저 정보 컴포넌트 */
const UserInfo = ({ selectedUserData }: IProps) => {
  const { closeModal } = useModal();
  console.log(selectedUserData);

  return (
    <Wrapper>
      <FormWrapper>
        <InfoDivider>
          <InfoImg className="info-img" />
          <ContentWrapper>
            <div className="info-wrap">
              <span className="info-label">닉네임 :&nbsp;</span>
              <span className="info-label">
                {selectedUserData.nickname || ""}
              </span>
            </div>
            <div className="info-wrap">
              <span className="info-label">이메일 :&nbsp;</span>
              <span className="info-label">
                {selectedUserData.userEmail || ""}
              </span>
            </div>
            <div className="info-wrap">
              <span className="info-label">레벨 :&nbsp;</span>
              <span className="info-label">
                {selectedUserData.level.toString() || "none"}
              </span>
            </div>
            <div className="info-wrap">
              <span className="info-label">계정 활성화 여부 :&nbsp;</span>
              <input
                type="checkbox"
                checked={selectedUserData.isActive}
                readOnly
              />
            </div>
          </ContentWrapper>
          <ContentWrapper>
            <div className="info-wrap">
              <span className="info-label">성별 :&nbsp;</span>
              <span className="info-label">
                {selectedUserData.gender || ""}
              </span>
            </div>
            <div className="info-wrap">
              <span className="info-label">경고 횟수 :&nbsp;</span>
              <span className="info-label">
                {selectedUserData.warningCnt.toString() || ""}
              </span>
            </div>
            <div className="info-wrap">
              <span className="info-label">가입 일시 :&nbsp;</span>
              <span className="info-label">
                {selectedUserData.modifiedAt || "none"}
              </span>
            </div>
            <div className="info-wrap">
              <span className="info-label">알림 수신 여부 :&nbsp;</span>
              <input
                type="checkbox"
                checked={selectedUserData.alarmActive}
                readOnly
              />
            </div>
          </ContentWrapper>
        </InfoDivider>

        <ButtonWrapper>
          <Button onClick={closeModal} buttonType="reset">
            닫기
          </Button>
        </ButtonWrapper>
      </FormWrapper>
    </Wrapper>
  );
};

export default UserInfo;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const InfoImg = styled.div`
  width: 100px;
  height: 100px;
  background-color: ${(props) => props.theme.gray};
`;

const InfoDivider = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 24px;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  .info-wrap {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  .info-label {
  }

  .info-data {
  }
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;
