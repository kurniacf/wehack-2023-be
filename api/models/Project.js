/* eslint-disable camelcase */
/**
 * Project.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'projects',
  attributes: {
    id: {
      type: 'number',
      autoIncrement: true,
    },
    title: {
      type: 'string',
      required: true,
      description: 'Full representation of the project\'s title.',
    },
    category: {
      type: 'string',
      isIn: [
        'Robotics and Automation',
        'Artificial Intelligence',
        'Internet of Things',
        'Data Science',
        'Cyber Security',
        'Blockchain',
        'Cloud Computing',
        'Mobile Application',
        'Web Application',
        'Game Development',
        'Other',
      ],
      defaultsTo: 'other',
    },
    region_id: {
      type: 'string',
      required: true,
      description: 'Full representation of the project\'s region.',
    },
    creator_name: {
      type: 'string',
      required: true,
      description: 'Full representation of the project\'s creator name.',
    },
    description: {
      type: 'string',
      description: 'Full representation of the project\'s description.',
    },
    image: {
      type: 'string',
      description: 'Full representation of the project\'s image.',
    },
    funding_goal: {
      type: 'number',
      description: 'Full representation of the project\'s funding goal.',
    }
  },
};

