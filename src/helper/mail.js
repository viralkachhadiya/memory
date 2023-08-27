import sgMail from "@sendgrid/mail";
import config from "config";

sgMail.setApiKey(config.get("sendgrid_api_key"));

export const mailHandler = async (email, title, desc) => {
    try {
        let response = await sgMail.send({
            to: email,
            from: config.get("sendgrid_from_email"),
            subject: title,
            text: `${desc} \n\n
            Yours securely, \n\n
            By Memory`,
            html: `${desc}<br/><br/>
            Yours securely,<br/>
            By Memory`,
        });
        if (!!response) {
            return true;
        }
    } catch (error) {
        return false;
    }
}