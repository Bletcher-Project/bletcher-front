import React from 'react';

import DueDate from 'Assets/icons/DueDate';
import HeartImg from 'Assets/images/fundHeart-bg-removed.png';

import { dummyDueDate } from 'Dummies/dummyPost';

const calcDueDate = (createDate) => {
  const dueDate = Date.parse(dummyDueDate) - Date.parse(createDate);
  return new Date(dueDate).toTimeString().substring(0, 8);
};

function FundFooter(prop) {
  const { createdAt } = prop;
  return (
    <>
      <div className="post__footer__tab">
        <div className="post__footer__tab__left">
          <span className="mr-1 dueDateIcon">
            <DueDate />
          </span>
          <span>{calcDueDate(createdAt)}</span>
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

export default FundFooter;