import { PrismaClient } from '@prisma/client';
import { authenticateUser } from '@/middlware/auth';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    const { query } = req.query;

    try {
        const templates = await prisma.template.findMany({
            where: {
                OR: [
                    { title: { contains: query, mode: 'insensitive' } },
                    { explanation: { contains: query, mode: 'insensitive' } },
                    { code: { contains: query, mode: 'insensitive' } },
                ],
            },
            include: { tags: true },
        });
        res.status(200).json(templates);
    } catch (error) {
        res.status(500).json({ message: 'Error searching templates', error });
    }
}