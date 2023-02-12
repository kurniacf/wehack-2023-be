/* eslint-disable camelcase */
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
            let regionID = this.req.param('region_id');
            let projectID = this.req.param('id');

            if (projectID) {
                let projectData = await Project.find({id: projectID});

                return exits.success({
                    message: `Success view specific project`,
                    data: projectData
                });
            } else if (regionID) {
                let projectData = await Project.find({region_id: regionID});

                return exits.success({
                    message: `Success view all project by region`,
                    data: projectData
                });
            } else {
                let projectData = await Project.find();

                return exits.success({
                    message: `Success view all project`,
                    data: projectData
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
