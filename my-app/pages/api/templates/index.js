import prisma from '@/utils/db';
import { authenticateUser } from '@/middlware/auth';



export default async function handler(req, res) {
    if (req.method === 'POST') {
        const user = await authenticateUser(req);
        if (!user) return res.status(401).json({ message: "Unauthorized" });

        const { title, code, explanation, tags } = req.body;

        try {
            const newTemplate = await prisma.template.create({
                data: {
                    title,
                    code,
                    explanation,
                    user: { connect: { id: user.id } },
                    tags: {
                        connectOrCreate: tags.map(tag => ({
                            where: {name: tag},
                            create: {name: tag}
                        })),
                    },
                },
            });
            res.status(201).json(newTemplate);
        } catch (error) {
            res.status(500).json({ message: "Error creating template", error });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end('Method ${req.method} Not allowed')
    }
}
