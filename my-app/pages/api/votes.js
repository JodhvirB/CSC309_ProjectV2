import prisma from '@/utils/db';
import { authenticateUser } from '@/middleware/auth';

export default async function handler(req, res) {
  const user = await authenticateUser(req);
  if (!user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const { id, type, itemType } = req.body; // id: item ID, type: 'upvote' or 'downvote', itemType: 'blogPost' or 'comment'

  if (!['upvote', 'downvote'].includes(type) || !['blogPost', 'comment'].includes(itemType)) {
    return res.status(400).json({ message: 'Invalid type or itemType' });
  }

  try {
    // Check if the vote already exists
    const existingVote = await prisma.vote.findFirst({
      where: {
        userId: user.id,
        blogPostId: itemType === 'blogPost' ? id : null,
        commentId: itemType === 'comment' ? id : null,
      },
    });

    if (existingVote) {
      // If the existing vote type is the same, remove it to "toggle off" the vote
      if (existingVote.type === type) {
        await prisma.vote.delete({ where: { id: existingVote.id } });
        return res.status(200).json({ message: `${type} removed` });
      }

      // Otherwise, update the vote type to the new type
      await prisma.vote.update({
        where: { id: existingVote.id },
        data: { type },
      });
      return res.status(200).json({ message: `Vote changed to ${type}` });
    }

    // Create a new vote
    const newVote = await prisma.vote.create({
      data: {
        type,
        userId: user.id,
        blogPostId: itemType === 'blogPost' ? id : null,
        commentId: itemType === 'comment' ? id : null,
      },
    });

    return res.status(201).json({ message: `Voted ${type}`, vote: newVote });
  } catch (error) {
    console.error("Error processing vote:", error);
    res.status(500).json({ message: 'Failed to process vote' });
  }
}