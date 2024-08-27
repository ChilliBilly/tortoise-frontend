import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faTrash } from '@fortawesome/free-solid-svg-icons';
import './VoiceCardFragment.css';

function VoiceCardFragment({ voice, onDelete }) {
    const [audioBlob, setAudioBlob] = useState(voice.audio);
    const audioRef = useRef(null);

    const handlePlayPause = () => {
        if (audioRef.current) {
            if (audioRef.current.paused) {
                audioRef.current.play();
            } else {
                audioRef.current.pause();
            }
        }
    };

    // Cleanup URL when the component unmounts
    useEffect(() => {
        return () => {
            if (audioRef.current && audioRef.current.src) {
                URL.revokeObjectURL(audioRef.current.src);
            }
        };
    }, []);

    return (
        <div className="voice-card">
            <p>{voice.description}</p>
            <p className={`voice-status ${voice.status}`}>
                {voice.status}
            </p>
            <div className="voice-card-buttons">
                {/* {audioBlob && voice.status === 'ready' ? (
                    <>
                        <button className="play-button" onClick={handlePlayPause}>
                            <FontAwesomeIcon icon={faPlay} />
                            {audioRef.current && !audioRef.current.paused ? 'Pause' : 'Play'}
                        </button>
                        <audio ref={audioRef} src={URL.createObjectURL(audioBlob)} />
                    </>
                ) : null} */}
                {
                    voice.is_default != true ? (
                        <button className="delete-button" onClick={() => onDelete(voice)}>
                            <FontAwesomeIcon icon={faTrash} /> Delete
                        </button>
                    ) : null
                }
            </div>
        </div>
    );
}

export default VoiceCardFragment;
