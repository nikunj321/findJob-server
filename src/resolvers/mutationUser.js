const { hash, compare } = require("bcryptjs");
const { issueAccessToken } = require("../utils/accessToken");
const { issueRefreshToken } = require("../utils/refreshToken");

module.exports = {
    Query: {
        user: () => "welcome user"
    },
    Mutation: {
        signUpUser: async (_, { email, password }, { prisma }) => {
            try {
                const hashPass = await hash(password, 12);
                const newUser = await prisma.user.create({
                    data: {
                        email,
                        hashPass,
                    }
                });
                console.log(newUser);

                return true;
            } catch (err) {
                return false;
            }
        },
        loginUser: async (_, { email, password }, { prisma }) => {
            const isUser = await prisma.user.findUnique({ where: { email } });

            if (!isUser) {
                throw new Error("invalid user and password");
            }
            const isValid = await compare(password, isUser.hashPass);

            if (!isValid) {
                throw new Error("Invalid password");
            }
            const { role } = isUser;

            const payload = {
                email,
                role
            };

            return {
                accessToken: issueAccessToken(payload),
                refreshToken: issueRefreshToken(payload),
            }

        }
    }
}