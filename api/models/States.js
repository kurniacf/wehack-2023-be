/* eslint-disable camelcase */
/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
    tableName: 'states',
    attributes: {
        id: {
            type: 'string',
            required: true,
            columnName: 'state',
            description: 'Full representation of the region\'s name.',
        },
        state_code: {
            type: 'string',
            description: 'Full representation of the region\'s description.',
        },
    }
};

// Create a new map Example Data
// {
//     "name": "Test Map",
//     "description": "Test Map Description"
// }

