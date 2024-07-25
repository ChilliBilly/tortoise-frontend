import React, { useState, useRef, useEffect } from 'react';
import { faUndoAlt, faRedoAlt, faAngleDown, faDownload, faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import audioFile from '../../resources/audios/voice-4-long.wav';

function SoundDisplayTabFragment() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const audioRef = useRef(null);
    const intervalRef = useRef(null);
    const progressBarRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);

    const handlePlayPause = () => {
        if (isPlaying) {
            audioRef.current.pause();
            clearInterval(intervalRef.current);
        } else {
            audioRef.current.play();
            intervalRef.current = setInterval(() => {
                setCurrentTime(audioRef.current.currentTime);
            }, 10); // Adjust the interval as needed (100ms for smoother updates)
        }
        setIsPlaying(!isPlaying);
    };

    const handleTimeUpdate = () => {
        if (!isDragging) {
            setCurrentTime(audioRef.current.currentTime);
        }
    };

    const handleLoadedMetadata = () => {
        setDuration(audioRef.current.duration);
    };

    const handleSeek = (clientX) => {
        const seekBar = progressBarRef.current.getBoundingClientRect();
        const seekTime = ((clientX - seekBar.left) / seekBar.width) * duration;
        if (!isNaN(seekTime) && seekTime >= 0 && seekTime <= duration) {
            audioRef.current.currentTime = seekTime;
            setCurrentTime(seekTime);
        }
    };

    const handleAudioEnd = () => {
        setIsPlaying(false);
        setCurrentTime(0);
    };

    const handleMouseDown = (e) => {
        setIsDragging(true);
        handleSeek(e.clientX);
    };

    const handleMouseMove = (e) => {
        if (isDragging) {
            handleSeek(e.clientX);
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        if (isPlaying) {
            audioRef.current.play();
        }
    };

    const handleSkip = (seconds) => {
        let newTime = audioRef.current.currentTime + seconds;
        if (newTime < 0) {
            newTime = 0;
        } else if (newTime > duration) {
            newTime = duration;
        }
        audioRef.current.currentTime = newTime;
        setCurrentTime(newTime);
    };

    useEffect(() => {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging]);

    return (
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <div style={{ width: '80px', height: '80px', backgroundColor: '#444444', borderRadius: '80px', cursor: 'pointer', position: 'absolute', top: 'calc(100% - 50% - 40px)', left: '30px' }}>
                <div style={{ width: 0, height: 0, borderLeft: '20px solid transparent', borderRight: '20px solid transparent', borderBottom: '34.64px solid white', top: '21.68px', left: '24px', position: 'absolute', transform: 'rotate(90deg)' }}>
                </div>
            </div>
            <p style={{ fontWeight: 'bold', margin: '0px', padding: '0px', position: 'absolute', top: 'calc(100% - 50% - 40px)', left: '150px' }}>premade/Alice, 6/23/24, 01:18</p>
            <div style={{ display: 'flex', width: 'calc(100% - 150px - 30px)', justifyContent: 'space-between', position: 'absolute', top: 'calc(100% - 50% - 40px + 55px)', left: '150px', alignItems: 'center' }}>
                <FontAwesomeIcon icon={faUndoAlt} onClick={() => handleSkip(-5)} />
                <FontAwesomeIcon icon={faRedoAlt} onClick={() => handleSkip(5)} />
                <div style={{ width: 'calc(100% - 250px)', height: '22px', position: 'relative', display: 'flex', alignItems: 'center' }}>
                    <div style={{ margin: '0', padding: '0', width: '100%', backgroundColor: '#eeeeee', height: '14px', borderRadius: '14px', position: 'relative' }} ref={progressBarRef} onMouseDown={handleMouseDown}></div>
                    <div style={{ margin: '0', padding: '0', width: '8px', height: '22px', backgroundColor: '#555555', borderRadius: '8px', position: 'absolute', top: '0px' }}></div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                    <p style={{ margin: '0', padding: '0' }}>{new Date(currentTime * 1000).toISOString().substr(11, 8)}</p>
                    <p style={{ margin: '0', padding: '0' }}>/</p>
                    <p style={{ margin: '0', padding: '0' }}>{new Date(duration * 1000).toISOString().substr(11, 8)}</p>
                </div>
                <FontAwesomeIcon icon={faDownload} />
                <FontAwesomeIcon icon={faAngleDown} />
            </div>
            <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} onClick={handlePlayPause} style={{ margin: '0', padding: '0', fontSize: '28px', width: '22px', position: 'absolute', top: 'calc(100% - 50% - 40px + 55px)', left: '30px' }} />
            <audio
                ref={audioRef}
                src={audioFile}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={handleAudioEnd}
            />
        </div>
    )
}

export default SoundDisplayTabFragment;
