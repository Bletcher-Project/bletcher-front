import React, { useEffect, useState, useRef } from 'react';

import PropTypes from 'prop-types';

import { useSelector, useDispatch } from 'react-redux';
import { getDueDate, getFundCount } from 'Redux/post';

import DueDate from 'Assets/icons/DueDate';
import HeartImg from 'Assets/images/fundHeart-bg-removed.png';

import parseTimeLimit from 'Utils/parseTimeLimit';

function FundFooter(props) {
  const progressRef = useRef();
  const dispatch = useDispatch();
  const { postId } = props;
  const fundFlag = useSelector((state) => state.postReducer.fundState.fundFlag);
  const [timeLimit, setTimeLimit] = useState('');
  const [fundCount, setFundCount] = useState(0);

  const calcPercentage = () => {
    const maxHeart = 10;
    if (fundCount >= maxHeart) return '100%';
    return `${(fundCount / maxHeart) * 100}%`;
  };

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
    const oneMinute = 60000;
    async function fetchDueDate() {
      const dd = await dispatch(getDueDate(postId));
      setTimeLimit(parseTimeLimit(dd));
    }
    fetchDueDate();

    const dueDateFetchInterval = setInterval(() => {
      fetchDueDate();
    }, oneMinute);

    return () => clearInterval(dueDateFetchInterval);
  }, [postId, dispatch]);

  useEffect(() => {
    async function fetchFundCount() {
      const fc = await dispatch(getFundCount(postId));
      setFundCount(fc);
    }
    fetchFundCount();
  }, [fundFlag, postId, dispatch]);

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
