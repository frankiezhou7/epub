import React from 'react';
import AvatarUploader from './AvatarUploader';
const PropTypes = React.PropTypes;

const getStyles = (props, state, context) => {
  let theme = context.muiTheme;
  let styles = {
    root: {},
    p: {
      color: '#4a4a4a',
      fontSize: '16px',
      padding: '2px',
      margin: 0,
    },
    p1: {
      color: '#4a4a4a',
      fontSize: '16px',
      padding: '4px',
      fontFamily:'Roboto',
      fontWeight: 500,
    },
    p2:{
      fontSize: '14px',
      fontFamily:'Roboto',
    },
    content: {
      width: '100%',
      height: '180px',
      marginTop: '80px',
      marginBottom: '135px',
    },
    textFieldHeight: {
      margin: '0 auto',
      width: '80px',
      height: '80px',
    },
  };

  return styles;
}

export default class UploadAvatar extends React.Component{

  static contextTypes = {
  	muiTheme: PropTypes.object,
  }

  static propTypes = {
    file: PropTypes.object,
    nTextServiceContentPrimary: PropTypes.string,
    nTextServiceContentSecondary: PropTypes.string,
    nTextUplaodAvatarNotice: PropTypes.string,
    percent: PropTypes.number,
    size: PropTypes.number,
    src: PropTypes.string,
    strokeColor: PropTypes.string,
    strokeWidth: PropTypes.number,
    uploadAvatar: PropTypes.func,
  }

  static defaultProps = {
    nTextServiceContentPrimary: 'Upload your company logo',
    nTextServiceContentSecondary: 'We advise you to upload your company logo in order to be recognized quickly by your business cooperators',
    nTextUplaodAvatarNotice: 'Click to upload or drag and drop',
  }


  render() {
    const styles = getStyles(this.props, this.state, this.context);

    let {
      nTextServiceContentPrimary,
      nTextServiceContentSecondary,
      nTextUplaodAvatarNotice,
      file,
      percent,
      src,
      strokeColor,
      strokeWidth,
      uploadAvatar,
    } = this.props;

    return (
      <div
        style={styles.root}
      >
        <div style={Object.assign({},styles.p1,{fontWeight: 500})}>
          {nTextServiceContentPrimary}
        </div>
        <div style={Object.assign({},styles.p1,styles.p2)}>
          {nTextServiceContentSecondary}
        </div>
        <div
          style={styles.content}
        >
          <div style={styles.textFieldHeight}>
            <AvatarUploader
              file={file}
              percent={percent}
              size={80}
              src={src}
              strokeColor={strokeColor}
              strokeWidth={strokeWidth}
              uploadAvatar={uploadAvatar}
              nTextUplaodAvatarNotice={nTextUplaodAvatarNotice}
            />
          </div>
        </div>
      </div>
    );
  }

};
