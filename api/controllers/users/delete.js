module.exports = {
    friendlyName: 'Delete',
    description: 'Delete User',

    inputs: {
    },

    exits: {
        success: {
            statusCode: 200,
            description: 'Success update',
        },
        error: {
            statusCode: 500,
            description: 'Error',
        },
    },


    fn: async function (inputs, exits) {
        try {
            let credential = this.req.headers.authorization.split(' ');

            let token = credential[1];
            const data = await sails.helpers.decodeJwtToken(token);

            await User.destroyOne({ id: data.id });

            return exits.success({
                message: `Success delete User`
            });

        } catch (error) {
            return exits.error({
                message: `Error delete User`,
                error: error.message
            });
        }
    }
};
