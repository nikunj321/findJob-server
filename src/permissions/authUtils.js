const { rule } = require('graphql-shield');

const isAuthenticated = rule({ cache: "contextual" })(
    async (parent, args, { user }) => {
        // if user === Null 
        if (!user) {
            return false;
        }
        return true;
    });

const checkPermission = (user, permission) => {
    if (user) {
        return user["role"].includes(permission);
    }
    return false;
}

const onlyCompany = rule({ cache: "contextual" })(
    (parent, args, { user }) => {
        return checkPermission(user, "company");
    }
)

const onlyUser = rule({ cache: "contextual" })(
    (_, args, { user }) => {
        return checkPermission(user, "user");
    }
)

const ownJobOnly = rule({ cache: "contextual" })(
    async (_, { id }, { user, prisma }) => {
        const existJob = await prisma.job.findFirst({
            where: { id }
        });

        if (!existJob) {
            return false;
        }

        if (existJob.compayId !== user.id) {
            return false;
        }

        return true;
    }
)

module.exports = {
    isAuthenticated,
    onlyCompany,
    onlyUser,
    ownJobOnly
}