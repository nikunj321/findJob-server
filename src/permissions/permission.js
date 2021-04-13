const { shield, and, } = require('graphql-shield')

const { isAuthenticated, onlyCompany, onlyUser } = require('./authUtils');


module.exports = shield({
    Query: {
        user: and(isAuthenticated, onlyUser)
    },
    Mutation: {
        updateJob: and(isAuthenticated, onlyCompany),
        deleteJob: and(isAuthenticated, onlyCompany),
        createJob: and(isAuthenticated, onlyCompany)
    }
})