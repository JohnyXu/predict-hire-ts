import moment from 'moment';
import { formatDate } from '../../helper/date';

const vacancies = [
  {
    _id: '5fc09f9b8f32c726b8fc679a',
    title: 'Front end developer',
    description: 'Develop web ui page',
    expiredAt: formatDate(moment().add(7, 'days')),
    userId: '5e5df7f450571fb3aecdcf22',
    companyId: '5e5df7fc6953acd3dc50fe8f',
  },
  {
    _id: '5fc0a7b4db40982a12b1e3d7',
    title: 'Full stack engineer',
    description: 'Develop api and web ui page',
    expiredAt: formatDate(moment().add(7, 'days')),
    userId: '5e5df7f450571fb3aecdcf22',
    companyId: '5e5df7fc6953acd3dc50fe8f',
  },
];

export default vacancies;
