module.exports = {
    friendlyName: 'Login',
    description: 'Login User.',
    inputs: {
        email: {
            type: 'string',
            required: true,
            isEmail: true,
            description: 'User email.'
        },
        password: {
            type: 'string',
            required: true,
            description: 'User password.'
        }
    },
    exits: {
        success: {
            statusCode: 200,
            description: 'Login successful',
        },
        notUser: {
            statusCode: 404,
            description: 'User not found',
        },
        passwordIsWrong: {
            statusCode: 400,
            description: 'Password is wrong',
        },
        error: {
            description: 'Something went wrong',
        },
    },

    fn: async function (inputs, exits) {
        try {
            const UserDB = await User.findOne({ email: inputs.email });

            if (!UserDB) {
                return exits.notUser({
                    message: `${inputs.email} not yet registered`
                });
            }

            await sails.helpers.passwords.checkPassword(inputs.password, UserDB.password)
                .intercept('incorrect', (error) => {
                    return exits.passwordIsWrong({
                        message: error.message
                    });
            });

            const token = await sails.helpers.generateNewJwtToken(UserDB.email, UserDB.id, 'User');

            return exits.success({
                message: `${UserDB.email} telah berhasil login`,
                data: UserDB,
                role: 'User',
                token: token
            });

        } catch (error) {
            return exits.error({
                message: 'Sorry, something went wrong',
                error: error.message
            });
        }
    }
};
