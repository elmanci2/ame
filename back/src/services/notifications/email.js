import nodemailer from 'nodemailer'

// Configurar el transporte de correo
const transporter = nodemailer.createTransport({
    auth: {
        user: 'ips@notificaciones-ipsnelsonmandela.com',
        pass: '34F6285C7B27C2482F7A968EF4C0FB0E80C1'
    }
});


export function enviarCorreo(asunto, cuerpo, destinatario) {
    // Configurar los datos del correo
    const mailOptions = {
        from: 'mancillaandres7@gmail.com',
        to: destinatario,
        subject: asunto,
        text: cuerpo
    };


    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error al enviar el correo electrónico:', error);
        } else {
            console.log('Correo electrónico enviado con éxito:', info.response);
        }
    });
}
