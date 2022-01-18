import { DynamicModule, Global, Module } from '@nestjs/common';
import { IMailProvider } from 'src/providers/interfaces/IMailProvider';
import { MailService } from './mail.service';

@Global()
@Module({})
export class MailModule {
    static register({func}:{func:() => IMailProvider}): DynamicModule {
      return {
        module: MailModule,
        providers: [{ provide: 'PROVIDER', useValue: func() }, MailService],
        exports: [MailService]
      };
    }
}
