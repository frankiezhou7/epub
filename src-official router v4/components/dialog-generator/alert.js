const React = require('react');
// const AutoStyle = require('epui-auto-style').mixin;
const PropTypes = React.PropTypes;
// const Translatable = require('epui-intl').mixin;
const _ = require('eplodash');

const getStyles = () =>{
  let styles = {
    root: {
      width:'100%',
      wordWrap: 'break-word',
    },
  };

  return styles;
}

const Alert = React.createClass({
  contextTypes: {
    muiTheme: PropTypes.object,
  },

  propTypes: {
    children: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.string,
    ]),
    close: PropTypes.func,
    confirmLabel : PropTypes.string,
    nButtonOk: PropTypes.string,
    onConfirm: PropTypes.func,
    renderActions: PropTypes.func,
  },

  getDefaultProps() {
    return {
      confirmLabel: ''
    };
  },

  getInitialState() {
    return {};
  },

  componentDidMount() {
    let {
      confirmLabel,
      renderActions,
    } = this.props;

    let actions = [{
      ref: 'confirm',
      text: this.props.confirmLabel || 'Close',
      onTouchTap: this._handleTouchTap,
    }];

    if (_.isFunction(renderActions)) {
      renderActions(actions);
    }
  },

  dismiss() {
    let fn = this.props.close;

    if (_.isFunction(fn)) {
      fn();
    }
  },

  render() {
    let styles = getStyles();

    return(
      <div style={styles.root}>
        {this.props.children}
      </div>
    );
  },

  _handleTouchTap() {
    let {
      close,
      onConfirm,
    } = this.props;

    if (_.isFunction(close)) {
      close();
    }

    if (_.isFunction(onConfirm)) {
      onConfirm();
    }
  },
});

module.exports = Alert;
