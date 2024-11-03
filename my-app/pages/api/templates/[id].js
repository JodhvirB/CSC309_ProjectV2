import { PrismaClient } from '@prisma/client';
import { authenticateUser } from '@/middleware/auth';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    const user = await authenticateUser(req);
    if (!user) return res.status(401).json({ message: 'Unauthorized' });

    const { id } = req.query;

    if (req.method === 'PUT') {
        const { title, code, explanation, tags } = req.body;

        try {
            const template = await prisma.template.findUnique({ where: { id: Number(id) } });
            if (template.userId !== user.id) return res.status(403).json({ message: 'Forbidden' });

            const updatedTemplate = await prisma.template.update({
                where: { id: Number(id) },
                data: {
                    title, 
                    code,
                    explanation,
                    tags: {
                        set: [],
                        connectOrCreate: tags.map(tag => ({
                            where: { name: tag },
                            create: { name: tag }
                        })),
                    },
                },
            });
            res.status(200).json(updatedTemplate);
        } catch (error) {
            res.status(500).json({ message: 'Error updating template', error });
        }
    } else if (req.method === 'DELETE') {
        try {
            const template = await prisma.template.findUnique({
                where: { id: Number(id) },
            });
            if (!template) return res.status(404).json({ message: 'Template not found' });
            if (template.userId !== user.id) return res.status(403).json({ message: 'Forbidden' });

            await prisma.template.delete({
                where: { id: Number(id) },
            });
            res.status(204).end();
        } catch (error) {
            res.status(500).json({ message: 'Error deleting template', error});
        }
    } else {
        res.setHeader('Allow', ['PUT', 'DELETE']);
        res.status(405).end('Method ${req.method} Not allowed');
    }
}