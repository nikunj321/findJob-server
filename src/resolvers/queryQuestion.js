module.exports = {
    Query: {
        searchQuestion: async (_, { keyword, companyId }, { prisma }) => {
            try {
                const availableQuestions = await prisma.question.findMany({
                    where: {
                        AND: [
                            {
                                title: {
                                    contains: keyword
                                }
                            },
                            {
                                companyId
                            }
                        ]
                    }

                });

                return availableQuestions;
            } catch (err) {
                throw new Error('something went wrong while fetching Question');
            }
        }
    }
}