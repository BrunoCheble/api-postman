interface Request {
  emails: string[];
  subject: string;
  body: string;
}

class SendEmailService {
  private emails: string[];

  constructor() {
    this.emails = [];
  }

  public execute({ emails, subject, body }: Request): string[] {
    console.log({ emails, subject, body });
    return this.emails;
  }
}

export default SendEmailService;
