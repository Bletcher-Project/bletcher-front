import React from 'react';

import FavoriteButton from 'Assets/icons/FavoriteButton';
import MixButton from 'Assets/icons/MixButton';
import ShareButton from 'Assets/icons/ShareButton';
import FundHeart from 'Assets/icons/FundHeart';

const buttonClickHandler = async (clickItem) => {
  if (clickItem === 'favorite') {
    // update user's favorite in database
  } else if (clickItem === 'mix') {
    // route to MixPage
  } else if (clickItem === 'fundHeart') {
    // update post's fundCnt in database
  } else if (clickItem === 'share') {
    // share funding post
  }
};

const fundingHover = (isFundHeart) => (
  <>
    <FundHeart
      isClicked={isFundHeart}
      fill
      onClick={(e) => {
        e.stopPropagation();
        buttonClickHandler('fundHeart');
      }}
    />
    <ShareButton
      onClick={(e) => {
        e.stopPropagation();
        buttonClickHandler('share');
      }}
    />
  </>
);

const userShareHover = () => (
  <>
    <ShareButton
      onClick={(e) => {
        e.stopPropagation();
        buttonClickHandler('share');
      }}
    />
  </>
);

const userMixHover = () => (
  <>
    <MixButton
      onClick={(e) => {
        e.stopPropagation();
        buttonClickHandler('mix');
      }}
    />
  </>
);

const defaultHover = (isFavorite) => (
  <>
    <FavoriteButton
      liked={isFavorite}
      onClick={(e) => {
        e.stopPropagation();
        buttonClickHandler('favorite');
      }}
    />
    <MixButton
      onClick={(e) => {
        e.stopPropagation();
        buttonClickHandler('mix');
      }}
    />
  </>
);

export default (target, param) => {
  if (target === 'funding') return fundingHover(param);
  if (target === 'user__we') return userShareHover();
  if (target === 'user__me') return userMixHover();
  return defaultHover(param);
};
