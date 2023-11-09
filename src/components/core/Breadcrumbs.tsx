import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import styled from 'styled-components';

// Styled-components로 Breadcrumb 스타일 정의
const BreadcrumbContainer = styled.div`
  padding: 8px 0;
  margin-bottom: 1rem;
`;

const BreadcrumbItem = styled(Link)`
  margin-right: 8px;
  text-decoration: none;
  font-size: 1.5rem;
  color: ${(props) => props.theme.text.secondary};

  &:hover {
    text-decoration: underline;
  }

  &:last-child {
    color: ${(props) => props.theme.text.primary};
    pointer-events: none;
  }
`;

const BreadcrumbSeparator = styled.span`
  margin-right: 8px;
  color: ${(props) => props.theme.text.secondary};
`;

// Breadcrumb 컴포넌트 정의
const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <BreadcrumbContainer>
      <BreadcrumbItem to="/">Dashboard</BreadcrumbItem>
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;

        return (
          <React.Fragment key={name}>
            <BreadcrumbSeparator>/</BreadcrumbSeparator>
            <BreadcrumbItem to={routeTo} aria-current={isLast ? 'page' : undefined}>
              {name}
            </BreadcrumbItem>
          </React.Fragment>
        );
      })}
    </BreadcrumbContainer>
  );
};

export default Breadcrumbs;
