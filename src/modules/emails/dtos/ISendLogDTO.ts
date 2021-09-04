interface IMailContact {
  name: string;
  email: string;
}
export default interface ISendLogDTO {
  from?: IMailContact;
  to: string[] | string;
  subject: string;
  body: string;
  application?: string;
  created_by?: string;
}
