import loadingCss from './Loading.module.css';
import { useAppSelector } from '../store/store';

const Loading = () => {
  const {isLoading} = useAppSelector(state => state.loading)
  return (
    <div className={`${loadingCss.loadingDIv} ${isLoading ?'fixed':'hidden'}`}>
      <div className={`${loadingCss.pencil} ${isLoading ? 'relative':'hidden'}`}>

        <div className={`${loadingCss.pencilBallPoint} ${isLoading ? 'absolute':'hidden'}`}></div>

        <div className={`${loadingCss.pencilCap} ${isLoading ? 'absolute':'hidden'}`}></div>

        <div className={`${loadingCss.pencilCapBase} ${isLoading ? 'absolute':'hidden'}`}></div>

        <div className={`${loadingCss.pencilMiddle} ${isLoading ? 'absolute':'hidden'}`}></div>

        <div className={`${loadingCss.pencilEraser} ${isLoading ? 'absolute':'hidden'}`}></div>

      </div>

      <div className={`${loadingCss.line} ${isLoading ? 'relative':'hidden'}`}></div>

      <h2 className={`${isLoading ? 'relative':'hidden'}`}>Page Loading... Please Wait</h2>
    </div>
  );
};

export default Loading;
