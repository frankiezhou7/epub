const React = require('react');
const _ = require('eplodash');
// const AutoStyle = require('epui-auto-style').mixin;
// const Translatable = require('epui-intl').mixin;
const PropTypes = React.PropTypes;

const getStyles = () =>{
  let styles = {
    root: {},
  };

  return styles;
}

const Confirm = React.createClass({
  contextTypes: {
    muiTheme: PropTypes.object,
  },

  propTypes: {
    children: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.string,
    ]),
    close: PropTypes.func,
    nTextCancel: PropTypes.string,
    nTextConfirm: PropTypes.string,
    onCancel: PropTypes.func,
    onConfirm: PropTypes.func,
    renderActions: PropTypes.func,
  },

  getDefaultProps() {
    return {};
  },

  getInitialState() {
    return {};
  },

  componentDidMount() {
    let fn = this.props.renderActions;
    let actions = [{
      ref: 'cancel',
      text: 'Cancel',
      onTouchTap: this._handleTouchTapCancel,
    },{
      ref: 'confirm',
      text: 'Confirm',
      onTouchTap: this._handleTouchTapConfirm,
      primary: true,
    }];

    if (_.isFunction(fn)) {
      fn(actions);
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

    return (
      <div style={styles.root}>
        {this.props.children}
      </div>
    );
  },

  _handleTouchTapCancel() {
    let {
      close,
      onCancel,
    } = this.props;

    if (_.isFunction(close)) { close(); }
    if (_.isFunction(onCancel)) { onCancel(); }
  },

  _handleTouchTapConfirm() {
    let {
      close,
      onConfirm,
    } = this.props;

    if (_.isFunction(close)) { close(); }
    if (_.isFunction(onConfirm)) { onConfirm(); }
  },

});

module.exports = Confirm;
