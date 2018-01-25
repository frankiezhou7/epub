/**
 * Created by songzhongkun on 2017/4/7.
 */
import React from 'react';
import {browserHistory} from 'react-router';
import _ from 'lodash';

export default class MenuCrumbs2 extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isHover: [],
        }
    }

    static propTypes = {
        navArr: React.PropTypes.array,
    };

    getStyles() {
        return {
            breadcrumbNav: {
                fontSize: 14,
                color: 'rgba(0, 0, 0, 0.87)',
                letterSpacing: 0
            },
            cursor: {
                cursor: 'pointer',
            },
            hover: {
                color: '#004588',
            },
        }
    };

    renderNavigation(styles) {
        let navElem = [];
        let navArr = this.props.navArr;
        navArr.map((nav, i) => {
            if (nav.link != undefined) {
                navElem.push(
                    <span key={`nav${i}`} style={_.merge({}, styles.cursor, this.state.isHover[i] ? styles.hover : null)}
                          onClick={() => browserHistory.push(nav.link)}
                          onMouseEnter={() => this.handlerMouseMove(i, true)}
                          onMouseLeave={() => this.handlerMouseMove(i, false)}
                    >
                        {nav.value}
                    </span>
                )
            } else {
                navElem.push(<span key={`nav${i}`}>{nav.value}</span>)
            }
            if (i != navArr.length - 1) {
                navElem.push(<span key={`nav${i}_`}>&nbsp;&nbsp; > &nbsp;&nbsp;</span>)
            }
        });
        return navElem;
    }

    render() {
        let styles = this.getStyles();
        return (
            <div style={(styles.breadcrumbNav)}>
                {this.renderNavigation(styles)}
            </div>
        )
    }

    handlerMouseMove(index, isShow) {
        let navArr = this.props.navArr;
        let isHover = this.state.isHover;
        if (isHover.length == 0) {
            isHover = new Array(navArr.length);
        }
        isHover[index] = isShow;
        this.setState({
            isHover
        })
    }

}