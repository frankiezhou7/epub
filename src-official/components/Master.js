import AppCanvas from 'epui-md/lib/AppCanvas';
import React from 'react';
import Router from 'react-router';
import ThemeManager from '../styles/theme-manager';
import BlueRawTheme from '../styles/raw-themes/blue-raw-theme';
import DialogGenerator from './dialog-generator'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../redux/reducers/user';
import * as countryActions from '../redux/reducers/country';


const PropTypes = React.PropTypes;

const getStyles = (props,context)=>{
  return {
    root:{
      height: '100%',
    }
  };
};

@connect(
  state => ({
    user: state.user.user,
    isFetching: state.user.isFetching,
    country: state.country.country,
  }),
  dispatch =>({
    ...bindActionCreators({
      fetchMe: userActions.fetchMe,
      listCountries: countryActions.listCountries
    },dispatch)
  })
)
export default class Master extends React.Component{

  static need = [userActions.fetchMe, countryActions.listCountries];

  static propTypes = {
    children: PropTypes.element,
    user: PropTypes.object,
    fetchMe:PropTypes.func,
    listCountries:PropTypes.func
  };

  static contextTypes = {
    muiTheme: PropTypes.object,
    router: PropTypes.object,
  };

  static childContextTypes = {
    name: React.PropTypes.string,
    muiTheme: PropTypes.object,
    location: React.PropTypes.object,
  };

  state = {
    muiTheme: ThemeManager.getMuiTheme(BlueRawTheme)
  }

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
      location: this.props.location
    };
  }

  componentWillMount = () => {
    let {
      user,
      country,
      fetchMe,
      listCountries
    } = this.props;
    if(!user || !user._id) {
      fetchMe();
    }
    if(!country || country.length < 1) {
      listCountries();
    }
  }

  render() {
    const styles = getStyles(this.props,this.context);
    return (
      <AppCanvas style = {styles.root}>
        <DialogGenerator />
        {this.props.children}
      </AppCanvas>
    );
  }
};
