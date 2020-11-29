import bcrypt from 'bcrypt';
import config from '../../src/config';

const salt: number = Number(config.app.salt);
const markPwd = bcrypt.hashSync('mark', salt);
const bobPwd = bcrypt.hashSync('bob', salt);

const users = [
  {
    _id: '5e5df7f450571fb3aecdcf21',
    name: 'Bob Markle',
    username: 'bob',
    password: bobPwd,
    role: 'user',
    companyId: '5e5df7fc6953acd3dc50fe8f',
  },
  {
    _id: '5e5df7f450571fb3aecdcf22',
    name: 'Mark Smith',
    username: 'mark',
    password: markPwd,
    role: 'admin',
    companyId: '5e5df7fc6953acd3dc50fe8f',
  },
];
export default users;
