module.exports = {
    Mutation: {
        createJob: async (_, { jobInput, companyId }, { prisma }) => {

            const newJob = await prisma.job.create({
                data: {
                    ...jobInput,
                    companyId
                },
                include: {
                    company: true
                }
            });

            return newJob;
        },
        updateJob: async (_, { id, updateInput, companyId }, { prisma }) => {

            const updatedJob = await prisma.company.update({
                where: { id: companyId },
                data: {
                    job: {
                        update: {
                            where: { id },
                            data: {
                                ...updateInput
                            }
                        }
                    }
                }
            })

            return true;

        },
        deleteJob: async (_, { id }, { prisma }) => {
            /**
             * https://www.prisma.io/docs/concepts/components/prisma-client/crud#cascading-deletes-deleting-related-records
             */
            await prisma.company.update({
                where: { id: company },
                data: {
                    job: {
                        deleteMany: [
                            { id }
                        ]
                    }
                }
            });

            return true;
        }
    }
}