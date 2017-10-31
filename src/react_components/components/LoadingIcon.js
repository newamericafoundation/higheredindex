import React from 'react';

const LoadingIcon = () => (
  <div className="loading-icon-container">
    <div className="loading-icon">
      <div className="loading-icon__row">
        <div className="loading-icon__row__circle"></div>
        <div className="loading-icon__row__rect"></div>
      </div>
      <div className="loading-icon__row">
        <div className="loading-icon__row__rect"></div>
      </div>
      <div className="loading-icon__row">
        <div className="loading-icon__row__rect"></div>
      </div>
    </div>
  </div>
);

export default LoadingIcon;