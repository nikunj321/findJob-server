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

const onlyCompany = rule()(
    (parent, args, { user }) => {
        return checkPermission(user, "company");
    }
)

const onlyUser = rule()(
    (_, args, { user }) => {
        return checkPermission(user, "user");
    }
)

module.exports = {
    isAuthenticated,
    onlyCompany,
    onlyUser
}