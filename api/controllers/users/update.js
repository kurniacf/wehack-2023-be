/* eslint-disable camelcase */
module.exports = {
    friendlyName: 'Update',
    description: 'Update Data User',

    inputs: {
        name: {
            type: 'string',
        },
        email: {
            type: 'string'
        },
        gender: {
            type: 'string',
            isIn: ['male', 'female', 'non-binary', 'other']
        }
    },

    exits: {
        success: {
            statusCode: 200,
            description: 'Success update',
        },
        error: {
            statusCode: 500,
            description: 'Error',
        }
    },

    fn: async function (inputs, exits) {
        try {
            let credential = this.req.headers.authorization.split(' ');

            let tokenHeader = credential[1];
            const data = await sails.helpers.decodeJwtToken(tokenHeader);

            await User.updateOne({ id: data.id }).set({
                name: inputs.name,
                email: inputs.email,
                gender: inputs.gender
            });
            UserDB = await User.findOne({ id: data.id });

            const token = await sails.helpers.generateNewJwtToken(UserDB.email, UserDB.id, 'User');

            return exits.success({
                message: `Success update User Data`,
                data: UserDB,
                role: 'User',
                token: token
            });

        } catch (error) {
            return exits.error({
                message: `Error update User Data`,
                error: error.message
            });
        }
    }
};
