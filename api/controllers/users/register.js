module.exports = {
  friendlyName: 'Register',
  description: 'Register users.',
  inputs: {
    name: {
      type: 'string',
      required: true,
    },
    email: {
      type: 'string',
      required: true,
      unique: true,
      isEmail: true,
    },
    password: {
      type: 'string',
      required: true,
      minLength: 6,
    },
  },
  exits: {
    success: {
      statusCode: 200,
      description: 'New Users created',
    },
    emailAlreadyInUse: {
      statusCode: 400,
      description: 'Email address already in use',
    },
    error: {
      description: 'Something went wrong',
    },
  },

  fn: async function (inputs, exits) {
    try {
      const newEmailAddress = inputs.email.toLowerCase();

      let newUser = await User.create({
        name: inputs.name,
        email: newEmailAddress,
        password: inputs.password
      });

      return exits.success({
        message: `An account has been created for ${inputs.email} successfully.`,
        data: newUser
      });
    } catch (error) {
      if (error.code === 'E_UNIQUE') {
        return exits.emailAlreadyInUse({
          message: 'Oops :) an error occurred',
          error: 'This email address already exits',
        });
      }
      return exits.error({
        message: 'Oops :) an error occurred',
        error: error.message,
      });
    }
  }


};
