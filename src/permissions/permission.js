const { shield, and, not } = require('graphql-shield');
const { isAuthenticated, onlyCompany, onlyUser, ownJobOnly } = require('./authUtils');


module.exports = shield({
    Query: {
        user: and(isAuthenticated, onlyUser),
    },
    Mutation: {
        updateJob: and(isAuthenticated, onlyCompany, ownJobOnly),
        deleteJob: and(isAuthenticated, onlyCompany, ownJobOnly),
        createJob: and(isAuthenticated, onlyCompany),
        askQuestion: isAuthenticated,
    }
})