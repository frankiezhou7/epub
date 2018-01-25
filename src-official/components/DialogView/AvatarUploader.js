import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'eplodash';
import DefaultAvatar from '../../../static/default.png';

const PropTypes = React.PropTypes;

const getStyles = (props, state, context) => {
  let {
    size,
    strokeWidth,
  } = props;

  let marginLeft = size + strokeWidth;

  let theme = context.muiTheme;
  let Colors = theme.colors;

  let styles = {
    root: {
      width: `${size}px`,
      height: `${size}px`,
      overflow: 'hidden',
      cursor: 'pointer',
      position: 'relative',
    },
    p: {
      position: 'absolute',
      margin: (size - 40) / 2 + 'px ' + -((size - 100) / 2 + 100) + 'px',
      display: 'inline-block',
      width: '80px',
      paddingLeft: '10px',
      height: '40px',
      textAlign: 'center',
      fontWeight: 'bold',
      color: Colors.darkWhite,
    },
    file: {
      position: 'absolute',
      display: 'none',
      width: '0px',
      height: '0px'
    },
    img: {
      display: 'inline-block',
      width: `${size - 2}px`,
      height: `${size - 2}px`,
      borderRadius: '50%',
      border: 'solid 1px rgba(0, 0, 0, 0.08)',
    },
    progress: {
      position: 'absolute',
      marginTop: `-${strokeWidth}px`,
      top: 0,
      left: 0,
    }
  };

  return styles;
}

export default class AvatarUploader extends React.Component{

  static propTypes = {
    file: PropTypes.object,
    nLabelAvatarUploaderNotice: PropTypes.string,
    percent: PropTypes.number,
    size: PropTypes.number,
    src: PropTypes.string,
    strokeColor: PropTypes.string,
    strokeWidth: PropTypes.number,
    uploadAvatar: PropTypes.func,
    nErrorTextImageType: PropTypes.string,
  };

  static contextTypes = {
    muiTheme: PropTypes.object,
  };

  static defaultProps = {
    percent: 0,
    size: 80,
    strokeWidth: 4,
    src: DefaultAvatar,
    nErrorTextImageType:'Select image files to upload',
    nLabelAvatarUploaderNotice: 'Click to upload or drag and drop',
  }

  constructor(props) {
    super(props);
    let {
      percent,
      src,
    } = this.props;

    this.state = {
      percent: percent,
      src: src,
    };
  }

  componentDidMount() {
    let { file } = this.props;
    let self = this;
    let reader = new FileReader();
    reader.onload = ((e) => { self.setState({ src: e.target.result }); });
    if (file) {
      reader.readAsDataURL(file);
    }
  }

  render() {
    let {
      size,
      strokeColor,
      strokeWidth,
      ...other,
    } = this.props;

    let {
      percent,
      src,
    } = this.state;

    let styles = getStyles(this.props, this.state, this.context);

    size = size + strokeWidth * 2;

    return(
      <div
        onDrop={this._handleDrop}
        onDragEnter={this._handleDragEnter}
        onDragOver={this._handleDragOver}
        onTouchTap={this._handleTouchTap}
        style={styles.root}
      >
        <img
          src={src}
          style={styles.img}
        />
        <p style={styles.p}>
          {this.props.nLabelAvatarUploaderNotice}
        </p>
        <input
          ref='upload'
          accept='image/*'
          onChange={this._handleFilesEvent}
          style={styles.file}
          type='file'
        />

      </div>
    );
  }

  _onProgress= (percent) => {
    if (percent !== this.state.percent) {
      this.setState({
        percent: percent,
      });
    }
  }

  _handleTouchTap=()=> {
    let upload = this.refs.upload;
    upload.click();
  }

  _handleFiles=(files) => {
    for (let i = 0, len = files.length; i < len; i++) {
      let file = files[i];
      let imageType = /image.*/;

      if (!file.type.match(imageType)) {
        alert(this.props.nErrorTextImageType);
        continue;
      }

      let self = this;
      let reader = new FileReader();
      reader.onerror = this._handleError;
      reader.onprogress = this._handleProgress;
      reader.onload = ((e) => { self.setState({ src: e.target.result }); });
      reader.readAsDataURL(file);

      let fn = this.props.uploadAvatar;
      if (_.isFunction(fn)) {
        this.setState({
          percent: 0,
        }, fn(file, this._onProgress));
      }
    }
  }

  _handleFilesEvent=(e) => {
    let files = e.target.files;
    this._handleFiles(files);
  }

  _handleDragEnter=(e) => {
    e.stopPropagation();
    e.preventDefault();
  }

  _handleDragOver=(e) => {
    e.stopPropagation();
    e.preventDefault();
  }

  _handleDrop=(e) => {
    e.stopPropagation();
    e.preventDefault();

    let dt = e.dataTransfer;
    let files = dt.files;

    this._handleFiles(files);
  }

  _handleError=(e) =>{
    let error = e.target.error;
  }

  _handleProgress=(e) =>{
    if (e.lengthComputable) {
      var percentLoaded = Math.round((e.loaded / e.total) * 100);
      this.setState({
        percent: percentLoaded,
      });
    }
  }

}
