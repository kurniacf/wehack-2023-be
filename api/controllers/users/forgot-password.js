module.exports = {
    friendlyName: 'Forgot password',
    description: 'Forgot Password User',
    inputs: {
        email: {
            type: 'string',
            required: true,
        }
    },

    exits: {
        success: {
            statusCode: 200,
            description: 'Forgot password successful',
        },
        emailWrong: {
            statusCode: 400,
            description: 'Email User is wrong',
        }
    },

    fn: async function (inputs, exits) {
        try {
            const UserDB = await User.findOne({ email: inputs.email });
            if (!UserDB) {
                return exits.emailWrong({
                    message: 'Email is wrong or not registered'
                });
            }

            const token = await sails.helpers.strings.random('url-friendly');

            await User.update({ id: UserDB.id }).set({
                passwordResetToken: token,
                passwordResetTokenExpiresAt:
                Date.now() + sails.config.custom.passwordResetTokenTTL,
            });

            return exits.success({
                message: 'Forgot password successful',
                token: token
            });

        } catch (error) {
            return exits.error({
                message: error.message
            });
        }
    }
};
