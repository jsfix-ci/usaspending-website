/**
 * BarChart.jsx
 * Created by Max Kendall 4/13/21
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { LoadingMessage, ErrorMessage } from 'data-transparency-ui';
import BarChartItem from './BarChartItem';

export const getLastFourYears = ({ year }, selectedFy) => {
    const fy = parseInt(selectedFy, 10);
    // Data Act reporting began in 2017. Before 2021, return true for 2017 - 2021.
    if (fy <= 2021 && year <= 2021) return true;
    // After 2021, return true for the previous 4 years and the currently selected year.
    if (fy > 2021 && year >= parseInt(selectedFy, 10) - 4 && year <= fy) return true;
    return false;
};

const BarChart = ({
    isLoading,
    isError,
    agencyBudgetByYear,
    selectedFy
}) => {
    const [hoveredFy, setHoveredFy] = useState(false);
    const greatestAgencyBudget = agencyBudgetByYear
        .filter((o) => getLastFourYears(o, selectedFy))
        .reduce((acc, obj) => (obj.budget > acc ? obj.budget : acc), 0);

    const filteredBudgetsByYear = agencyBudgetByYear
        .filter((o) => getLastFourYears(o, selectedFy))
        .sort((a, b) => a.year - b.year);

    if (!isLoading && isError) {
        return <ErrorMessage />;
    }
    if (isLoading && !isError) {
        return <LoadingMessage />;
    }
    return (
        <div className="viz-container bar-chart" alt="Bar chart of total budgetary resources over five consecutive years">
            {filteredBudgetsByYear.map(({ year, budget }) => (
                <BarChartItem
                    fy={year}
                    budget={budget}
                    setHoveredFy={setHoveredFy}
                    greatestAgencyBudget={greatestAgencyBudget}
                    selectedFy={selectedFy}
                    hoveredFy={hoveredFy} />
            ))}
        </div>
    );
};

BarChart.propTypes = {
    selectedFy: PropTypes.string.isRequired,
    agencyBudgetByYear: PropTypes.arrayOf(PropTypes.shape({
        year: PropTypes.string.isRequired,
        budget: PropTypes.number.isRequired
    })),
    isLoading: PropTypes.bool.isRequired,
    isError: PropTypes.bool.isRequired
};

export default BarChart;
