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
  // 1. Verificar Método HTTP
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  // 2. Obtener Variables de Entorno (¡Importante configurarlas en Vercel!)
  const resendApiKey = process.env.RESEND_API_KEY;
  const notificationEmail = process.env.NOTIFICATION_EMAIL; // ej. narbaal369@gmail.com
  const fromEmail = process.env.FROM_EMAIL || 'noreply@vanguardhive.com'; // Email verificado en Resend

  if (!resendApiKey) {
    console.error('Error: RESEND_API_KEY environment variable is not set.');
    return res.status(500).json({ error: 'Server configuration error [API Key missing]' });
  }
  if (!notificationEmail) {
    console.error('Error: NOTIFICATION_EMAIL environment variable is not set.');
    return res.status(500).json({ error: 'Server configuration error [Notification email missing]' });
  }

  // 3. Extraer y Validar Datos del Formulario
  const formData = req.body as FormData;

  // Validación básica (puedes añadir más si es necesario)
  if (!formData.email || !formData.formType) {
    return res.status(400).json({ error: 'Missing required fields (email, formType)' });
  }

  // 4. Inicializar Resend
  const resend = new Resend(resendApiKey);

  // 5. Construir el Email
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
      console.error(`Unknown form type: ${formData.formType}`);
      return res.status(400).json({ error: 'Invalid form type' });
  }

  // 6. Enviar el Email
  try {
    const { data, error } = await resend.emails.send({
      from: `VanguardHive Forms <${fromEmail}>`, // Debe ser un dominio verificado en Resend
      to: [notificationEmail],
      subject: subject,
      text: textContent,
      html: htmlContent, // Puedes comentar esta línea si solo quieres texto plano
      replyTo: formData.email, // Para poder responder directamente al usuario
    });

    if (error) {
      console.error('Resend API Error:', error);
      return res.status(500).json({ error: 'Failed to send email', details: error.message });
    }

    console.log('Email sent successfully:', data);
    return res.status(200).json({ message: 'Form submitted successfully!' });

  } catch (error) {
    console.error('Error sending email:', error);
    // Asegurarse de que 'error' es de tipo Error
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return res.status(500).json({ error: 'Internal server error', details: errorMessage });
  }
}
