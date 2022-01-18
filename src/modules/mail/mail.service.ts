import { Inject, Injectable } from '@nestjs/common';
import {
  IMailProvider,
  IMessage,
} from 'src/providers/interfaces/IMailProvider';
import { Bet } from '../bets/bet.entity';
import { User } from '../users/user.entity';

@Injectable()
export class MailService {
  constructor(@Inject('PROVIDER') private mailProvider: IMailProvider) {}

  async sendNewUserEmail(message: IMessage, user: User) {
    await this.mailProvider.sendEmail({
      ...message,
      subject: 'Welcome!',
      body: `<h1>Hey, ${user.username}</h1>
    <p>Welcome!!!</p>`,
    });
  }

  private formatBetsToEmail(bets: Bet[]) {
    let text = '';
    bets.forEach((bet) => {
      text += `<li>${bet.game.type}: ${bet.numbers}</li>`;
    });
    return text;
  }
  async sendNewBetsEmail(message: IMessage, user: User, bets: Bet[]) {
    await this.mailProvider.sendEmail({
      ...message,
      subject: 'Your new bets!',
      body: `
      <h1>Hey, ${user.username}</h1>
      <p>You made new bets</p>  
      <p>Bets:</p>
      <ul>${this.formatBetsToEmail(bets)}</ul>  
      `,
    });
  }
}
