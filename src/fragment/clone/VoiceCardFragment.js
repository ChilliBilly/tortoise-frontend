import React from 'react';

function VoiceCardFragment({ voice, onDelete }) {
    return (
        <div className="voice-card">
            <h3>{voice.title}</h3>
            <p>{voice.description}</p>
            <div className="voice-card-buttons">
                <button onClick={() => alert('Use button clicked!')}>Use</button>
                <button onClick={() => onDelete(voice)}>Delete</button>
            </div>
            {/* Add more UI elements for actions like play, use, delete, etc. */}
        </div>
    );
}

export default VoiceCardFragment;