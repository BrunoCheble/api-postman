interface IMailContact {
  name: string;
  email: string;
}
export default interface ISendEmailDTO {
  from?: IMailContact;
  to: string[] | string;
  subject: string;
  body: string;
  application?: string;
  created_by?: string;
}
