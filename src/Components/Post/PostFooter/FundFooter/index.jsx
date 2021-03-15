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
  const fundFlag = useSelector((state) => state.postReducer.fundState.fundFlag);
  const [timeLimit, setTimeLimit] = useState('');
  const [fundCount, setFundCount] = useState(0);

  const calcPercentage = () => {
    const maxHeart = 10;
    return `${(fundCount / maxHeart) * 100}%`;
  };

  const parseTimeLimit = useCallback((dueDate) => {
    let parsedLeftDate = '';
    if (dueDate) {
      const leftDate = moment.duration(moment(dueDate).diff(moment()));
      parsedLeftDate = `${leftDate.days()}일 ${leftDate.hours()}시간 ${leftDate.minutes()}분`;
    }
    return parsedLeftDate;
  }, []);

  const getBarStyle = () => {
    const calcedWidth = calcPercentage();
    if (progressRef.current) {
      if (calcedWidth === '0%') progressRef.current.style.opacity = '60%';
      else progressRef.current.style.opacity = 'unset';
    }
    return {
      width: calcedWidth,
    };
  };

  useEffect(() => {
    async function fetchFundData() {
      const dd = await getDueDate(postId);
      setTimeLimit(parseTimeLimit(dd));
    }
    fetchFundData();

    const interval = setInterval(() => {
      setTimeLimit(parseTimeLimit());
    }, 1000 * 60);
    return () => {
      clearInterval(interval);
    };
  }, [postId, parseTimeLimit]);

  useEffect(() => {
    async function fetchFundCount() {
      const fc = await getFundCount(postId, token);
      setFundCount(fc);
    }
    fetchFundCount();
  }, [fundFlag, postId, token]);

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
