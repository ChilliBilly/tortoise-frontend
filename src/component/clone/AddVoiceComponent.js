import React, { useState, useRef, useEffect } from 'react';
import './AddVoiceComponent.css';
import closeIcon from '../../resources/images/close-icon.png';
import addIcon from '../../resources/images/add-icon.png';
import VoiceCardFragment from '../../fragment/clone/VoiceCardFragment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faStop, faPlay, faPause } from '@fortawesome/free-solid-svg-icons';

function AddVoiceComponent() {
    const [voices, setVoices] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [newVoice, setNewVoice] = useState({
        title: '',
        description: '',
        audio: null,
    });
    const [isRecording, setIsRecording] = useState(false);
    const [isPreviewing, setIsPreviewing] = useState(false);
    const mediaRecorderRef = useRef(null);
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewVoice((prevVoice) => ({
            ...prevVoice,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        setNewVoice((prevVoice) => ({
            ...prevVoice,
            audio: e.target.files[0],
        }));
    };

    const handleAddVoice = () => {
        setVoices((prevVoices) => [...prevVoices, newVoice]);
        setNewVoice({ title: '', description: '', audio: null });
        setShowForm(false);
    };

    const handleDeleteVoice = (voiceToDelete) => {
        setVoices((prevVoices) =>
            prevVoices.filter((voice) => voice !== voiceToDelete)
        );
    };

    const handlePlayPause = (audioFile) => {
        if (audioRef.current) {
            if (audioFile !== audioRef.current.src) {
                audioRef.current.src = URL.createObjectURL(audioFile);
                audioRef.current.load();
            }
            if (isPlaying) {
                audioRef.current.pause();
                setIsPlaying(false);
            } else {
                audioRef.current.play();
                setIsPlaying(true);
            }
        }
    };

    const startRecording = async () => {
        try {
            setIsRecording(true);
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorderRef.current = new MediaRecorder(stream);
            const chunks = [];

            mediaRecorderRef.current.ondataavailable = (e) => chunks.push(e.data);
            mediaRecorderRef.current.onstop = () => {
                const blob = new Blob(chunks, { type: 'audio/wav' });
                setNewVoice((prevVoice) => ({
                    ...prevVoice,
                    audio: blob,
                }));
                setIsRecording(false);
            };

            mediaRecorderRef.current.start();
        } catch (error) {
            console.error('Error starting recording:', error);
            setIsRecording(false);
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
            // Also stop and close the stream to ensure no recording indicator remains
            const stream = mediaRecorderRef.current.stream;
            stream.getTracks().forEach(track => track.stop());
        }
    };

    useEffect(() => {
        return () => {
            if (isRecording && mediaRecorderRef.current) {
                mediaRecorderRef.current.stop();
                const stream = mediaRecorderRef.current.stream;
                stream.getTracks().forEach(track => track.stop());
                setIsRecording(false);
            }
        };
    }, [isRecording]);

    const handlePreviewPlayPause = () => {
        if (audioRef.current) {
            if (newVoice.audio) {
                if (!audioRef.current.src) {
                    audioRef.current.src = URL.createObjectURL(newVoice.audio);
                    audioRef.current.load();
                }
                if (isPreviewing) {
                    audioRef.current.pause();
                    setIsPreviewing(false);
                } else {
                    audioRef.current.play();
                    setIsPreviewing(true);
                }
            }
        }
    };

    return (
        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', padding: '20px' }}>
            <div className="voice-grid">
                {voices.map((voice, index) => (
                    <VoiceCardFragment
                        key={index}
                        voice={voice}
                        onDelete={handleDeleteVoice}
                        onPlayPause={() => handlePlayPause(voice.audio)} // Pass the audio file to play/pause
                    />
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
                            <div className="record-button-wrapper">
                                <button
                                    className="record-button"
                                    onClick={isRecording ? stopRecording : startRecording}
                                >
                                    <FontAwesomeIcon icon={isRecording ? faStop : faMicrophone} />
                                    {isRecording ? 'Stop Recording' : 'Record'}
                                </button>
                            </div>
                            {newVoice.audio && (
                                <div className="preview-button-wrapper">
                                    <button
                                        className="preview-button"
                                        onClick={handlePreviewPlayPause}
                                    >
                                        <FontAwesomeIcon icon={isPreviewing ? faPause : faPlay} />
                                        {isPreviewing ? 'Pause Preview' : 'Play Preview'}
                                    </button>
                                </div>
                            )}
                            <button onClick={handleAddVoice}>Add Voice</button>
                        </div>
                    </div>
                </div>
            )}
            <audio ref={audioRef} />
        </div>
    );
}

export default AddVoiceComponent;
