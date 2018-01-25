import React from 'react';

const PropTypes = React.PropTypes;

class NotFound extends React.Component{

  static contextTypes = {
    muiTheme: PropTypes.object
  };

  static propTypes = {

  };

  static defaultProps = {

  };

  state = {

  };

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  componentWillUpdate() {

  }

  render() {
    return (
      <h1>
        Oops, Bad Request...
      </h1>
    );
  }
};

export default NotFound;
