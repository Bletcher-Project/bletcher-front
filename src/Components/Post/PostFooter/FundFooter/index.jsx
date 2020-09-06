import React from 'react';

import FundHeart from 'Components/Post/PostButton/FundHeart';
import DueDate from 'Assets/icons/DueDate';

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
          <span className="mr-1">
            <DueDate />
          </span>
          <span>{calcDueDate(createdAt)}</span>
        </div>
        <div className="post__footer__tab__right">
          <span>
            <FundHeart />
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
