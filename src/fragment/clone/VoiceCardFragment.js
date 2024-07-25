import React from 'react';
import './VoiceCardFragment.css';
import audioIcon from '../../resources/images/audio-icon.png'; 
import deleteIcon from '../../resources/images/delete-icon.png'; 

function VoiceCardFragment({ voice, onDelete }) {
    return (
        <div className="voice-card">
            <h3>{voice.title}</h3>
            <p>{voice.description}</p>
            <div className="voice-card-buttons">
                <button className="use-button" onClick={() => alert('Use button clicked!')}>
                    <img src={audioIcon} alt="Use" /> Use
                </button>
                <button className="delete-button" onClick={() => onDelete(voice)}>
                    <img src={deleteIcon} alt="Delete" /> Delete
                </button>
            </div>
        </div>
    );
}

export default VoiceCardFragment;
