import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  const { name, email, phone, subject, message } = req.body || {};

  if (!name || (!message && !phone)) {
    return res.status(400).json({ success: false, message: 'Name and message/phone are required fields.' });
  }

  try {
    const gmailUser = process.env.GMAIL_USER || 'altoobafoods2026@gmail.com';
    const gmailPass = process.env.GMAIL_APP_PASSWORD;

    if (!gmailPass) {
      console.warn('GMAIL_APP_PASSWORD is not configured in environment variables.');
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: gmailUser,
        pass: gmailPass,
      },
      connectionTimeout: 4000,
      greetingTimeout: 3000,
      socketTimeout: 5000,
    });

    const isConsultation = subject && subject.toLowerCase().includes('consultation');
    const bannerHeaderTitle = isConsultation 
      ? 'Al-Tooba® Website Consultation Booking' 
      : 'Al-Tooba® Website Contact Us Message';

    const mailOptions = {
      from: `"Al-Tooba Website Inquiry" <${gmailUser}>`,
      replyTo: (email && email.trim()) ? email : gmailUser,
      to: 'altoobafoods2026@gmail.com',
      subject: `${subject || 'New Customer Inquiry'} - ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 24px; color: #1a1a1a; max-width: 600px; border: 1px solid #E8E1D5; border-radius: 12px; background-color: #FAF7F2;">
          <div style="background-color: #0D3B2A; padding: 18px 24px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #D4A24C; margin: 0; font-size: 20px; font-family: Georgia, serif;">${bannerHeaderTitle}</h2>
          </div>
          <p style="font-size: 15px; margin-bottom: 8px;"><strong>Customer Name:</strong> ${name}</p>
          <p style="font-size: 15px; margin-bottom: 8px;"><strong>Email Address:</strong> <a href="mailto:${email}" style="color: #0D3B2A; text-decoration: underline;">${email}</a></p>
          <p style="font-size: 15px; margin-bottom: 8px;"><strong>Phone Number:</strong> ${phone || 'Not provided'}</p>
          <p style="font-size: 15px; margin-bottom: 16px;"><strong>Subject:</strong> ${subject || 'General Query'}</p>
          
          <hr style="border: 0; border-top: 1px solid #D4A24C; margin: 20px 0; opacity: 0.4;" />
          
          <h3 style="color: #0D3B2A; font-size: 16px; margin-bottom: 10px;">Message:</h3>
          <div style="background-color: #ffffff; padding: 16px; border-radius: 8px; border-left: 4px solid #D4A24C; font-size: 14px; line-height: 1.6; color: #2d3748; white-space: pre-wrap;">${message}</div>
          
          <p style="font-size: 11px; color: #888888; margin-top: 24px; text-align: center;">This message was submitted via the Al-Tooba website contact form.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    return res.status(200).json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Nodemailer Error:', error);
    return res.status(500).json({ success: false, message: 'Failed to send email. Please check App Password configuration.' });
  }
}
