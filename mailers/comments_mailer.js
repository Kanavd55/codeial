const nodeMailer=require('../config/nodemailer');


exports.newComment=(comment) => {
    console.log('inside newComment mailer');
    let htmlString=nodeMailer.renderTemplate({
      comment:comment
    },'/comments/new_comment.ejs')
    nodeMailer.transporter.sendMail({
        from: 'Kanavdahat@gmail.com', // sender address
        to: comment.user.email, // list of receivers
        subject: "New Comment Published", // Subject line
        html: htmlString // html body
      },(err,info)=> {
        if(err){
            console.log('error in sending mail',err);
            return;
        }
        console.log('message sent',info);
        return;
      });
}