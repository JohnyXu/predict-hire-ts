import { ROLE } from './../../constants/user.constant';
import bcrypt from 'bcrypt';

const salt = Number(process.env.SALT);
const markPwd = bcrypt.hashSync('mark', salt);
const bobPwd = bcrypt.hashSync('bob', salt);

const users = [
  {
    _id: '5e5df7f450571fb3aecdcf21',
    name: 'Bob Markle',
    username: 'bob',
    password: bobPwd,
    role: ROLE.User,
    companyId: '5e5df7fc6953acd3dc50fe8f',
  },
  {
    _id: '5e5df7f450571fb3aecdcf22',
    name: 'Mark Smith',
    username: 'mark',
    password: markPwd,
    role: ROLE.Admin,
    companyId: '5e5df7fc6953acd3dc50fe8f',
  },
];
export default users;
