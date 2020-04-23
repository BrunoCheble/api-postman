export default {
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // use SSL
  auth: {
    user: process.env.FROMEMAIL,
    pass: process.env.PASSEMAIL,
  },
};
