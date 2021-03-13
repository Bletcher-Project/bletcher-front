import React, { useEffect, useState, useCallback, useRef } from 'react';

import PropTypes from 'prop-types';

import { useSelector } from 'react-redux';
import { getDueDate, getFundCount } from 'Redux/post';

import DueDate from 'Assets/icons/DueDate';
import HeartImg from 'Assets/images/fundHeart-bg-removed.png';

import moment from 'moment';

function FundFooter(props) {
  const progressRef = useRef();
  const { postId } = props;
  const token = useSelector((state) => state.authReducer.token);
  const [timeLimit, setTimeLimit] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [fundCount, setFundCount] = useState(0);

  const calcPercentage = () => {
    const maxHeart = 10;
    return `${(fundCount / maxHeart) * 100}%`;
  };

  const parseTimeLimit = useCallback(() => {
    let parsedLeftDate = '';
    if (dueDate) {
      const leftDate = moment.duration(moment(dueDate).diff(moment()));
      parsedLeftDate = `${leftDate.days()}일 ${leftDate.hours()}시간 ${leftDate.minutes()}분`;
    }
    return parsedLeftDate;
  }, [dueDate]);

  const getBarStyle = () => {
    const calcedWidth = calcPercentage();
    if (calcedWidth === '0%' && progressRef.current)
      progressRef.current.style.opacity = '60%';

    return {
      width: calcedWidth,
    };
  };

  useEffect(() => {
    async function fetchFundData() {
      const dd = await getDueDate(postId, token);
      const fc = await getFundCount(postId, token);
      setDueDate(dd);
      setFundCount(fc);
      setTimeLimit(parseTimeLimit());
    }
    fetchFundData();

    const interval = setInterval(() => {
      setTimeLimit(parseTimeLimit());
    }, 1000 * 60);
    return () => {
      clearInterval(interval);
    };
  }, [postId, token, parseTimeLimit]);

  return (
    <>
      <div className="post__footer__tab">
        <div className="post__footer__tab__left">
          <span className="mr-1 dueDateIcon">
            <DueDate />
          </span>
          <span>{timeLimit}</span>
        </div>
        <div className="post__footer__tab__right">
          <span>
            <img className="fundHeart" src={HeartImg} alt="fund" />
          </span>
          <span>{fundCount}</span>
        </div>
      </div>
      <div className="post__footer__progress" ref={progressRef}>
        <hr className="post__footer__progress__bar" style={getBarStyle()} />
      </div>
    </>
  );
}

FundFooter.propTypes = {
  postId: PropTypes.number,
};

FundFooter.defaultProps = {
  postId: null,
};

export default FundFooter;
