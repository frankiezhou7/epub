/**
 * Created by songzhongkun on 2017/4/20.
 */

import React from 'react';
import _ from 'eplodash';
import Table from 'epui-md/lib/ep/Table/Table';
import TableBody from 'epui-md/lib/ep/Table/TableBody';
import TableHeader from 'epui-md/lib/ep/Table/TableHeader';
import TableHeaderColumn from 'epui-md/lib/ep/Table/TableHeaderColumn';
import TableRow from 'epui-md/lib/ep/Table/TableRow';
import TableRowColumn from 'epui-md/lib/ep/Table/TableRowColumn';


class PortDisbursementAccountDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tableHeight: window.innerWidth > 1367 ? 450 : 350,
        }
    }

    getStyles() {

        let styles = {
            tableStyle: {
                position: 'relative',
                backgroundColor: 'transparent',
                textAlign: 'center',
                border: '1px solid #DCDCDC',
                width: '100%',
            },
            colLeft: {
                textAlign: 'left',
                paddingLeft: 5,
                paddingRight: 10,
            },
            colRight: {
                textAlign: 'right',
                paddingLeft: 0,
                paddingRight: 10,
            },
            productName: {
                textAlign: 'left',
                paddingLeft: 10,
                fontSize: 14,
                color: 'rgba(0,0,0,0.65)',
            },
            duties: {
                fontSize: 14,
                color: '#f2b654',
                letterSpacing: 0,
            },
            productPrice: {
                textAlign: 'right',
                paddingRight: 10,
                fontSize: 14,
                color: 'rgba(0,0,0,0.54)',
            },
            totalKey: {
                textAlign: 'left',
                paddingLeft: 10,
                fontSize: 14,
                color: 'rgba(0,0,0,0.65)',
            },
            totalValue: {
                textAlign: 'right',
                paddingRight: 10,
                fontSize: 14,
                color: 'rgba(0,0,0,0.54)',
            },
            estimatedPriceKey: {
                fontSize: 14,
                color: 'rgba(0,0,0,0.65)',
                letterSpacing: 0,
            },
            estimatedPriceValue: {
                fontSize: 20,
                color: '#f5a623',
                letterSpacing: 0,
                marginLeft: 5,
            },
            exchangeRate: {
                fontSize: 12,
                color: 'rgba(0,0,0,0.65)',
                letterSpacing: 0,
                marginLeft: 15,
            },
            downloadBtn: {
                borderRadius: 4,
                background: '#4990e2',
                fontSize: 12,
                color: '#fff',
                letterSpacing: 0,
                padding: '7px 16px',
                cursor: 'pointer'
            },
            usePrompt: {
                fontSize: 12,
                color: 'rgba(0,0,0,0.56)',
                letterSpacing: 0,
            },
            useInstructions: {
                fontFamily: 'Roboto-Medium',
                fontSize: 14,
                color: 'rgba(0,0,0,0.65)',
                letterSpacing: 0,
            },
            left: {
                float: 'left'
            },
            right: {
                float: 'right'
            },
            clear: {
                clear: 'both'
            }
        };

        return styles;
    }

    renderTitle(styles) {
        let {accountDetail} = this.props;
        return (
            <div style={{marginBottom: 20}}>
                <div>
                    <div style={styles.left}>
                        <span style={styles.estimatedPriceKey}>ESTIMATE PD: </span>
                        <span style={styles.estimatedPriceValue}>{accountDetail.estimate_price}</span>
                        <span style={styles.exchangeRate}>{accountDetail.exchange_rate}</span>
                    </div>
                    <div style={_.merge({}, styles.downloadBtn, styles.right)}
                         onClick={this.handlerDownLoadDoc}
                    >
                        Download
                    </div>
                    <div style={styles.clear}></div>
                </div>
                <div style={{marginTop: 16}}>
                    <div style={_.merge({}, styles.left, styles.usePrompt)}>
                        For reference only, Actual cost is subject to the final bill. <br />
                        Question or concern, please call us 400-1111-111.
                    </div>
                    <div style={_.merge({}, styles.right, styles.useInstructions)}>
                        E-PORTS PD Calculator<br />
                        is accurate and reliable
                    </div>
                    <div style={styles.clear}></div>
                </div>
            </div>
        )
    }

    renderContent(styles) {
        let {accountDetail} = this.props;
        let cost_items = accountDetail.cost_items == undefined ? [] : accountDetail.cost_items;
        let tableRows = _.map(cost_items, (item, i) => (
            <TableRow key={`table_row_${i}`}>
                <TableRowColumn
                    key={`product_name_${i}`}
                    style={styles.productName}
                >
                    {item.cost_item}<span style={styles.duties}>{item.flat == undefined ? ""
                    : item.flat ? "(preferential duties)" : "(unpreferential duties)"}</span>
                </TableRowColumn>
                <TableRowColumn
                    key={`product_price_${i}`}
                    style={styles.productPrice}
                >
                    {item.price_item}
                </TableRowColumn>
            </TableRow>
        ));

        return (
            <Table
                ref={'table'}
                style={styles.tableStyle}
                fixedHeader={false}
                height={this.state.tableHeight}
            >
                <TableHeader
                    key='table_header'
                    displaySelectAll={false}
                    adjustForCheckbox={false}
                    selectAllSelected={false}
                >
                    <TableRow key='display_header'>
                        <TableHeaderColumn
                            key='cost_item'
                            style={styles.colLeft}
                        >
                            COST ITEM
                        </TableHeaderColumn>
                        <TableHeaderColumn
                            key='estimate_price'
                            style={styles.colRight}
                        >
                            ESTIMATE PRICE
                        </TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody
                    displayRowCheckbox={false}
                    showRowHover={false}
                    deselectOnClickaway={false}
                    allRowsSelected={false}
                >
                    {tableRows}
                    <TableRow>
                        <TableRowColumn
                            style={styles.totalKey}
                        >
                            Total
                        </TableRowColumn>
                        <TableRowColumn
                            style={styles.totalValue}
                        >
                            {accountDetail.total}
                        </TableRowColumn>
                    </TableRow>
                </TableBody>
            </Table>
        )
    }

    render() {
        let styles = this.getStyles();
        return (
            <div>
                {this.renderTitle(styles)}
                {this.renderContent(styles)}
            </div>
        )
    }

    handlerDownLoadDoc() {
        console.log('download doc');
    }
}

export default PortDisbursementAccountDetail;