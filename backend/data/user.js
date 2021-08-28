import bcrypt from 'bcryptjs';

const user = [
  {
    name: 'Muhammad Yasir Khan',
    email: 'iammuhammadyasirkhan@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Syed Ashar Ali',
    email: 'asharali@gmail.com',
    password: bcrypt.hashSync('123456', 10),
  },

  {
    name: 'Muhammad Wasi',
    email: 'muhammadwasi@gmail.com',
    password: bcrypt.hashSync('123456', 10),
  },
];

export default user;
