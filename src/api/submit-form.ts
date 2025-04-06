import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

// Define la estructura esperada de los datos del formulario
interface FormData {
  name?: string;
  email?: string;
  company?: string; // Específico de Kairos
  phone?: string;   // Específico de Kairos
  message?: string; // Mensaje general o "¿Qué tipo de música creas?" para TehorIA
  formType: 'contact' | 'tehoria-beta' | 'kairos-beta'; // Para saber qué formulario se envió
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  console.log('--- submit-form function started ---'); // Log start
  console.log('Request Method:', req.method);

  // 1. Verificar Método HTTP
  if (req.method !== 'POST') {
    console.error('Error: Method Not Allowed -', req.method);
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  // 2. Obtener Variables de Entorno (¡Importante configurarlas en Vercel!)
  console.log('Reading environment variables...');
  const resendApiKey = process.env.RESEND_API_KEY;
  const notificationEmail = process.env.NOTIFICATION_EMAIL; // ej. narbaal369@gmail.com
  const fromEmail = process.env.FROM_EMAIL || 'noreply@vanguardhive.com'; // Email verificado en Resend

  console.log('RESEND_API_KEY:', resendApiKey ? 'Exists' : 'MISSING!');
  console.log('NOTIFICATION_EMAIL:', notificationEmail || 'MISSING!');
  console.log('FROM_EMAIL:', fromEmail);


  if (!resendApiKey) {
    console.error('FATAL: RESEND_API_KEY environment variable is not set.');
    return res.status(500).json({ error: 'Server configuration error [API Key missing]' });
  }
  if (!notificationEmail) {
    console.error('FATAL: NOTIFICATION_EMAIL environment variable is not set.');
    return res.status(500).json({ error: 'Server configuration error [Notification email missing]' });
  }

  // 3. Extraer y Validar Datos del Formulario
  console.log('Extracting form data from request body...');
  const formData = req.body as FormData;
  console.log('Received formData:', JSON.stringify(formData, null, 2)); // Log received data

  // Validación básica (puedes añadir más si es necesario)
  if (!formData.email || !formData.formType) {
    console.error('Error: Missing required fields (email, formType). Data:', formData);
    return res.status(400).json({ error: 'Missing required fields (email, formType)' });
  }

  // 4. Inicializar Resend
  console.log('Initializing Resend client...');
  const resend = new Resend(resendApiKey);
  console.log('Resend client initialized.');

  // --- TEMPORARY DEBUGGING: Bypass Resend ---
  console.log('--- DEBUG: Bypassing Resend logic ---');
  return res.status(200).json({ message: 'DEBUG: Form data received, Resend bypassed.' });
  // --- END TEMPORARY DEBUGGING ---

  /* // Original Resend Logic - Temporarily Commented Out
  // 5. Construir el Email
  console.log('Building email content for formType:', formData.formType);
  let subject = '';
  let textContent = '';
  let htmlContent = ''; // Opcional: versión HTML del correo

  switch (formData.formType) {
    case 'contact':
      subject = `Nuevo Mensaje de Contacto desde VanguardHive`;
      textContent = `Has recibido un nuevo mensaje:\n\nNombre: ${formData.name || 'No proporcionado'}\nEmail: ${formData.email}\nMensaje:\n${formData.message || 'No proporcionado'}`;
      htmlContent = `<p>Has recibido un nuevo mensaje:</p><ul><li><strong>Nombre:</strong> ${formData.name || 'No proporcionado'}</li><li><strong>Email:</strong> ${formData.email}</li></ul><p><strong>Mensaje:</strong></p><p>${formData.message || 'No proporcionado'}</p>`;
      break;
    case 'tehoria-beta':
      subject = `Nueva Solicitud Beta para TehorIA`;
      textContent = `Nueva solicitud para la beta de TehorIA:\n\nNombre: ${formData.name || 'No proporcionado'}\nEmail: ${formData.email}\nTipo de música / Mensaje:\n${formData.message || 'No proporcionado'}`;
      htmlContent = `<p>Nueva solicitud para la beta de TehorIA:</p><ul><li><strong>Nombre:</strong> ${formData.name || 'No proporcionado'}</li><li><strong>Email:</strong> ${formData.email}</li><li><strong>Tipo de música / Mensaje:</strong> ${formData.message || 'No proporcionado'}</li></ul>`;
      break;
    case 'kairos-beta':
      subject = `Nueva Solicitud Beta para KAIROS Jurista`;
      textContent = `Nueva solicitud para la beta de KAIROS Jurista:\n\nNombre: ${formData.name || 'No proporcionado'}\nEmpresa: ${formData.company || 'No proporcionado'}\nEmail: ${formData.email}\nTeléfono: ${formData.phone || 'No proporcionado'}\nMensaje:\n${formData.message || 'No proporcionado'}`;
      htmlContent = `<p>Nueva solicitud para la beta de KAIROS Jurista:</p><ul><li><strong>Nombre:</strong> ${formData.name || 'No proporcionado'}</li><li><strong>Empresa:</strong> ${formData.company || 'No proporcionado'}</li><li><strong>Email:</strong> ${formData.email}</li><li><strong>Teléfono:</strong> ${formData.phone || 'No proporcionado'}</li></ul><p><strong>Mensaje:</strong></p><p>${formData.message || 'No proporcionado'}</p>`;
      break;
    default:
      console.error(`FATAL: Unknown form type received: ${formData.formType}`);
      return res.status(400).json({ error: 'Invalid form type' });
  }
  console.log('Email subject:', subject);

  // 6. Enviar el Email
  console.log(`Attempting to send email via Resend from ${fromEmail} to ${notificationEmail}...`);
  try {
    const emailPayload = {
      from: `VanguardHive Forms <${fromEmail}>`, // Debe ser un dominio verificado en Resend
      to: [notificationEmail],
      subject: subject,
      text: textContent,
      html: htmlContent, // Puedes comentar esta línea si solo quieres texto plano
      replyTo: formData.email, // Para poder responder directamente al usuario
    };
    console.log('Resend payload:', JSON.stringify(emailPayload, null, 2));

    const { data, error } = await resend.emails.send(emailPayload);

    if (error) {
      console.error('Resend API returned an error:', JSON.stringify(error, null, 2));
      return res.status(500).json({ error: 'Failed to send email', details: error.message });
    }

    console.log('Resend API success response:', JSON.stringify(data, null, 2));
    console.log('--- submit-form function finished successfully ---');
    return res.status(200).json({ message: 'Form submitted successfully!' });

  } catch (error) {
    console.error('FATAL: Exception caught while sending email:', error);
    // Asegurarse de que 'error' es de tipo Error
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return res.status(500).json({ error: 'Internal server error', details: errorMessage });
  }
  */ // End of commented out Resend logic
}
