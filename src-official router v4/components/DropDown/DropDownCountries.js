import React from 'react';
import AutoComplete from 'epui-md/lib/ep/AutoComplete/AutoComplete';
const PropTypes = React.PropTypes;
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as countryActions from '../../redux/reducers/country';
const MIN_KEY_LENGTH = 2;

const getStyles = (props, state, context) => {
  let theme = context.muiTheme;

  let styles = {
    root: {
      float: 'left',
    },
  }

  return styles;
}

@connect(
  state => ({
    countries: state.country.country,
  }),
  countryActions,
  null,
  {withRef: true},
)
export default class DropDownCountries extends React.Component{

  static propTypes = {
    countries: PropTypes.array,
    disabled: PropTypes.bool,
    label: PropTypes.string,
    listCountries: PropTypes.func,
    nTextChooseCountries: PropTypes.string,
    nTextNoCountriesFound: PropTypes.string,
    nTextSuggestedCountries: PropTypes.string,
    nTextNationality: PropTypes.string,
    nTextFlag: PropTypes.string,
    onChange:PropTypes.func,
    type : PropTypes.oneOf(['Nationality','Flag']),
  }

  static contextTypes = {
    muiTheme: PropTypes.object,
  }

  static defaultProps = {
    disabled: false,
    type: 'Nationality',
    nTextChooseCountries:'Enter name of the country',
    nTextNoCountriesFound:'No country found',
    nTextNationality:'Company Country',
    nTextFlag:'Flag',
    nTextSuggestedCountries:'Possible interested countries',
  }

  constructor(props) {
    super(props);
    this.state = {
      query: null,
      value: this.props.value,
    };
  }

  componentWillMount() {
    let countries = this.props.countries;
    if (!countries || countries.length < 1) {
      this.props.listCountries();
    }
  }

  clearValue=() =>{
    this.setState({
      value: null,
    });
  }

  getValue=() =>{
    return this.state.value;
  }

  render=() =>{
    let {
      countries,
      disabled,
      label,
      style,
      type,
      ...other,
    } = this.props;

    let {
      query,
      value,
    } = this.state;

    const styles = getStyles(this.props, this.state, this.context);
    let dataSource = [], filteredCountries = [];

    if(countries.length > 0) {
      let found = false;

      if(query) {
        filteredCountries = countries.filter(c => {
          return _.startsWith(c.name.toLowerCase(), query.toLowerCase());
        });

        filteredCountries.forEach((country, index) => {
          found = (value && value === country._id) ? true : false;

          dataSource.push({
            text: country.name,
            value: country._id,
          });
        });
      }

      if (value && !found) {
        let filtered = _.find(countries, ['_id', value]);
        if (filtered) {
          dataSource.push({
            text: filtered.name,
            value: filtered._id,
          });
        }
      }
    }

    return (
      <AutoComplete
        {...other}
        ref='autoComplete'
        dataSource={dataSource}
        disabled={disabled}
        filter={this._filter}
        floatingLabelText={this.props[`nText${type}`]}
        foundText={this.props.nTextChooseCountries}
        initialText={this.props.nTextChooseCountries}
        notFoundText={this.props.nTextNoCountriesFound}
        nullItemText={this.props.nTextChooseCountries}
        onNewRequest={this._handleNewRequest}
        onUpdateInput={this._handleUpdateInput}
        showNullItem={true}
        style={Object.assign(styles.root, style)}
        value={value}
      />
    );
  }

  _handleNewRequest=(chosenRequest, index, value) =>{
    if(this.props.onChange) this.props.onChange(null,value);
    if (value !== this.state.value) {
      this.setState({
        value,
      });
    }
  }

  _handleUpdateInput=(qry) =>{
    if(qry.length < MIN_KEY_LENGTH) { return; }
    this.setState({ query: qry });
  }

  _filter=() =>{
    return true;
  }

}
