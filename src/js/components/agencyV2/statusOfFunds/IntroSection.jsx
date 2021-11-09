/**
 * IntroSection.jsx
 * Created by Brian Petway 11/04/21
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from "react-redux";
import GlossaryLink from "../../sharedComponents/GlossaryLink";

const propTypes = {
    fy: PropTypes.string
};

const IntroSection = ({ fy }) => {
    const { name } = useSelector((state) => state.agencyV2.overview);
    const agencyBudget = useSelector((state) => state.agencyV2.budgetaryResources?.[fy]?.agencyBudget) || '--';
    const subComponents = '';

    return (
        <div className="status-of-funds__intro-wrapper">
            <div className="status-of-funds__intro-section-title">
                <span data-testid="introSentence">
                    How were funds distributed in FY {fy} for the {name}?
                </span>
            </div>
            <div className="status-of-funds__intro-section-text" >
                <span >
                    In FY {fy}, the {name} had {agencyBudget} in available <span className="status-of-funds__glossary-term">budgetary resources</span> <GlossaryLink term="budgetary-resources" /> distributed among its {subComponents} agency sub-components. Agencies spend available budgetary resources by making financial promises called <span className="status-of-funds__glossary-term">obligations</span> <GlossaryLink term="obligation" />. In this section, we show the total budgetary resources broken out by agency sub-component and how much of that funding has been obligated.
                </span>
            </div>
            <div className="status-of-funds__intro-section-italic-text">
                <span >
                    Select a segment in the chart below to dive deeper into the data.
                </span>
            </div>
        </div>
    );
};

IntroSection.propTypes = propTypes;
export default IntroSection;
