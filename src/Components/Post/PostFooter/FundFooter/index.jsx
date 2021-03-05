import React, { useEffect, useState } from 'react';

import PropTypes from 'prop-types';

import DueDate from 'Assets/icons/DueDate';
import HeartImg from 'Assets/images/fundHeart-bg-removed.png';

import moment from 'moment';

const calcDueDate = (createDate) => {
  const dueDate = moment(createDate).add(7, 'days');
  const dday = moment.duration(dueDate.diff(moment()));
  return `${dday.days()}:${dday.hours()}:${dday.minutes()}:${dday.seconds()} `;
};

function FundFooter(props) {
  const { createdAt } = props;
  const [dueDate, setDueDate] = useState(calcDueDate(createdAt));
  useEffect(() => {
    const interval = setInterval(() => {
      setDueDate(calcDueDate(createdAt));
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [createdAt]);
  return (
    <>
      <div className="post__footer__tab">
        <div className="post__footer__tab__left">
          <span className="mr-1 dueDateIcon">
            <DueDate />
          </span>
          <span>{dueDate}</span>
        </div>
        <div className="post__footer__tab__right">
          <span>
            <img className="fundHeart" src={HeartImg} alt="fund" />
          </span>
          <span>354</span>
        </div>
      </div>
      <div className="post__footer__progress">
        <hr className="post__footer__progress__bar" />
      </div>
    </>
  );
}

FundFooter.propTypes = {
  createdAt: PropTypes.string,
};

FundFooter.defaultProps = {
  createdAt: '',
};

export default FundFooter;
