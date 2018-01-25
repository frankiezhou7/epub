import React from 'react';
import SelectField from 'epui-md/lib/SelectField';
import MenuItem from 'epui-md/lib/MenuItem';
import _ from 'eplodash';
const PropTypes = React.PropTypes;

const getStyles = (props, state, context) => {
  let theme = context.muiTheme;

  let styles = {
    root: {
      float: 'right',
    },
  }

  return styles;
}

export default class DropDownRoles extends React.Component{

  static propTypes = {
    nTextLabelText: PropTypes.string,
    items:PropTypes.array,
    onChange: PropTypes.func,
  }

  static contextTypes = {
    muiTheme: PropTypes.object,
  }

  static defaultProps = {
    nTextLabelText:'Roles',
    items:[{
      text:'Principal',
      value:'consigner',
    },{
      text:'Agent',
      value:'consignee',
    }]
  }

  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value,
    };
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
    let { items }= this.props;
    const styles = getStyles(this.props, this.state, this.context);
    let menuItems = _.map(items, item=>{
      return(
        <MenuItem
          key={item.value}
          value={item.value}
          primaryText={item.text}
        />
      )
    })
    return (
      <SelectField
        style={styles.root}
        onChange={this._handleChange}
        value={this.state.value}
        floatingLabelText={this.props.nTextLabelText}
        errorText={this.props.errorText}
      >
        {menuItems}
      </SelectField>
    );
  }

  _handleChange=(event, index, value)=>{
    if(this.props.onChange) this.props.onChange(event, value);
    this.setState({
      value:value
    })
  }
}
