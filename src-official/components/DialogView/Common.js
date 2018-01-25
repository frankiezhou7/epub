import React from 'react';
import Dialog from 'epui-md/lib/ep/Dialog';
import LoginDialog from './LoginDialog';
import RegisterDialog from './RegisterDialog';
import RetrieveDialog from './RetrieveDialog';
import CloseButton from 'epui-md/lib/svg-icons/navigation/close';

const PropTypes = React.PropTypes;

export default class DialogView extends React.Component{

  static propTypes = {
    type: PropTypes.string,
    open: PropTypes.bool,
    close: PropTypes.func,
  };

  static contextTypes = {
    muiTheme: PropTypes.object,
  };

  static defaultProps = {
    registerTitle: 'Register Company Account',
    retrieveTitle: 'Retrieve Password',
  }

  render () {
    let {type} = this.props;
    let content;
    let title;
    let contentStyle;
    let bodyStyle;
    switch (type) {
      case 'login':
        content = (
          <LoginDialog
            close={this.props.close}
          />
        );
        contentStyle = {
          width: '320px',
        }
        bodyStyle = {
          padding: 0,
        }
        break;
      case 'signUp':
        title = this.props.registerTitle;
        content = (
          <RegisterDialog
            close={this.props.close}
          />
        )
        contentStyle = {
          width: '620px',
          top: '-55px',
          position: 'relative'
        }
        bodyStyle = {
          padding: 0,
          height: '600px'
        }
        break;
      case 'retrievePassword':
        title = this.props.retrieveTitle;
        content = (
          <RetrieveDialog
            close={this.props.close}
          />
        )
        contentStyle = {
          width: '620px',
          top: '-55px',
          position: 'relative'
        }
        bodyStyle = {
          padding: 0,
          height: '600px'
        }
        break;
      default:
        content = (
          <LoginDialog
            close={this.props.close}
          />
        )
        break;
    }
    return (
      <Dialog
        title={title}
        titleStyle={{
          color:'#004588',
          fontFamily: 'Roboto',
          fontWeight: 500,
          fontSize: 24,
          border: 0,
          paddingLeft: '40px',
        }}
        bodyStyle={bodyStyle}
        style={{
          zIndex: 2000
        }}
        modal={true}
        open={this.props.open}
        autoDetectWindowHeight={false}
        autoScrollBodyContent={false}
        contentStyle={contentStyle}
        onRequestClose={this.props.close}
        repositionOnUpdate={false}
      >
        <CloseButton
          style={{
            position: 'absolute',
            top: 10,
            right: 10,
            width: 18,
            height: 18,
            fill:'#4d4d4d',
            cursor: 'pointer',
            zIndex: 2001,
          }}
          onClick={this.props.close}
        />
        {content}
      </Dialog>
    )
  }

};
