const { rule } = require('graphql-shield');

export const isAuthenticated = rule()(async (parent, args, { user }) => {
    // if user === Null 
    if (!user) {
        return false;
    }

    return true;
});

export const checkPermission = (user, permission) => {

    if (user) {
        return user.permission.includes(permission);
    }

    return false;
}