/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'users',
  attributes: {
    name: {
      type: 'string',
      required: true,
      description: 'Full representation of the user\'s name.',
    },
    email: {
      type: 'string',
      required: true,
      unique: true,
      isEmail: true,
      description: 'The unique email address used by this user to log in.',
    },
    password: {
      type: 'string',
      required: true,
      description: 'Securely hashed representation of the user\'s login password.',
    },
    gender: {
      type: 'string',
      isIn: ['male', 'female', 'non-binary', 'other'],
      defaultsTo: 'other',
    },
    passwordResetToken: {
      type: 'string',
      description: 'A unique token used to verify the admin\'s identity when recovering a password.',
      columnName: 'password_reset_token',
    },
    passwordResetTokenExpiresAt: {
      type: 'number',
      description: 'A timestamp representing the moment when this admin\'s `passwordResetToken` will expire (or 0 if the admin currently has no such token).',
      example: 1508944074211,
      columnName: 'password_reset_token_expires_at',
    },
  },
  customToJSON: function () {
    return _.omit(this, ['password']);
  },
  beforeCreate: async function (values, proceed) {
    // Hash password
    const hashedPassword = await sails.helpers.passwords.hashPassword(
      values.password
    );
    values.password = hashedPassword;
    return proceed();
  },
};

