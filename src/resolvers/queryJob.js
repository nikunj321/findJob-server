module.exports = {
    Query: {
        job: async (_, args, { prisma }) => {
            try {
                const allJob = await prisma.job.findMany({
                    include: {
                        company: true
                    }
                });
                return allJob;
            }
            catch (error) {
                throw new Error("could not find any job")
            }
        },
        findJobById: async (_, { id }, { prisma }) => {
            try {
                const uniqueIdJob = await prisma.job.findUnique({
                    where: { id },
                    include: { company: true }
                });

                return uniqueIdJob;
            } catch (error) {
                throw new Error(`could not find job with id:${id}`);
            }
        },
        searchJob: async (_, { contains }, { prisma }) => {
            const searchResult = await prisma.job.findMany({
                where: {
                    title: { contains },
                    description: { contains },
                    role: { contains }
                },
                select: {
                    company: {
                        select: {
                            id: true,
                            name: true,
                            logoUrl: true,
                        }
                    }
                }
            });

            return searchResult;
        }
    }
}