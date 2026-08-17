import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import nodemailer from 'nodemailer';

function localApiPlugin() {
  return {
    name: 'local-api-plugin',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url === '/api/contact' && req.method === 'POST') {
          let body = '';
          req.on('data', chunk => { body += chunk.toString(); });
          req.on('end', async () => {
            try {
              const data = JSON.parse(body || '{}');
              const { name, email, phone, subject, message } = data;

              const env = loadEnv('', process.cwd(), '');
              const gmailUser = env.GMAIL_USER || process.env.GMAIL_USER || 'altoobafoods2026@gmail.com';
              const gmailPass = env.GMAIL_APP_PASSWORD || process.env.GMAIL_APP_PASSWORD;

              if (!gmailPass) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                return res.end(JSON.stringify({ success: false, message: 'GMAIL_APP_PASSWORD is missing in .env file!' }));
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

              await transporter.sendMail({
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
                  </div>
                `,
              });

              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: true, message: 'Message sent successfully!' }));
            } catch (err) {
              console.error('Local Api Contact Error:', err);
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: false, message: 'Error sending email: ' + (err.message || 'Unknown error') }));
            }
          });
        } else {
          next();
        }
      });
    }
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), localApiPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      chunkSizeWarningLimit: 1000,
    },
    server: {
      host: true,
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
      proxy: {
        '/judgeme-api': {
          target: 'https://judge.me/api/v1',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/judgeme-api/, '')
        }
      }
    },
  };
});
