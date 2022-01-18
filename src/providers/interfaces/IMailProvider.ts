export interface IMessage {
    to:string
    from:string
    subject:string
    body?:string
}

export interface IMailProvider {
  sendEmail(message: IMessage): Promise<void>;
}
