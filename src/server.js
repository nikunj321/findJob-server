const { ApolloServer, gql } = require('apollo-server-express');
const express = require('express');
const { PrismaClient } = require('@prisma/client')
const fs = require('fs');
const path = require('path');
const expressJwt = require('express-jwt');


/**
 *      Importing resolvers
 */
const queryJob = require('./resolvers/queryJob');
const mutationJob = require('./resolvers/mutationJob');
const mutationCompany = require('./resolvers/mutationCompany');
const queryCompany = require('./resolvers/queryComapny');
const mutationLogin = require('./resolvers/mutationLogin');

/**
 * constants
 */
const port = 4000;
const prisma = new PrismaClient();

const resolvers = [
    queryJob,
    queryCompany,
    mutationJob,
    mutationCompany,
    mutationLogin
]

const typeDefs = fs.readFileSync(
    path.join(__dirname, "schema.graphql"),
    "utf8"
)

const app = express();
/**
 * expressjwt- decode token from incoming Header
 */
app.use(
    expressJwt({
        secret: process.env.ACCESS_TOKEN_SECRET,
        algorithms: ["HS256"],
        credentialsRequired: false
    })
)



const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
        const user = req.user || null;
        return { user, prisma }
    }
})


server.applyMiddleware({ app });

app.listen(({ port }), () => {
    console.log(`server starting at http://localhost:${port}${server.graphqlPath}`);
})
