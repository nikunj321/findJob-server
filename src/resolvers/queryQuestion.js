module.exports = {
    Query: {
        searchQuestion: async (_, { keyword, companyId }, { prisma }) => {
            const availableQuestions = await prisma.question.findMany({
                where: {
                    AND: [
                        {
                            title: {
                                constains: keyword
                            }
                        },
                        {
                            companyId
                        }
                    ]
                }
            });

            return availableQuestions;
        }
    }
}