const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVER,
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, 
    auth: {
        user: 'xxrin01299',
        pass: 'bayxyxzohblqwmgy'
    }
});

const sendResetPasswordEmail = async (to, resetPassword) => {
    return new Promise((resolve, reject) => {

    const emailOptions = {
        from: process.env.EMAIL_USER,
        to: to,
        subject: "Ziccding 임시 비밀번호",
        html: "<h1>Ziccding 임시 비밀번호</h1>" +
              "<h2> 비밀번호 : " + resetPassword + "</h2>" +
              '<h3 style="color: red;">임시 비밀번호로 로그인 하신 후 비밀번호를 변경하시기를 바랍니다.</h3>'
    };
 
        transporter.sendMail(emailOptions, (err, info) => {
            if (err) {
                return reject(err);
            }
            resolve(info);
        });
    });

};

module.exports = { sendResetPasswordEmail };