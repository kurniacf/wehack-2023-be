module.exports = {
    friendlyName: 'Check account',
    description: 'Check Account',
    inputs: {
        token: {
            type: 'string',
            required: true,
        }
    },

    exits: {
        success: {
            statusCode: 200,
            description: 'Check account successful',
        },
        error: {
            statusCode: 500,
            description: 'Something went wrong',
        },
        notRole: {
            statusCode: 400,
            description: 'Not role',
        }
    },

    fn: async function (inputs, exits) {
        try {
            const data = await sails.helpers.decodeJwtToken(inputs.token);

            if (data.role !== 'User') {
                return exits.notRole({
                    message: 'Dont not access role'
                });
            }

            return exits.success({
                message: 'Success check account',
                data
            });

        } catch (error) {
        return exits.error({
            message: error.message
        });
        }
    }
};
