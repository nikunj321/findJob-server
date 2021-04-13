const { compare } = require("bcryptjs");
const { issueAccessToken } = require("../utils/accessToken");
const { issueRefreshToken } = require("../utils/refreshToken");

module.exports = {
    Mutation: {
        login: async (_, { email, password }, { prisma }) => {
            const isUser = await prisma.user.findUnique({
                where: { email }
            });

            if (!isUser) {
                throw new Error('Invalid Email/Password');
            }

            const isValid = await compare(password, user.hashPass);

            if (!isValid) {
                throw new Error("Invalid Email/Password");
            }

            const user = await prisma.company.findUnique({ where: { email } });
            const payload = {
                id: user.id,
                role: ["company"]
            }

            return {
                accessToken: issueAccessToken(payload),
                refreshToken: issueRefreshToken(payload)
            }
        }

    }
}