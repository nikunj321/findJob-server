module.exports = {
    Mutation: {
        askQuestion: async (_, { title, companyId }, { prisma }) => {
            try {
                const newQuestion = await prisma.question.create({
                    data: {
                        title,
                        companyId
                    }
                });

                return newQuestion;
            } catch (err) {
                throw new Error('Error occured while creating a Question');
            }
        },
        answerQuestion: async (_, { answer, questionId }, { prisma }) => {
            const answerd = await prisma.answer.create({
                data: {
                    answer,
                    questionId
                },
                include: {
                    question: true
                }
            });

            return answerd;
        }
    }
}