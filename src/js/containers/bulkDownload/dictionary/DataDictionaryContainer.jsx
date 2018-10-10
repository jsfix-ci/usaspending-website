/**
 * DataDictionaryContainer.jsx
 * Created by Lizzie Salita 8/31/18
 */

import React from 'react';

import * as BulkDownloadHelper from 'helpers/bulkDownloadHelper';
import DataDictionary from 'components/bulkDownload/dictionary/DataDictionary';

export default class DataDictionaryContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            inFlight: true,
            error: false,
            sections: [],
            columns: [],
            rows: [],
            sort: {
                field: '',
                direction: ''
            },
            searchTerm: ''
        };

        this.request = null;

        this.loadContent = this.loadContent.bind(this);
        this.changeSort = this.changeSort.bind(this);
        this.setSearchString = this.setSearchString.bind(this);
    }

    componentDidMount() {
        this.loadContent();
    }

    setSearchString(searchTerm) {
        this.setState({
            searchTerm
        });
    }

    loadContent() {
        this.setState({
            inFlight: true
        });

        if (this.request) {
            this.request.cancel();
        }

        // perform the API request
        this.request = BulkDownloadHelper.requestDictionaryContent();

        this.request.promise
            .then((res) => {
                const content = res.data.document;
                this.setState({
                    sections: content.sections,
                    columns: content.headers,
                    inFlight: false,
                    error: false
                }, () => this.parseRows(content.rows));
            })
            .catch((err) => {
                console.log(err);
                this.setState({
                    inFlight: false,
                    error: true
                });
                this.request = null;
            });
    }

    parseRows(rows) {
        // replace nulls with 'N/A'
        const parsedRows = rows.map((row) =>
            row.map((data) =>
                data || 'N/A'
            )
        );

        this.setState({
            rows: parsedRows
        });
    }

    changeSort(field, direction) {
        // Get the index of the column we are sorting by
        const index = this.state.columns.findIndex((col) => col.raw === field);

        // Sort the rows based on their value at that index
        let rows = this.state.rows.sort((a, b) => a[index].localeCompare(b[index]));

        // Account for the sort direction
        if (direction === 'desc') {
            rows = rows.reverse();
        }

        // Update the state
        this.setState({
            rows,
            sort: {
                field,
                direction
            }
        });
    }

    render() {
        return (
            <DataDictionary
                loading={this.state.inFlight}
                error={this.state.error}
                sections={this.state.sections}
                columns={this.state.columns}
                rows={this.state.rows}
                sort={this.state.sort}
                changeSort={this.changeSort}
                setSearchString={this.setSearchString}
                searchTerm={this.state.searchTerm} />
        );
    }
}