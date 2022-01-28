import styled from 'styled-components';

const SearchbarStyles = styled.header`
  top: 0;
  left: 0;
  position: sticky;
  z-index: 1100;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 64px;
  padding-right: ${({ theme: { spacing } }) => spacing(6)};
  padding-left: ${({ theme: { spacing } }) => spacing(6)};
  padding-top: ${({ theme: { spacing } }) => spacing(3)};
  padding-bottom: ${({ theme: { spacing } }) => spacing(3)};
  color: ${({ theme: { colors } }) => colors.white};
  background-color: ${({ theme: { colors } }) => colors.blue};
  box-shadow: ${({ theme: { options } }) => options.boxShadow};
`;

const SearchForm = styled.form`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 600px;
  background-color: #fff;
  border-radius: 3px;
  overflow: hidden;
`;

const SearchFormButton = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 48px;
  border: 0;
  opacity: 0.6;
  transition: opacity
    ${({ theme: { options } }) => `${options.time} ${options.cubic}`};
  cursor: pointer;
  outline: none;

  &:hover {
    opacity: 1;
  }
`;

const SearchFormInput = styled.input`
  display: inline-block;
  width: 100%;
  font: inherit;
  font-size: 20px;
  border: none;
  outline: none;
  padding-left: 4px;
  padding-right: 4px;

  &::placeholder {
    font: inherit;
    font-size: 18px;
  }
`;

export { SearchbarStyles, SearchForm, SearchFormButton, SearchFormInput };
