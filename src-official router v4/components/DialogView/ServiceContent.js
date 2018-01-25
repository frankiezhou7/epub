import React from 'react';
import TermsConditions from './TermsConditons';
const PropTypes = React.PropTypes;
const getStyles = (props, state, context) => {
  let theme = context.muiTheme;
  let styles = {
    root: {},
    p1: {
      color: '#4a4a4a',
      fontSize: '16px',
      padding: '4px',
      fontFamily:'Roboto',
    },
    p2:{
      fontSize: '14px',
      fontFamily:'Roboto',
    },
    content: {
      height: '340px',
      margin: '20px 0 0 0',
      background: '#F0F0F0',
      overflow: 'auto',
      color:  '#000000',
      padding: '14px 18px 14px 18px',
      fontWeight: '300',
      fontSize: '14px',
      lineHeight: '22px',
    },
    footer: {
      display: 'inline-block',
      float: 'right',
    },
    buttonMargin: {
      marginRight: '10px',
    },
  };

  return styles;
}

export default class ServiceContent extends React.Component{

  static contextTypes = {
  	muiTheme: PropTypes.object,
  }

  static propTypes = {
    nTextServiceContentPrimary: PropTypes.string,
    nTextServiceContentSecondary: PropTypes.string,
  }

  static defaultProps = {
    nTextServiceContentPrimary: 'Terms of Service',
    nTextServiceContentSecondary: 'Please read the following Terms of Service carefully',
  }


  render() {
    const styles = getStyles(this.props, this.state, this.context);

    let {
      nTextServiceContentPrimary,
      nTextServiceContentSecondary,
    } = this.props;

    return (
      <div
        style={styles.root}
      >
        <div
          style={Object.assign({},styles.p1,{fontWeight: 500})}
        >
          {nTextServiceContentPrimary}
        </div>
        <div
          style={Object.assign({},styles.p1,styles.p2)}
        >
          {nTextServiceContentSecondary}
        </div>
        <div
          style={styles.content}
        >
          <TermsConditions/>
        </div>
      </div>
    );
  }

};
