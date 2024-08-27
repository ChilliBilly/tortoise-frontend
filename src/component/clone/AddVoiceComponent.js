import React, { useState, useRef, useEffect, useContext } from 'react';
import './AddVoiceComponent.css';
import closeIcon from '../../resources/images/close-icon.png';
import addIcon from '../../resources/images/add-icon.png';
import VoiceCardFragment from '../../fragment/clone/VoiceCardFragment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faStop, faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
import { createAudio } from '../../service/api'; // Replace with the actual path
import { getVoiceList, deleteVoice } from '../../service/DataService'; // Replace with the actual path
import { useError } from '../../context/ErrorContext';

import { UserContext } from '../../context/UserContext';

function AddVoiceComponent() {
    const { showError } = useError();
    const [isProcessing, setIsProcessing] = useState(false); // State to track if processing is happening
    const { userId } = useContext(UserContext);
    const [voices, setVoices] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [newVoice, setNewVoice] = useState({
        title: '',
        description: '',
        audio: null,
        status: 'processing',
        language: 'vi'
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

    const handleAddVoice = async () => {
        setIsProcessing(true);
        // Create a temporary card with "processing" status
        const tempVoice = { ...newVoice, status: 'processing' };
        setVoices((prevVoices) => [...prevVoices, tempVoice]);

        try {
            const audioBlob = new Blob([tempVoice.audio], { type: 'audio/mpeg' }); // Create a Blob or get from input
            const data = await createAudio(audioBlob, userId, tempVoice.title, tempVoice.description, tempVoice.language);

            // Update the voice with the received data and set status to 'ready'
            setVoices((prevVoices) =>
                prevVoices.map((voice) =>
                    voice === tempVoice ? { ...voice, ...data, status: 'ready' } : voice
                )
            );
        } catch (error) {
            showError("Failed to create audio: " + error);
            // Update the voice status to 'failed' on error
            setVoices((prevVoices) =>
                prevVoices.map((voice) =>
                    voice === tempVoice ? { ...voice, status: 'failed' } : voice
                )
            );
        } finally {
            // Reset form and hide modal
            setNewVoice({ title: '', description: '', audio: null });
            setShowForm(false);
        }
    };

    const handleDeleteVoice = async (voiceToDelete) => {
        try {
            await deleteVoice(userId, voiceToDelete.id);
            setVoices((prevVoices) =>
                prevVoices.filter((voice) => voice !== voiceToDelete)
            );
        } catch (error) {
            showError("Unable to delete voice: " + error);
        }
    };

    const handlePlayPause = (audioFile) => {
        if (audioRef.current) {
            if (audioRef.current.src) {
                URL.revokeObjectURL(audioRef.current.src);
                audioRef.current.src = '';
            }

            audioRef.current.src = URL.createObjectURL(audioFile);
            audioRef.current.load();

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
            showError("Error starting recording:: " + error);
            setIsRecording(false);
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
            const stream = mediaRecorderRef.current.stream;
            stream.getTracks().forEach(track => track.stop());
            mediaRecorderRef.current = null;
        }
    };

    useEffect(() => {
        const audioElement = audioRef.current;
        if (audioElement) {
            const handleAudioEnd = () => {
                setIsPlaying(false);
                setIsPreviewing(false);
            };

            audioElement.addEventListener('ended', handleAudioEnd);

            return () => {
                audioElement.removeEventListener('ended', handleAudioEnd);
            };
        }

        return () => {
            if (audioRef.current && audioRef.current.src) {
                URL.revokeObjectURL(audioRef.current.src);
            }
        };
    }, []);

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

    useEffect(() => {
        const fetchVoices = async () => {
            try {
                const { data } = await getVoiceList(userId);
                setVoices(data); // Update the state with the fetched voices
            } catch (error) {
                showError("Failed to fetch voices: " + error);
            }
        };

        fetchVoices();
    }, [userId]);

    const handlePreviewPlayPause = () => {
        if (audioRef.current && newVoice.audio) {
            if (audioRef.current.src) {
                URL.revokeObjectURL(audioRef.current.src);
                audioRef.current.src = '';
            }

            audioRef.current.src = URL.createObjectURL(newVoice.audio);
            audioRef.current.load();

            if (isPreviewing) {
                audioRef.current.pause();
                setIsPreviewing(false);
            } else {
                audioRef.current.play();
                setIsPreviewing(true);
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
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <input
                                    type="file"
                                    name="audio"
                                    accept="audio/*"
                                    onChange={handleFileChange}
                                />
                                <select
                                    name="language"
                                    value={newVoice.language}
                                    onChange={handleInputChange}
                                    className="language-select"
                                >
                                    <option value="vi">Vietnamese</option>
                                    <option value="en">English</option>
                                </select>
                            </div>
                            <div style={{ margin: '0', padding: '0', display: 'flex', flexDirection: 'row', gap: '20px' }}>
                                <button
                                    className="record-button"
                                    onClick={isRecording ? stopRecording : startRecording}
                                >
                                    <FontAwesomeIcon icon={isRecording ? faStop : faMicrophone} />
                                    {/* {isRecording ? 'Stop Recording' : 'Record'} */}
                                </button>
                                <button
                                    className="preview-button"
                                    onClick={handlePreviewPlayPause}
                                    disabled={!newVoice.audio}
                                    style={{
                                        backgroundColor: !newVoice.audio ? 'gray' : (isPreviewing ? '#ffc107' : 'black'), // Gray when disabled, yellow for pause, green for play
                                    }}
                                >
                                    <FontAwesomeIcon icon={isPreviewing ? faPause : faPlay} />
                                    {/* {isPreviewing ? 'Pause Preview' : 'Play Preview'} */}
                                </button>
                                <button
                                    onClick={handleAddVoice}
                                    disabled={!newVoice.audio}
                                    className={isProcessing ? 'animate-border' : ''}
                                    style={{
                                        padding: '10px 20px',
                                        fontSize: '16px',
                                        border: '2px solid transparent',
                                        cursor: newVoice.audio ? 'pointer' : 'not-allowed',
                                        backgroundColor: !newVoice.audio ? 'gray' : 'black',
                                        color: 'white',
                                        transition: 'background-color 0.3s',
                                    }}
                                >
                                    Add Voice
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <audio ref={audioRef} />
        </div>
    );
}

export default AddVoiceComponent;
