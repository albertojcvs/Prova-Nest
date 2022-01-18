import Mail from 'nodemailer/lib/mailer';
import {createTransport} from 'nodemailer';
import { IMailProvider, IMessage } from '../interfaces/IMailProvider';
import mailConfigs from '../../configs/mail';
export class MailTrapProvider implements IMailProvider {
  private transporter: Mail;
  constructor() {
      this.transporter = createTransport(mailConfigs);
      console.log();

  }
  async sendEmail({ to, from, subject, body }: IMessage): Promise<void> {
    await this.transporter.sendMail({ to, from, subject, html: body });
  }
}
