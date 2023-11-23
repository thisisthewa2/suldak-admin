import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { menuList } from './MenuList';
import { useNavigate } from 'react-router-dom';

// components

// icons
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';

/** 화면 좌측 네비게이션바 */
const NavigationBar = () => {
  const navigate = useNavigate();
  // sidebar on/off 상태
  const [isOpen, setIsOpen] = useState<boolean>(true);

  // sidebar submenu 상태
  const [activeMenu, setActiveMenu] = useState<string>('');

  // 메뉴 활성화 함수
  const handleActiveMenu = (menuID: string) => {
    setActiveMenu(activeMenu === menuID ? '' : menuID);
  };

  // 네비게이션 함수
  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <>
      {menuList.length > 0 &&
        (isOpen ? (
          // on 상태의 네비게이션
          <NavigationWrapper $isOpen={isOpen}>
            {menuList.map((menu: any) => (
              <div key={menu.id}>
                <MenuWrap
                  onClick={() => {
                    // 서브 메뉴가 있을 경우 해당 메뉴 열기
                    if (menu.submenu) {
                      handleActiveMenu(menu.id);
                    }
                    // 서브 메뉴가 없을 경우 라우팅
                    if (!menu.submenu) {
                      handleNavigate(menu.path);
                    }
                  }}
                >
                  <div className="menu-flex-box">
                    {menu.icon}
                    <span>{menu.title}</span>
                  </div>
                  {menu.submenu && (activeMenu === menu.id ? <IoIosArrowUp /> : <IoIosArrowDown />)}
                </MenuWrap>

                {/* submenu */}
                {menu.submenu && (
                  <SubMenuWrap $isActive={activeMenu === menu.id}>
                    {menu.submenu.map((submenu: any, index: number) => (
                      <div
                        className="sub-menu"
                        key={index}
                        onClick={() => handleNavigate(submenu.path)}
                      >
                        <span>{submenu.title}</span>
                      </div>
                    ))}
                  </SubMenuWrap>
                )}
              </div>
            ))}
          </NavigationWrapper>
        ) : (
          <></>
        ))}
    </>
  );
};

export default NavigationBar;

const NavigationWrapper = styled.div<{ $isOpen: boolean }>`
  min-width: ${(props) => (props.$isOpen ? '200px' : '80px')};
  height: 100%;
  background-color: ${(props) => props.theme.nav.bgColor};
  box-shadow: ${(props) => props.theme.boxShadow};
  transition: width 0.2s ease-in;
  font-size: 1.1rem;
  position: fixed;
  top: 70px;
`;

const MenuWrap = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.2rem;
  gap: 1rem;
  color: ${(props) => props.theme.nav.textColor};
  transition: all 0.2s;

  &:hover {
    cursor: pointer;
    background-color: ${(props) => props.theme.nav.hoverColor};
  }

  .menu-flex-box {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
`;

const SubMenuWrap = styled.div<{ $isActive: boolean }>`
  /* display: ${({ $isActive }) => ($isActive ? 'block' : 'none')}; */
  max-height: ${({ $isActive }) => ($isActive ? '200px' : '0')};
  overflow: hidden;
  transition: max-height 0.3s ease-in-out; // 부드러운 전환 효과
  width: 100%;
  color: ${(props) => props.theme.nav.textColor};

  .sub-menu {
    width: 100%;
    padding: 0.5rem 0 0.5rem 4rem;
    font-size: 1rem;
    transition: all 0.2s;

    &:hover {
      cursor: pointer;
      background-color: ${(props) => props.theme.nav.hoverColor};
    }
  }
`;
