/**
 * BarChartItem.jsx
 * Created by Lizzie Salita 11/4/21
 */

import React from "react";
import PropTypes from "prop-types";
import { TooltipWrapper } from "data-transparency-ui";
import { formatMoney } from "helpers/moneyFormatter";

/**
 * The visualization is 208px tall (src/_scss/pages/agencyV2/overview/_visualizationSection.scss)
 * Maximum bar height is 187px (src/_scss/pages/agencyV2/overview/_barChart.scss)
 * To display the tooltip at the midpoint of the bar, get the inverse of half the height of the bar
 * Subtract 15px for the arrow spacer
 */
export const calculateOffsetTop = (percentOfGreatestBudget) => 187 - (187 * percentOfGreatestBudget * 0.5) - 15;

const BarChartItem = ({
    selectedFy,
    fy,
    budget,
    setHoveredFy,
    hoveredFy,
    greatestAgencyBudget
}) => {
    const fyStr = String(fy);
    const tooltip = (
        <div className="bar-chart-tooltip">
            <div className="tooltip__title">FY {fy}</div>
            <div className="tooltip__text">
                <div className="bar-chart-tooltip__desc">
                    Total Budgetary Resources
                </div>
                <div className="bar-chart-tooltip__amount">
                    {formatMoney(budget)}
                </div>
            </div>
        </div>
    );

    return (
        <div
            className="bar-chart__item"
            key={fy}
            onMouseEnter={() => setHoveredFy(true)}
            onMouseLeave={() => setHoveredFy(false)} >
            <TooltipWrapper
                className={`bar-chart__tooltip-wrapper${
                    !hoveredFy && fyStr === selectedFy
                        ? " bar-chart__tooltip-wrapper_active"
                        : ""
                }`}
                tooltipComponent={tooltip}
                offsetAdjustments={{
                    top: calculateOffsetTop(budget / greatestAgencyBudget),
                    left: 0,
                    right: 0
                }}>
                <div
                    role="img"
                    className={`bar-chart__bar${
                        fyStr === selectedFy ? " bar-chart__bar_selected" : ""
                    }`}
                    style={{
                        height: `${(budget / greatestAgencyBudget) * 100}%`,
                        minHeight: "0.5%"
                    }}
                    alt={`FY ${fyStr[2]}${
                        fyStr[3]
                    } total budgetary resources are ${formatMoney(budget)};
                        a ${(budget / greatestAgencyBudget).toFixed(
            2
        )} to 1 ratio compared to the largest total budgetary resources
                        in 5 consecutive years (${formatMoney(
            greatestAgencyBudget
        )}).`} />
            </TooltipWrapper>
            <div
                className={`bar-chart__label${
                    fyStr === selectedFy ? " bar-chart__label_selected" : ""
                }`}>
                {`FY ${fyStr[2]}${fyStr[3]}`}
            </div>
        </div>
    );
};

BarChartItem.propTypes = {
    selectedFy: PropTypes.string.isRequired,
    fy: PropTypes.number,
    setHoveredFy: PropTypes.func,
    hoveredFy: PropTypes.bool,
    budget: PropTypes.number,
    greatestAgencyBudget: PropTypes.number
};

export default BarChartItem;
