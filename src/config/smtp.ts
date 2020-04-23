export default {
  service: process.env.SERVERMAIL,
  auth: {
    user: process.env.FROMEMAIL,
    pass: process.env.PASSEMAIL,
  },
};
