import styled from 'styled-components';

const BACKGROUND_PRIMARY = '#0e77ca';
const BACKGROUND_PRIMARY_HOVER = '#286090';
const BACKGROUND_PRIMARY_ACTIVE = '#204d74';
const BACKGROUND_INFO = '#2ec5f3';
const BACKGROUND_INFO_HOVER = '#269abc';
const BACKGROUND_INFO_ACTIVE = '#1b6d85';

export const ActionButton = styled.button`
  ${(props) => mixinButton(props)}

  padding: 0 15px;
  font-weight: bold;
  text-align: center;

  cursor: pointer;
  border: none;
  border-radius: 2px;
  box-shadow: 1px 1px 1px #999;
  transition: all 0.3s;
  opacity: 1;
  outline: none;
  margin-left: 5px;
`;

const mixinButton = (props) => {
  const {
    bstyle,
    bsize,
  } = props;
  let res = `
    background: ${BACKGROUND_PRIMARY};
    color: white;
    &:hover {
      background: ${BACKGROUND_PRIMARY_HOVER};
    }
    &:active {
      background: ${BACKGROUND_PRIMARY_ACTIVE};
    }
  `;
  if (bstyle === 'link') {
    // TODO
  } else if (bstyle === 'info') {
    res = `
    background: ${BACKGROUND_INFO};
    color: white;
    &:hover {
      background: ${BACKGROUND_INFO_HOVER};
    }
    &:active {
      background: ${BACKGROUND_INFO_ACTIVE};
    }
  `;
  }
  if (bsize && bsize === 'small') {
    return `
      ${res}
      height: 24px;
      line-height: 24px;
    `;
  }
  return `
    ${res}
    height: 30px;
    line-height: 30px;
  `;
};


export const FormRightActions = styled.div`
  width: 100%;
  margin-top: 20px;
  text-align: right;
`;

export const ActionIcon = styled.i`
  margin-right: 3px;
`;
