export default async function handler(req, res) {
    if (req.method === 'POST') {
      // Clear the token on the client side by removing it from local storage or cookies
      return res.status(200).json({ message: 'Logged out successfully' });
    } else {
      return res.status(405).json({ message: 'Method not allowed' });
    }
  }