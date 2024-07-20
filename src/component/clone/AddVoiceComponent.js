import React, { useState, useEffect } from 'react';
import './AddVoiceComponent.css';
import VoiceCardFragment from '../../fragment/clone/VoiceCardFragment';


function AddVoiceComponent() {
    const [voices, setVoices] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [newVoice, setNewVoice] = useState({
        title: '',
        description: '',
        audio: null
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewVoice((prevVoice) => ({
            ...prevVoice,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        setNewVoice((prevVoice) => ({
            ...prevVoice,
            audio: e.target.files[0]
        }));
    };

    const handleAddVoice = () => {
        setVoices((prevVoices) => [...prevVoices, newVoice]);
        setNewVoice({ title: '', description: '', audio: null });
        setShowForm(false);
    };

    const handleDeleteVoice = (voiceToDelete) => {
        setVoices((prevVoices) => prevVoices.filter(voice => voice !== voiceToDelete));
    };

    return (
        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', padding: '20px' }}>
            <div className="voice-grid">
                {voices.map((voice, index) => (
                    <VoiceCardFragment key={index} voice={voice} onDelete={handleDeleteVoice} />
                ))}
                <div className="add-voice-card" onClick={() => setShowForm(true)}>
                    <span>+</span>
                </div>
            </div>
            {showForm && (
                <div className="add-voice-form">
                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        value={newVoice.title}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="description"
                        placeholder="Description"
                        value={newVoice.description}
                        onChange={handleInputChange}
                    />
                    <input
                        type="file"
                        name="audio"
                        accept="audio/*"
                        onChange={handleFileChange}
                    />
                    <button onClick={handleAddVoice}>Add Voice</button>
                    <button onClick={() => setShowForm(false)}>Cancel</button>
                </div>
            )}
        </div>
    );
}

export default AddVoiceComponent;
