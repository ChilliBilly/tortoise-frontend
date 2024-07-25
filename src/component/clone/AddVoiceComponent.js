import React, { useState } from 'react';
import './AddVoiceComponent.css';
import closeIcon from '../../resources/images/close-icon.png'
import addIcon from '../../resources/images/add-icon.png'
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
                    <div className="add-icon-wrapper">
                        <img src={addIcon} alt="Add" className="add-icon" />
                    </div>
                </div>
            </div>
            {showForm && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button className="modal-close-button" onClick={() => setShowForm(false)}>
                            <img src={closeIcon} alt="Close" />
                        </button>
                        <div className="add-voice-form">
                            <h3>Add a new voice</h3>
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
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AddVoiceComponent;
