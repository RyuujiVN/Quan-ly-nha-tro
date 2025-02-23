import nodemailer from 'nodemailer'

const sendEmail = (userEmail, subject, html) => {
    // config mail server
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for port 465, false for other ports
        auth: {
            user: process.env.USER_EMAIL,
            pass: process.env.USER_PASSWORD,
        },
        tls: {
            rejectUnauthorized: false // (Chỉ dùng trong môi trường dev nếu có chứng chỉ tự ký)
        }
    });

    const mainOptions = { // thiết lập đối tượng, nội dung gửi mail
        from: process.env.USER_EMAIL,
        to: userEmail,
        subject: subject,
        html: html
    }
    
    transporter.sendMail(mainOptions, (err, info) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Message sent: ' + info.response);
        }
    });
}

export default sendEmail