import React from 'react';
import ClearFix from 'epui-md/lib/internal/ClearFix';
import Paper from 'epui-md/lib/Paper';

const PropTypes = React.PropTypes;

const getStyles =(props,context)=>{
  const theme = context.muiTheme;
  return {
    layout: {
      width: '500px',
      height: 'auto',
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: '70px',
      background: 'transparent',
    },
    title: {
      fontWeight: '500',
      marginBottom: '8px',
      textTransform: 'capitalize'
    },
    content: {
      width: '100%',
      height: 'auto'
    }
  }
}

export default class CommonForm extends React.Component {

  static contextTypes = {
    muiTheme: PropTypes.object,
  }

  static propTypes = {
    title: PropTypes.string,
    content: PropTypes.node,
  }

  render(){
    const {prepareStyles} = this.context.muiTheme;
    const styles = getStyles(this.props, this.context);
    let {title, content} = this.props;
    return(
      <ClearFix>
        <Paper style={styles.layout} zDepth={0}>
          <h2 style={styles.title}>{title}</h2>
          <div style={styles.content}>{content}</div>
        </Paper>
      </ClearFix>
    )
  }
}
