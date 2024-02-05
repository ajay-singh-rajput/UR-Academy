import React from 'react';
import loadingCss from './Loading.module.css';

const Loading = () => {
  return (
    <>
      <div className={loadingCss.pencil}>

        <div className={loadingCss.pencilBallPoint}></div>

        <div className={loadingCss.pencilCap}></div>

        <div className={loadingCss.pencilCapBase}></div>

        <div className={loadingCss.pencilMiddle}></div>

        <div className={loadingCss.pencilEraser}></div>

      </div>

      <div className={loadingCss.line}></div>

      <h2>Page Loading... Please Wait</h2>
    </>
  );
};

export default Loading;
