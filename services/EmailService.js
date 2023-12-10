import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: '2ddd86f5c11a08@gmail.com',
    pass: 'b4388762cfbb67',
  },
});

function enviarCorreoVerificacion(destinatario, token) {
  const mailOptions = {
    from: 'Quejup01@gmail.com',
    to: destinatario,
    subject: 'Confirma tu correo electrónico',
    text: `Haz clic en el siguiente enlace para confirmar tu correo electrónico: http://tudominio.com/verificar/${token}`,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        reject(error);
      } else {
        console.log('Correo de verificación enviado: ' + info.response);
        resolve(info.response);
      }
    });
  });
}

export { enviarCorreoVerificacion };
