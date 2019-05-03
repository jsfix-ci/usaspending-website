/**
  * FederalAccountsTable.jsx
  * Created by Jonathan Hill 3/25/19
  **/

import React from 'react';
import PropTypes from 'prop-types';
import { map } from 'lodash';

import tableMapping from 'dataMapping/awardsv2/federalAccountSectionTable';
import StateLandingTableSorter from 'components/stateLanding/table/StateLandingTableSorter';
import Pagination from 'components/sharedComponents/Pagination';

const propTypes = {
    page: PropTypes.number,
    limit: PropTypes.number,
    sort: PropTypes.string,
    order: PropTypes.string,
    total: PropTypes.number,
    federalAccounts: PropTypes.array,
    changePage: PropTypes.func,
    updateSort: PropTypes.func
};

export default class FederalAccountsTable extends React.Component {
    getHeaders() {
        const { sort, order, updateSort } = this.props;
        return map(tableMapping, (header) => (
            <th className="federal-accounts-table__head-cell" key={header.displayName}>
                <div className="header-cell">
                    <div className="header-cell__text">
                        <div className="header-cell__title">
                            {header.displayName}
                        </div>
                    </div>
                    <StateLandingTableSorter
                        field={header.field}
                        label={header.displayName}
                        active={{ field: sort, direction: order }}
                        setSort={updateSort} />
                </div>
            </th>
        ));
    }

    getRows() {
        return this.props.federalAccounts.map((account) => (
            <tr
                className="federal-accounts-table__body-row"
                key={`row-${account._obligatedAmount}`}>
                {map(tableMapping, (header, key) => {
                    let cellData = account[key];
                    if (key === 'federalAccountName') {
                        cellData = (
                            <a href={`${header.href}${account.federalAccount}`}>
                                {account[key]}
                            </a>
                        );
                    }
                    else if (key === 'fundingAgency') {
                        cellData = (
                            <a href={`${header.href}${account.fundingAgency}`}>
                                {account[key]}
                            </a>
                        );
                    }
                    return (
                        <td
                            className={header.classname}
                            key={`cell-${account._obligatedAmount}-${header.displayName}`}>
                            {cellData}
                        </td>
                    );
                })}
            </tr>
        ));
    }

    renderTable() {
        return (
            <div>
                <table className="federal-accounts-table">
                    <thead className="federal-accounts-table__head">
                        <tr className="federal-accounts-table__head-row">
                            {this.getHeaders()}
                        </tr>
                    </thead>
                    <tbody>
                        {this.getRows()}
                    </tbody>
                </table>
                <Pagination
                    totalItems={this.props.total}
                    pageSize={this.props.limit}
                    pageNumber={this.props.page}
                    onChangePage={this.props.changePage} />
            </div>
        );
    }

    render() {
        return (
            <div>
                {this.renderTable()}
            </div>
        );
    }
}

FederalAccountsTable.propTypes = propTypes;
