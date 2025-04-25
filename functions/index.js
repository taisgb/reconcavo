const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
const cors = require('cors')({
  origin: true,  
  methods: ['POST'],
  allowedHeaders: ['Content-Type']
});

// Configuração do servidor SMTP do UOL Host ou Gmail
const transporter = nodemailer.createTransport({
  host: 'smtp.uhserver.com',  
  port: 587,  // 
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD
  }
});



// Função Firebase para enviar e-mail
exports.sendMail = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    if (req.method !== 'POST') {
      return res.status(405).send('Método não permitido');
    }

    const { name, email, phone, subject, message } = req.body;

    const mailOptions = {
      from: email,  
      to: 'atendimento@reconcavoea.com.br',  
      subject: `Mensagem do site: ${subject}`,
      text: `Nome: ${name}\nEmail: ${email}\nTelefone: ${phone}\n\nMensagem:\n${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Erro ao enviar e-mail:', error);
        return res.status(500).send('Erro ao enviar. Tente novamente.');
      }
      return res.status(200).send('Mensagem enviada com sucesso!');
    });
  });
});
