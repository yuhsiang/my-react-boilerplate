import styled from 'styled-components';

const SIZE_LARGE = 'large';
const SIZE_SMALL = 'small';
const SIZE_REGULAR = 'regular';

const TYPE_DEFAULT = 'default';
const TYPE_PRIMARY = 'primary';
const TYPE_LINK = 'link';

// const base = 1;
const SIZE_FACTOR = 0.25;
const buttonSizeMixin = (size) => {
  if (size === SIZE_SMALL) {
    return -SIZE_FACTOR;
  }
  if (size === SIZE_LARGE) {
    return SIZE_FACTOR;
  }
  return 0;
};

const buttonTypeMixin = ({ theme, type }) => {
  const interactive = `
  &:hover{
    background: ${theme.fullButtonHoverColor};
  }
  &:active{
    background: ${theme.fullButtonActiveColor};
  }`;
  if (type === TYPE_DEFAULT) {
    return `
      color: ${theme.fullButtonBackground};
      background: white;
      border: 1px solid ${theme.fullButtonBorderColor};
      &:hover{
        color: white;
        background: ${theme.fullButtonHoverColor};
      }
      &:active{
        color: white;
        background: ${theme.fullButtonActiveColor};
      }`;
  } if (type === TYPE_LINK) {
    return `
      color: ${theme.fullButtonBackground};
      text-decoration: underline;
      background: white;
      &:focus{

      }`;
  }
  return `
  color: white;
  background: ${theme.fullButtonBackground};
  border: 1px solid ${theme.fullButtonBorderColor};
  ${interactive}`;
};

export const FullButton = styled.button`
  width: 100%;
  margin: 0.25rem 0;
  letter-spacing: 1px;
  outline: none;
  font-size: ${(props) => buttonSizeMixin(props.size) + 1.25}rem;
  font-weight: 500;
  padding: ${(props) => buttonSizeMixin(props.size) + 0.25}rem 1.5rem;
  cursor: pointer;
  transition: all 200ms;
  ${(props) => buttonTypeMixin(props)}
`;

FullButton.SIZE_LARGE = SIZE_LARGE;
FullButton.SIZE_SMALL = SIZE_SMALL;
FullButton.SIZE_REGULAR = SIZE_REGULAR;
FullButton.TYPE_PRIMARY = TYPE_PRIMARY;
FullButton.TYPE_DEFAULT = TYPE_DEFAULT;
FullButton.TYPE_LINK = TYPE_LINK;

export default {
  FullButton,
};
