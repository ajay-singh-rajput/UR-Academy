import React, { useRef, useState, useEffect } from 'react';
import VidCss from '../../../modulCss/VideoPlayer.module.css'
import {  RiFullscreenExitLine, RiFullscreenLine, RiPauseLine, RiPlayLine, RiSkipBackLine, RiSkipForwardLine,  RiVolumeMuteLine, RiVolumeUpLine } from '@remixicon/react';
import { useAppSelector } from '../../store/store';
import { useNavigate } from 'react-router-dom';

function VideoPlayer() {
  const {isAuth} = useAppSelector(state=>state.user);
  const navigate = useNavigate()
  const checkUserAuth = ()=>{
    !isAuth && navigate('/login')
  }
  useEffect(()=>{
    checkUserAuth();
  }, [isAuth])
    const containerRef = useRef<HTMLDivElement>(null);
    const mainVideoRef = useRef<HTMLVideoElement>(null);
    const blurVidRef = useRef<HTMLVideoElement>(null);
    const progressBarRef = useRef<HTMLDivElement>(null);
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [duration, setDuration] = useState<number>(0);
    const [volume, setVolume] = useState<number>(0.5);
    const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
    const [isPlay, setIsPlay] = useState(false)
    const [isMuted, setIsMuted] = useState(true)
    const [showControls, setShowControls] = useState(true)

    const formatTime = (time: number): string => {
        let seconds: number | string = Math.floor(time % 60),
            minutes: number | string = Math.floor(time / 60) % 60,
            hours: number | string = Math.floor(time / 3600);

        seconds = seconds < 10 ? `0${seconds}` : seconds;
        minutes = minutes < 10 ? `0${minutes}` : minutes;
        hours = hours < 10 ? `0${hours}` : hours;

        if (hours === 0) {
            return `${minutes}:${seconds}`;
        }
        return `${hours}:${minutes}:${seconds}`;
    };

    useEffect(() => {

        

        const container = containerRef.current;
        const mainVideo = mainVideoRef.current;
        const blurVid = blurVidRef.current;
        const progressBar = progressBarRef.current;

        let timer: ReturnType<typeof setTimeout>;

        const hideControls = () => {
            if (mainVideo && mainVideo.paused) return;
            timer = setTimeout(() => {
                // if (container) container.classList.remove("showControls");
                setShowControls(false)
            }, 3000);
        };
        hideControls();
        if (blurVid) blurVid.volume = 0;
        if (container) container.addEventListener("mousemove", () => {
            if (container) {
                // container.classList.add("show-controls");
                setShowControls(true)
                clearTimeout(timer);
                hideControls();
            }
        });

        const onTimeUpdate = () => {
            if (mainVideo) {
                setCurrentTime(mainVideo.currentTime);
                const percent = (mainVideo.currentTime / mainVideo.duration) * 100;
                if (progressBar) progressBar.style.width = `${percent}%`;
            }
        };

        if (mainVideo) mainVideo.addEventListener("timeupdate", onTimeUpdate);

        if (mainVideo) mainVideo.addEventListener("loadeddata", () => {
            if (mainVideo) setDuration(mainVideo.duration);
        });

        return () => {
            if (mainVideo) mainVideo.removeEventListener("timeupdate", onTimeUpdate);
            clearTimeout(timer);
        };
    }, []);

    const onTimelineClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const timelineWidth = e.currentTarget.clientWidth;
        if (mainVideoRef.current) mainVideoRef.current.currentTime = (e.nativeEvent.offsetX / timelineWidth) * (mainVideoRef.current.duration || 0);
        if (blurVidRef.current) blurVidRef.current.currentTime = (e.nativeEvent.offsetX / timelineWidth) * (mainVideoRef.current?.duration || 0);
    };

    const onVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseFloat(e.target.value);
        if (mainVideoRef.current) mainVideoRef.current.volume = newVolume;
        setVolume(newVolume);
    };

    const muteVideo = ()=>{
        setIsMuted(!isMuted);
        if (isMuted) {
            if (mainVideoRef.current) mainVideoRef.current.volume = 0;
            setVolume(0) 
        } else {
            setVolume(1);
            if (mainVideoRef.current) mainVideoRef.current.volume = 1;
            
        }
    }

    const onPlayPauseClick = () => {
        const mainVideo = mainVideoRef.current;
        if (mainVideo) {
            if (mainVideo.paused) {
                mainVideo.play();
                setIsPlay(true)
            } else {
                setIsPlay(false)
                mainVideo.pause();
            }
        }
    };

    const onSkipBackwardClick = () => {
        if (mainVideoRef.current) mainVideoRef.current.currentTime -= 5;
        if (blurVidRef.current) blurVidRef.current.currentTime -= 5;
    };

    const onSkipForwardClick = () => {
        if (mainVideoRef.current) mainVideoRef.current.currentTime += 5;
        if (blurVidRef.current) blurVidRef.current.currentTime += 5;
    };

    const onFullscreenClick = () => {
        const container = containerRef.current;
        setIsFullscreen(!isFullscreen);
        if (container) {
            if (!isFullscreen) {
                container.requestFullscreen();
            } else {
                document.exitFullscreen();
            }
        }
    };

    return (
        <div  ref={containerRef} className={`${VidCss.container} ${showControls && VidCss.showControls} ${isFullscreen ? VidCss.fullscreen : ""} w-full aspect-video m-auto`}>
    <div className={VidCss.wrapper}>
        <div className={VidCss.videoTimeline} onClick={onTimelineClick}>
            <div className={VidCss.progressArea}>
                <span>00:00</span>
                <div ref={progressBarRef} className={VidCss.progressBar}></div>
            </div>
        </div>
        <ul className={VidCss.videoControls}>
            <li className={VidCss.options + " " + VidCss.left}>
                <button className={VidCss.volume} onClick={muteVideo}><i className={`${VidCss.makeActive}`}>{!isMuted ? <RiVolumeMuteLine/>:<RiVolumeUpLine/>}</i></button>
                <input type="range" min="0" max="1" step="any" value={volume} onChange={onVolumeChange} />
                <div className={VidCss.videoTimer}>
                    <p className={VidCss.currentTime}>{formatTime(currentTime)}</p>
                    <p className={VidCss.separator}> / </p>
                    <p className={VidCss.videoDuration}>{formatTime(duration)}</p>
                </div>
            </li>
            <li className={VidCss.options + " " + VidCss.center}>
                <button className={VidCss.skipBackward} onClick={onSkipBackwardClick}><i className={`${VidCss.makeActive}`}><RiSkipBackLine/></i></button>
                <button className={VidCss.playPause} onClick={onPlayPauseClick}><i className={`${VidCss.makeActive}`}>{!isPlay ? <RiPlayLine/> :<RiPauseLine/>}</i></button>
                <button className={VidCss.skipForward} onClick={onSkipForwardClick}><i className={`${VidCss.makeActive}`}><RiSkipForwardLine/></i></button>
            </li>
            <li className={VidCss.options + " " + VidCss.right}>
                {/* <div className={VidCss.playbackContent}>
                    <button className={VidCss.playbackSpeed}><RiSlowDownLine/></button>
                    <ul className={VidCss.speedOptions}>
                        <li data-speed="2">2x</li>
                        <li data-speed="1.5">1.5x</li>
                        <li data-speed="1" className={VidCss.active}>Normal</li>
                        <li data-speed="0.75">0.75x</li>
                        <li data-speed="0.5">0.5x</li>
                    </ul>
                </div> */}
                <button className={VidCss.fullscreen} onClick={onFullscreenClick}><i className={`${VidCss.makeActive}`}>{isFullscreen? <RiFullscreenExitLine/>:<RiFullscreenLine/>}</i></button>
            </li>
        </ul>
    </div>
    <video  ref={mainVideoRef}  src="https://vaibhav1663.github.io/Youtube-Ambient-Mode/demo-video.mp4" poster="https://vaibhav1663.github.io/Youtube-Ambient-Mode/poster.jpg"></video>
</div>

    );
}

export default VideoPlayer;
