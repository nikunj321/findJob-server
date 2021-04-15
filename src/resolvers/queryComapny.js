module.exports = {
    Query: {
        company: async (_, args, { prisma }) => {
            const allCompany = await prisma.company.findMany({
                include: {
                    job: true,
                }
            });

            return allCompany;
        },
        findCompanyById: async (_, { id }, { prisma }) => {
            const theComapany = await prisma.company.findUnique({
                where: { id },
                include: {
                    job: true,
                    question: {
                        include: {
                            answer: true
                        }
                    }
                }
            });
            return theComapany;
        },
        findCompanyByName: async (_, { name }, { prisma }) => {
            const companyList = await prisma.company.findMany({
                where: {
                    name: {
                        contains: name
                    }
                },
                include: { job: true }
            });

            return companyList;
        }
    }
}