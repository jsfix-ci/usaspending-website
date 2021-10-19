/**
  * ResultsTableSection.jsx
  * Created by Kevin Li 11/8/16
  **/

import React from 'react';
import PropTypes from 'prop-types';
import { Tabs, ErrorMessage, LoadingMessage, NoResultsMessage } from 'data-transparency-ui';

import ResultsTable from './ResultsTable';

const propTypes = {
    inFlight: PropTypes.bool,
    error: PropTypes.bool,
    tableTypes: PropTypes.array,
    currentType: PropTypes.string,
    switchTab: PropTypes.func,
    results: PropTypes.array,
    columns: PropTypes.object,
    toggleColumnVisibility: PropTypes.func,
    updateSort: PropTypes.func,
    reorderColumns: PropTypes.func,
    subaward: PropTypes.bool,
    awardIdClick: PropTypes.func,
    subAwardIdClick: PropTypes.func
};

export default class ResultsTableSection extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tableWidth: 0
        };

        this.setTableWidth = this.setTableWidth.bind(this);
    }
    componentDidMount() {
        // set the initial table width
        this.setTableWidth();
        // watch the window for size changes
        window.addEventListener('resize', this.setTableWidth);
    }

    componentWillUnmount() {
        // stop watching for size changes
        window.removeEventListener('resize', this.setTableWidth);
    }

    setTableWidth() {
        const tableWidth = this.tableWidthController.clientWidth - 1;
        this.setState({ tableWidth });
    }

    render() {
        const type = this.props.subaward ? 'Sub-Award' : 'Prime Award';
        const showTableMessage = (
            (!this.props.error && !this.props.inFlight && this.props.results.length === 0) ||
            this.props.inFlight ||
            this.props.error
        );
        const showDataTable = (
            (!this.props.error && !this.props.inFlight && this.props.results.length > 0) ||
            this.props.inFlight
        );
        return (
            <div className="search-results-table-section" id="results-section-table">
                <div className="table-section-header">
                    <h2 className="visualization-title">
                        Spending by {type}
                    </h2>
                </div>
                <hr className="results-divider" />
                <Tabs
                    types={this.props.tableTypes}
                    active={this.props.currentType}
                    switchTab={this.props.switchTab} />
                <div className="results-table-content">
                    {showTableMessage && (
                        <>
                            {this.props.inFlight && (
                                <LoadingMessage />
                            )}
                            {this.props.error && (
                                <ErrorMessage />
                            )}
                            {!this.props.error && !this.props.inFlight && this.props.results.length === 0 && (
                                <NoResultsMessage />
                            )}
                        </>
                    )}
                    <div
                        className="results-table-width-master"
                        ref={(div) => {
                            // this is an empty div that scales via CSS
                            // the results table width will follow this div's width
                            this.tableWidthController = div;
                        }} />
                    {showDataTable && (
                        <ResultsTable
                            {...this.props}
                            visibleWidth={this.state.tableWidth}
                            awardIdClick={this.props.awardIdClick}
                            subAwardIdClick={this.props.subAwardIdClick} />
                    )}
                </div>
            </div>
        );
    }
}

ResultsTableSection.propTypes = propTypes;
