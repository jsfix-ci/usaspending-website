/**
 * stateReducer.js
 * Created by Lizzie Salita 5/1/18
 */

import BaseStateProfile from 'models/v2/state/BaseStateProfile';

const stateProfile = Object.create(BaseStateProfile);
stateProfile.populate({});

export const initialState = {
    id: '',
    overview: stateProfile
};

const stateReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_STATE_OVERVIEW':
            return Object.assign({}, state, {
                id: action.overview.id,
                overview: action.overview
            });
        case 'RESET_STATE':
            return Object.assign({}, initialState);
        default:
            return state;
    }
};

export default stateReducer;
