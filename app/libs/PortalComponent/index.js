import { Component } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

/* eslint-disable */
const setStyle = (element, style) => {
  if (!style || !element || typeof style === 'undefined') {
    return;
  }
  Object.keys(style).forEach((item) => {
    element.style[item] = style[item];
  });
};
/* eslint-enable */

const elementTag = 'div';
const baseId = 'modal-root';
const getBaseId = (propId) => propId || baseId;

class PortalComponent extends Component {
  static propTypes = {
    zIndex: PropTypes.number,
    baseId: PropTypes.string,
    baseStyle: PropTypes.object,
    children: PropTypes.any.isRequired,
  }
  static defaultProps = {
    baseId,
    zIndex: 3,
    baseStyle: {
      position: 'relative',
      zIndex: 3,
    },
  }
  constructor(props) {
    super(props);
    const bId = getBaseId(props.baseId);
    this.$modal = document.getElementById(bId);
    if (!this.$modal) {
      this.$modal = document.createElement(elementTag);
      this.$modal.id = bId;
      let baseStyle;
      if (props.zIndex) {
        baseStyle = {
          position: 'relative',
          zIndex: props.zIndex,
        };
      } else {
        baseStyle = props.baseStyle;
      }
      setStyle(this.$modal, baseStyle);
      document.body.appendChild(this.$modal);
    }
  }

  componentWillUnmount() {
    if (this.$modal) {
      this.$modal.remove();
    }
    this.$modal = null;
    this.$element = null;
  }

  $modal = null;
  $element = null;

  render() {
    if (!this.$modal) {
      return null;
    }
    return createPortal(
      this.props.children,
      this.$modal,
    );
  }
}

export default PortalComponent;
