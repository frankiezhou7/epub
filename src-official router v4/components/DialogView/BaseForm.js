import React, { PropTypes } from 'react';
import _ from 'eplodash';
import ClearFix from 'epui-md/lib/internal/ClearFix';
import Paper from 'epui-md/lib/Paper';

const getStyles = (props, state, context) => {
  let {
    contentStyle,
    style,
  } = props;

  let styles = {
    root: {
      width: '540px',
      height: '590px',
      margin: '100px auto',
    },
    title: {
      width: '100%',
      height: '73px',
      backgroundColor: '#004588',
    },
    p: {
      display: 'inline-block',
      margin: '26px 40px',
      fontSize: '26px',
      fontWeight: '800',
      color: '#ffffff',
    },
    content: {
      width: '460px',
      height: '420px',
      padding: '20px 40px 0 40px',
    },
    footer: {
      width: '460px',
      height: '36px',
      padding: '20px 40px',
    },
  };

  styles.root = _.merge(styles.root, style);
  styles.content = _.merge(styles.content, contentStyle);

  return styles;
};

export default class BaseForm extends React.Component{

  static contextTypes = {
    muiTheme: PropTypes.object,
  };

  static propTypes = {
    content: PropTypes.object,
    contentStyle: PropTypes.object,
    footer: PropTypes.object,
    hideFooter: PropTypes.bool,
    style: PropTypes.object,
    title: PropTypes.string,
    zDepth: PropTypes.number,
  };

  renderTitle = (title, styles) => {
    let el = (
      <div style={styles.title}>
        <p style={styles.p}>
          {title}
        </p>
      </div>
    );

    return el;
  };

  renderContent = (content, styles) => {
    let el = (
      <div style={styles.content}>
        {content}
      </div>
    );

    return el;
  };

  renderFooter = (footer, styles) => {
    let el = (
      <div style={styles.footer}>
        {footer}
      </div>
    );

    return el;
  };

  render() {
    let {
      content,
      footer,
      hideFooter,
      style,
      title,
      zDepth,
      ...other,
    } = this.props;

    zDepth = zDepth || 3;

    const styles = getStyles(this.props, this.state, this.context);

    return (
      <ClearFix>
        <Paper
          {...other}
          style={styles.root}
          zDepth={zDepth}
        >
          { this.renderTitle(title, styles) }
          { this.renderContent(content, styles) }
          { !hideFooter && this.renderFooter(footer, styles) }
        </Paper>
      </ClearFix>
    );
  };
};
