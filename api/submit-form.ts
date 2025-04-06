import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';
import { z } from 'zod';

// Schema for form data validation
const FormDataSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  product: z.string().optional(), // For beta forms (e.g., "TehorIA", "Kairos Jurista")
  message: z.string().optional(), // For contact form
});

// Initialize Resend with API key from environment variables
const resendApiKey = process.env.RESEND_API_KEY;
const recipientEmail = process.env.RECIPIENT_EMAIL; // Email to send notifications to
// IMPORTANT: Replace with your verified sender email in Resend
const senderEmail = 'VanguardHive Notifier <noreply@vanguardhive.com>';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  console.log('--- Full submit-form handler started ---');
  console.log('Request Method:', req.method);

  if (req.method !== 'POST') {
    console.log(`Method ${req.method} received, only POST allowed.`);
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  console.log('Received POST request. Raw Body:', req.body);

  // Validate environment variables
  if (!resendApiKey) {
    console.error('RESEND_API_KEY environment variable is not set.');
    return res.status(500).json({ error: 'Server configuration error [API Key Missing]' });
  }
  if (!recipientEmail) {
    console.error('RECIPIENT_EMAIL environment variable is not set.');
    return res.status(500).json({ error: 'Server configuration error [Recipient Email Missing]' });
  }

  const resend = new Resend(resendApiKey);

  try {
    // Validate request body against schema
    // Vercel automatically parses JSON body for POST requests
    const parseResult = FormDataSchema.safeParse(req.body);

    if (!parseResult.success) {
      console.error('Form validation failed:', parseResult.error.errors);
      // Return detailed validation errors for debugging (optional for production)
      return res.status(400).json({ error: 'Invalid form data.', details: parseResult.error.flatten() });
    }

    const { name, email, product, message } = parseResult.data;
    console.log('Validated form data:', { name, email, product, message });

    const subject = product
      ? `Beta Request: ${product} - ${name}`
      : `Contact Form Submission - ${name}`;

    const emailBody = `
      <h1>${subject}</h1>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      ${product ? `<p><strong>Product:</strong> ${product}</p>` : ''}
      ${message ? `<p><strong>Message:</strong></p><p>${message.replace(/\n/g, '<br>')}</p>` : ''}
      <hr>
      <p><em>Received via VanguardHive Website</em></p>
    `;

    console.log(`Attempting to send email via Resend from ${senderEmail} to ${recipientEmail}...`);

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: senderEmail,
      to: [recipientEmail],
      subject: subject,
      html: emailBody,
      replyTo: email // Set reply-to for easier response (Corrected property name)
    });

    if (error) {
      console.error('Resend API Error:', error);
      // Provide a more specific error message if possible
      return res.status(500).json({ error: 'Failed to send message.', details: error.message });
    }

    console.log('Email sent successfully via Resend! ID:', data?.id);
    return res.status(200).json({ message: 'Form submitted successfully!' });

  } catch (error) {
    console.error('Unexpected error in handler:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return res.status(500).json({ error: 'An internal server error occurred.', details: errorMessage });
  }
}
