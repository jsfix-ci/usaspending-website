/**
 * covid19Reducer-test.js
 * Created by Jonathan Hill 06/11/20
 */

import covid19Reducer from 'redux/reducers/covid19/covid19Reducer';
import { setDEFCodes, setOverview, setLatestSubmissionDate } from 'redux/actions/covid19/covid19Actions';
import { defCodes, overview } from './mockData';

describe('Covid 19 Reducer', () => {
    it('should SET_DEF_CODES', () => {
        let state = covid19Reducer(undefined, {});
        state = covid19Reducer(state, setDEFCodes(defCodes));
        expect(state.defCodes).toEqual(defCodes);
    });
    it('should SET_COVID_OVERVIEW', () => {
        let state = covid19Reducer(undefined, {});
        state = covid19Reducer(state, setOverview(overview));
        expect(state.overview).toEqual(overview);
    });
    it('should SET_LATEST_SUBMISSION_DATE', () => {
        let state = covid19Reducer(undefined, {});
        state = covid19Reducer(state, setLatestSubmissionDate('June 01, 1999'));
        expect(state.latestSubmissionDate).toEqual('June 01, 1999');
    });
});