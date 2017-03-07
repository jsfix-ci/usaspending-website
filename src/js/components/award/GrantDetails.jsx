/**
 * GrantDetails.jsx
 * Created by Lizzie Dabbs 03/06/2017
 **/

import React from 'react';
import moment from 'moment';
import ContractCell from './ContractCell';

const propTypes = {
    selectedAward: React.PropTypes.object
};

export default class GrantDetails extends React.Component {

    render() {
        let yearRangeTotal = "";
        let description = null;
        const award = this.props.selectedAward;
        const latestTransaction = award.latest_transaction;

        // Date Range
        const startDate = moment(award.period_of_performance_start_date, 'M/D/YYYY');
        const endDate = moment(award.period_of_performance_current_end_date, 'M/D/YYYY');
        const yearRange = endDate.diff(startDate, 'year');
        if (yearRange !== 0) {
            if (yearRange === 1) {
                yearRangeTotal = `${yearRange} year)`;
            }
            else {
                yearRangeTotal = `(${yearRange} years)`;
            }
        }
        const popDate = `${award.period_of_performance_start_date} -
            ${award.period_of_performance_current_end_date} ${yearRangeTotal}`;

        // Location
        let popPlace = "";
        let popZip = null;
        if (award.pop_zip) {
            popZip = award.pop_zip;
        }
        if (award.pop_city && award.pop_state_province && popZip) {
            popPlace = `${award.pop_city}, ${award.pop_state_province} ${popZip}`;
        }
        else if (award.pop_city && !award.pop_state_province && popZip) {
            popPlace = `${award.pop_city} ${popZip}`;
        }
        else if (award.pop_city && !award.pop_state_province && !popZip) {
            popPlace = award.pop_city;
        }
        else if (!award.pop_city && award.pop_state_province && popZip) {
            popPlace = `${award.pop_state_province} ${popZip}`;
        }
        else if (!award.pop_city && award.pop_state_province && !popZip) {
            popPlace = award.pop_state_province;
        }
        if (award.description) {
            description = award.description;
        }
        else {
            description = "Not Available";
        }
        // CFDA Data
        // TODO: get program descriptions (objectives) for most recent transaction
        const programName = `${latestTransaction.assistance_data.cfda_number} - ${latestTransaction.assistance_data.cfda_title}`;
        const programDescription = '';

        return (
            <div className="contract-wrapper">
                <div className="contract-details">
                    <h3>Grant Details</h3>
                    <hr
                        className="results-divider"
                        ref={(hr) => {
                            this.sectionHr = hr;
                        }} />
                    <table>
                        <tbody>
                            <ContractCell
                                title="Description"
                                value={description} />
                            <ContractCell
                                title="Period of Performance"
                                value={popDate} />
                            <ContractCell
                                title="Primary Place of Performance"
                                value={popPlace} />
                            <ContractCell
                                title="Grant Type"
                                value={award.type_description} />
                            <ContractCell
                                title="CFDA Program"
                                value={programName} />
                            <ContractCell
                                title="CFDA Program Description"
                                value={programDescription} />
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}
GrantDetails.propTypes = propTypes;
