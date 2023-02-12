module.exports = {
    friendlyName: 'View',
    description: 'View States.',

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
        }
    },

    fn: async function (inputs, exits) {
        try {
            let stateID = this.req.param('id');

            if (stateID) {
                stateDB = await States.findOne({id: stateID});
                return exits.success({
                    message: `Success view State`,
                    data: stateDB
                });
            } else {
                stateDB = await States.find();
                return exits.success({
                    message: `Success view all State`,
                    data: stateDB
                });
            }

        } catch (error) {
            return exits.error({
                message: 'Error',
                error: error.message
            });
        }
    }
};
