/**
 * AwardAmountSearchContainer-test.jsx
 * Created by michaelbray on 3/9/17.
 */

import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import { OrderedMap } from 'immutable';

import { AwardAmountSearchContainer }
    from 'containers/search/filters/awardAmount/AwardAmountSearchContainer';
import { searchTypes } from 'dataMapping/search/awardAmount';

const initialFilters = {
    awardAmounts: new OrderedMap(),
    appliedAmounts: new OrderedMap()
};

describe('AwardAmountSearchContainer', () => {
    describe('Handling adding and removing Award Amounts', () => {
        it('should add a predefined Award Amount that has been selected to Redux', () => {
            const mockReduxAction = jest.fn((args) => {
                expect(args).toEqual({
                    amount: 1,
                    searchType: 'range'
                });
            });

            // Set up container with mocked Award Amount action
            const awardAmountSearchContainer = shallow(
                <AwardAmountSearchContainer
                    {...initialFilters}
                    updateAwardAmounts={mockReduxAction} />);

            const selectAwardRangeSpy = sinon.spy(awardAmountSearchContainer.instance(),
                'selectAwardRange');

            // Add Award Amount to redux
            awardAmountSearchContainer.instance().selectAwardRange(1, searchTypes.RANGE);

            // everything should be updated now
            expect(selectAwardRangeSpy.callCount).toEqual(1);
            expect(mockReduxAction).toHaveBeenCalled();

            // reset the spy
            selectAwardRangeSpy.reset();
        });

        it('should remove a predefined Award Amount that has been deselected from Redux', () => {
            const mockReduxAction = jest.fn((args) => {
                expect(args).toEqual({
                    amount: 1,
                    searchType: 'range'
                });
            });

            // Set up container with mocked Award Amount action
            const awardAmountSearchContainer = shallow(
                <AwardAmountSearchContainer
                    {...initialFilters}
                    updateAwardAmounts={mockReduxAction} />);

            const selectAwardRangeSpy = sinon.spy(awardAmountSearchContainer.instance(),
                'selectAwardRange');

            // Add Award Amount to redux
            awardAmountSearchContainer.instance().selectAwardRange(1, searchTypes.RANGE);

            // Remove Award Amount from redux
            awardAmountSearchContainer.instance().selectAwardRange(1, searchTypes.RANGE);

            // everything should be updated now
            expect(selectAwardRangeSpy.callCount).toEqual(2);
            expect(mockReduxAction).toHaveBeenCalledTimes(2);

            // reset the spy
            selectAwardRangeSpy.reset();
        });

        it('should add a specific Award Amount that has been selected to Redux', () => {
            const mockReduxAction = jest.fn((args) => {
                expect(args).toEqual({
                    amount: [10000, 20000],
                    searchType: 'specific'
                });
            });

            // Set up container with mocked Award Amount action
            const awardAmountSearchContainer = shallow(
                <AwardAmountSearchContainer
                    {...initialFilters}
                    updateAwardAmounts={mockReduxAction} />);

            const selectAwardRangeSpy = sinon.spy(awardAmountSearchContainer.instance(),
                'selectAwardRange');

            // Add Award Amount to redux
            awardAmountSearchContainer.instance()
                .selectAwardRange([10000, 20000], searchTypes.SPECIFIC);

            // everything should be updated now
            expect(selectAwardRangeSpy.callCount).toEqual(1);
            expect(mockReduxAction).toHaveBeenCalled();

            // reset the spy
            selectAwardRangeSpy.reset();
        });

        it('should remove a specific Award Amount that has been deselected from Redux', () => {
            const mockReduxAction = jest.fn((args) => {
                expect(args).toEqual({
                    amount: [10000, 20000],
                    searchType: 'specific'
                });
            });

            // Set up container with mocked Award Amount action
            const awardAmountSearchContainer = shallow(
                <AwardAmountSearchContainer
                    {...initialFilters}
                    updateAwardAmounts={mockReduxAction} />);

            const selectAwardRangeSpy = sinon.spy(awardAmountSearchContainer.instance(),
                'selectAwardRange');

            // Add Award Amount to redux
            awardAmountSearchContainer.instance()
                .selectAwardRange([10000, 20000], searchTypes.SPECIFIC);

            // Remove Award Amount from redux
            awardAmountSearchContainer.instance()
                .selectAwardRange([10000, 20000], searchTypes.SPECIFIC);

            // everything should be updated now
            expect(selectAwardRangeSpy.callCount).toEqual(2);
            expect(mockReduxAction).toHaveBeenCalledTimes(2);

            // reset the spy
            selectAwardRangeSpy.reset();
        });
    });

    describe('dirtyFilters', () => {
        it('should return an ES6 Symbol when the staged filters do not match with the applied filters', () => {
            const container = shallow(
                <AwardAmountSearchContainer
                    {...initialFilters}
                    updateAwardAmounts={jest.fn()} />
            );

            container.setProps({
                awardAmounts: new OrderedMap({ a: 'a' })
            });

            const changed = container.instance().dirtyFilters();
            expect(changed).toBeTruthy();
            expect(typeof changed).toEqual('symbol');
            expect(changed.toString()).toEqual('Symbol(dirty amount)');
        });
        it('should return null when the staged filters match with the applied filters', () => {
            const container = shallow(
                <AwardAmountSearchContainer
                    {...initialFilters}
                    updateAwardAmounts={jest.fn()} />
            );

            const changed = container.instance().dirtyFilters();
            expect(changed).toBeFalsy();
        });
    });
});
