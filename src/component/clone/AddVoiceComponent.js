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
            const data = await createAudio(audioBlob, userId, tempVoice.description, tempVoice.title, tempVoice.language);

            // Update the voice with the received data and set status to 'ready'
            setVoices((prevVoices) =>
                prevVoices.map((voice) =>
                    voice === tempVoice ? { ...voice, ...data, status: 'processing' } : voice
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
                    <div className="add-icon-wrapper" style={{ userSelect: 'none' }}>
                        <img src={addIcon} alt="Add" className="add-icon" />
                    </div>
                </div>
            </div>
            {showForm && (
                <div className="modal-overlay">
                    <div style={{ width: '100%', maxWidth: '1500px', background: '#fff', borderRadius: '20px', boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.2)', userSelect: 'none' }}>
                        <div style={{ padding: '0', margin: '0', width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'end', height: '35px' }}>
                            <button className="modal-close-button" style={{ userSelect: 'none' }} onClick={() => setShowForm(false)}>
                                <img src={closeIcon} alt="Close" />
                            </button>
                        </div>
                        <div style={{ width: '100%', maxWidth: '1500px', padding: '0px 20px', paddingBottom: '20px' }}>
                            <div style={{ margin: '0', padding: '0', display: 'flex', flexDirection: 'row', height: '100%', width: '100%', gap: '20px' }}>
                                <div className="add-voice-form" style={{ width: '40%' }}>
                                    <h3>Add a new voice</h3>
                                    <div style={{ margin: '0', padding: '0', display: 'flex', flexDirection: 'row', height: '100%', width: '100%', gap: '20px' }}>
                                        <input
                                            type="text"
                                            name="title"
                                            placeholder="Title"
                                            value={newVoice.title}
                                            onChange={handleInputChange}
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
                                    <input
                                        type="text"
                                        name="description"
                                        placeholder="Description"
                                        value={newVoice.description}
                                        onChange={handleInputChange}
                                    />
                                    <div style={{ margin: '0', padding: '0', display: 'flex', flexDirection: 'row', height: '100%', width: '100%', gap: '20px', alignItems: 'center' }}>
                                        <input
                                            type="file"
                                            name="audio"
                                            accept="audio/*"
                                            onChange={handleFileChange}
                                            style={{
                                                height: '50px',
                                                margin: '0'
                                            }}
                                        />
                                        <button
                                            // className="record-button"
                                            style={{
                                                width: '100px',
                                                height: '50px',
                                                padding: '0',
                                                margin: '0'
                                            }}
                                            onClick={isRecording ? stopRecording : startRecording}
                                        >
                                            <FontAwesomeIcon icon={isRecording ? faStop : faMicrophone} />
                                            {/* {isRecording ? 'Stop Recording' : 'Record'} */}
                                        </button>
                                        <button
                                            // className="preview-button"
                                            onClick={handlePreviewPlayPause}
                                            disabled={!newVoice.audio}
                                            style={{
                                                padding: '0',
                                                margin: '0',
                                                backgroundColor: !newVoice.audio ? 'gray' : (isPreviewing ? '#ffc107' : 'black'),
                                                width: '100px',
                                                height: '50px',
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

                                                // padding: '10px 20px',
                                                fontSize: '16px',
                                                border: '2px solid transparent',
                                                cursor: newVoice.audio ? 'pointer' : 'not-allowed',
                                                backgroundColor: !newVoice.audio ? 'gray' : 'black',
                                                color: 'white',
                                                transition: 'background-color 0.3s',
                                                width: '100px',
                                                height: '50px',
                                            }}
                                        >
                                            Add
                                        </button>
                                    </div>
                                </div>
                                <div style={{ width: '60%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingLeft: '20px', paddingRight: '20px', paddingTop: '20px', paddingBottom: '5px', boxSizing: 'border-box', backgroundColor: '#f9f9f9', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                                    <h6 style={{ marginBottom: '16px', fontSize: '18px', color: '#333', textAlign: 'left' }}>
                                        Please record and read this paragraph below:
                                    </h6>
                                    <div style={{ width: '100%', padding: '0 20px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', lineHeight: '1.6', color: '#555', textAlign: 'justify' }}>
                                        {newVoice.language === "vi" ? (
                                            <p>
                                                Chiều nay, trên con phố quen thuộc, những cơn gió nhẹ thổi qua, mang theo hương thơm của hoa sữa đang nở rộ. Tiếng cười nói vang lên từ những quán cà phê ven đường, hòa quyện với tiếng xe cộ nhộn nhịp. Mặt trời dần lặn, để lại bầu trời một màu đỏ rực, như một bức tranh tuyệt đẹp. Khung cảnh này gợi nhớ đến những buổi chiều thanh bình của một thời đã qua, khi mọi thứ dường như diễn ra chậm rãi và đầy yên ả.
                                            </p>
                                        ) : (
                                            <p>
                                                This afternoon, on the familiar street, gentle breezes blew by, carrying the fragrance of blooming milkwood flowers. Laughter and chatter echoed from the roadside cafes, blending with the bustling sound of traffic. The sun gradually set, leaving the sky painted in a fiery red, like a magnificent painting. This scene evokes memories of peaceful afternoons from a time long past, when everything seemed to move slowly and serenely.
                                            </p>
                                        )}
                                    </div>
                                    <p style={{ marginTop: '10px', fontStyle: 'italic' }}>Notes: The audio should be at least 20 seconds.</p>
                                </div>

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
