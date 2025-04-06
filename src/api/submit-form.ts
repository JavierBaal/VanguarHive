import type { VercelRequest, VercelResponse } from '@vercel/node';

// EXTREMELY Simplified Handler for Debugging
export default function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  console.log('--- EXTREMELY SIMPLIFIED submit-form function started ---');
  console.log('Request Method:', req.method);

  if (req.method === 'POST') {
    console.log('Received POST request. Body:', req.body);
    // Directly return success without any external calls or complex logic
    return res.status(200).json({ message: 'DEBUG: Simplified function executed successfully!' });
  } else {
    // Handle other methods if necessary, or return Method Not Allowed
    console.log(`Method ${req.method} received, only POST allowed.`);
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}
