import React, { useState, useRef } from 'react';
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

    return (
        <div className="voice-card">
            <h3>{voice.title}</h3>
            <p>{voice.description}</p>
            <div className="voice-card-buttons">
                {audioBlob ? (
                    <>
                        <button className="play-button" onClick={handlePlayPause}>
                            <FontAwesomeIcon icon={faPlay} />
                            {audioRef.current && !audioRef.current.paused ? 'Pause' : 'Play'}
                        </button>
                        <audio ref={audioRef} src={URL.createObjectURL(audioBlob)} />
                    </>
                ) : null}
                <button className="delete-button" onClick={() => onDelete(voice)}>
                    <FontAwesomeIcon icon={faTrash} /> Delete
                </button>
            </div>
        </div>
    );
}

export default VoiceCardFragment;
