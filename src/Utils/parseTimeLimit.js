import moment from 'moment';

const parseTimeLimit = (dueDate) => {
  let parsedLeftDate = '';
  if (dueDate) {
    const leftDate = moment.duration(moment(dueDate).diff(moment()));
    parsedLeftDate = `${leftDate.days()}일 ${leftDate.hours()}시간 ${leftDate.minutes()}분`;
  }
  return parsedLeftDate;
};

export default parseTimeLimit;
