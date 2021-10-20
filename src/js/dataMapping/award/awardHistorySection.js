import { getToolTipBySectionAndAwardType } from './tooltips';

export const tabs = (awardType) => [
    {
        label: "Transaction History",
        internal: "transaction",
        tooltip: getToolTipBySectionAndAwardType('transactionHistory', awardType)
    },
    {
        label: "Sub-Awards",
        internal: "subaward",
        tooltip: getToolTipBySectionAndAwardType('subAwards', awardType)
    },
    {
        label: "Federal Account Funding",
        internal: "federal_account",
        tooltip: getToolTipBySectionAndAwardType('federalAccountFunding', awardType)
    }
];

export const awardTypesWithSubawards = ['grant', 'contract'];
