import styled from 'styled-components';

// components
import TagListFetcher from '@components/Tag/TagListFetcher';
import RowContainer from '@components/RowContainer';
import Box from '@components/core/Box';
import Title from '@components/core/Title';
import Input from '@components/core/Input';
import Button from '@components/core/Button';

// hooks
import useResponsive from '@hooks/useResponsive';
import useInput from '@hooks/useInput';
import useToastify from '@hooks/useToastify';

/** 태그 추가 페이지 */
const TagPage = () => {
  const { isTablet, isMobile } = useResponsive();
  return (
    <>
      <RowContainer isTablet={isTablet} isMobile={isMobile}>
        <Box gridColumn="6">
          <TagListFetcher tagType="주량">
            <Button />
          </TagListFetcher>
        </Box>
      </RowContainer>
    </>
  );
};

export default TagPage;
