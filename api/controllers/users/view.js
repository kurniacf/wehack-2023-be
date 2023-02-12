module.exports = {
    friendlyName: 'View',
    description: 'View User',

    inputs: {
    },

    exits: {
        success: {
            statusCode: 200,
            description: 'Success View',
        },
        error: {
            statusCode: 500,
            description: 'Error',
        },
        notRole: {
            statusCode: 404,
            description: 'Role not admin or User'
        }
    },

    fn: async function (inputs, exits) {
        try {
            let credential = this.req.headers.authorization.split(' ');

            let token = credential[1];
            const data = await sails.helpers.decodeJwtToken(token);

            if (data.role !== 'User') {
                return exits.notRole({
                    message: 'Dont not access role'
                });
            }

            let UserId = this.req.param('id');

            if (UserId) {
                let UserDB = await User.findOne({ id: UserId });

                return exits.success({
                    message: `Success view User`,
                    data: UserDB
                });
            } else {
                let UserDB = await User.find();

                return exits.success({
                    message: `Success view all User`,
                    data: UserDB
                });
            }
        } catch (error) {
            return exits.error({
                message: 'Something went wrong',
                error: error.message
            });
        }
    }
};
