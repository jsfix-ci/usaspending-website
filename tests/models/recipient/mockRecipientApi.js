/**
 * mockRecipientApi.js
 * Created by Lizzie Salita 6/25/18
 */

export const mockRecipientOverview = {
    id: '0123456-ABC-P',
    name: 'The ABC Corporation',
    duns: '0123456',
    parent_name: 'The XYZ Corporation',
    parent_duns: '0987654',
    parent_id: '0987654-XYZ-P',
    location: {
        address_line1: '123 Sesame St',
        city_name: 'McLean',
        state_code: 'VA',
        zip: '22102',
        country_name: null,
        country_code: 'USA',
        congressional_code: '05'
    },
    business_types: ['minority_owned_business', 'for_profit_organization'],
    total_transaction_amount: 30020000000,
    total_transactions: 327721,
    recipient_level: 'P'
};

export const mockChildRecipients = [
    {
        id: '345678-ABC-C',
        name: "Child of ABC Corporation",
        duns: "345678",
        state_province: "New Jersey",
        amount: 30020000
    },
    {
        id: '654321-ABC-C',
        name: "Another Child of ABC Corporation",
        duns: "654321",
        state_province: "Tennessee",
        amount: 40020000
    }
];