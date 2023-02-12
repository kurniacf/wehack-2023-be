module.exports = {
    friendlyName: 'Reset password',
    description: 'Reset password User',

    inputs: {
        password: {
            description: 'The new, unencrypted password.',
            example: 'myfancypassword',
            required: true,
        },
        token: {
            description:
                'The password token that was in the forgot-password endpoint',
            example: 'gwa8gs8hgw9h2g9hg29',
            required: true,
        },
    },

    exits: {
        success: {
            description:
                'Password successfully updated, and requesting user agent automatically logged in',
            },
        invalidToken: {
            statusCode: 401,
            description:
                'The provided password token is invalid, expired, or has already been used.',
        },
    },

    fn: async function (inputs, exits) {

        if (!inputs.token) {
            return exits.invalidToken({
                error: 'Token invalid or expired or already used',
            });
        }

        let UserDB = await User.findOne({ passwordResetToken: inputs.token });

        if (!UserDB || UserDB.passwordResetTokenExpiresAt <= Date.now()) {
            return exits.invalidToken({
                error: 'Token invalid or expired or already used',
            });
        }

        const hashedPassword = await sails.helpers.passwords.hashPassword(
            inputs.password
        );

        await User.updateOne({ id: UserDB.id }).set({
            password: hashedPassword,
            passwordResetToken: '',
            passwordResetTokenExpiresAt: 0,
        });

        const token = await sails.helpers.generateNewJwtToken(UserDB.email, UserDB.id, 'User');

        this.req.UserDB = UserDB;
        return exits.success({
            message: `Password reset successful. ${UserDB.email} has been logged in`,
            data: UserDB,
            role: 'User',
            token,
        });
    }
};
