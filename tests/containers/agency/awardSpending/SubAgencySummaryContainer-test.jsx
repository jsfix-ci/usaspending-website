import React from 'react';
import { render, waitFor } from 'test-utils';
import * as apis from 'apis/agency';
import SubAgencySummaryContainer from 'containers/agency/awardSpending/SubAgencySummaryContainer';
import { defaultState } from '../../../testResources/defaultReduxFilters';

const mockProps = {
    id: '012',
    fy: '1995',
    data: {
        officeCount: 8,
        subagencyCount: 10
    }
};

const summaryData = [
    {
        type: 'awardObligations',
        title: 'Award Obligations',
        isMonetary: true
    },
    {
        type: 'numberOfTransactions',
        title: 'Number of Transactions'
    },
    {
        type: 'numberOfAwards',
        title: 'Number of New Awards'
    }
];

// eslint-disable-next-line import/prefer-default-export
export const mockAgencySubagencyCount = {
    subagencyCount: 10,
    officeCount: 5,
    newAwardCount: 100,
    transactionCount: 45,
    obligations: 4040
};

afterEach(() => {
    jest.clearAllMocks();
});

test('makes a new API call when the selected FY changes', () => {
    const spy = jest.spyOn(apis, 'fetchSubagencyNewAwardsCount').mockReturnValue({
        promise: Promise.resolve({ data: mockAgencySubagencyCount }),
        cancel: jest.fn()
    });
    const { rerender } = render(
        <SubAgencySummaryContainer fy="2000" summaryData={summaryData} data={mockProps.data} />,
        { initialState: { ...defaultState, agency: { overview: { toptierCode: '123' } } } }
    );
    rerender(<SubAgencySummaryContainer summaryData={summaryData} {...mockProps} />);
    return waitFor(() => {
        expect(spy).toHaveBeenCalledTimes(2);
    });
});
