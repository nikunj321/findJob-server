module.exports = {
    Mutation: {
        createCompany: async (_, { companyInput, jobInput }, { prisma }) => {
            /**
             * Mutation procceds in Series where,
             * Query occurs in Parallel,
             * so first we create Job mutation,
             * then update company
             **/
            const newCompany = await prisma.company.create({
                data: {
                    ...companyInput,
                    job: {
                        create: {
                            ...jobInput
                        }
                    }
                },
                include: {
                    job: true
                }
            });

            return newCompany;

        }
    }
}