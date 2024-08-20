import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ActionCreators } from 'redux-undo';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './InputChatboxTabFragment.css';
import image from '../../resources/images/images.png';
import audioFile from '../../resources/audios/voice-4-long.wav';
import { faUndoAlt, faRedoAlt, faAngleDown, faDownload, faPause, faPlay, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSpring, animated } from 'react-spring';
import { getLiveTabByUserId, getChatBoxSession, createTab, createTabGeneration, getTabGenerationUserAndTabAndGenerationId, updateTabName, deleteTab } from '../../service/DataService';
import { createNewTab, changeTab, selectGeneration, deleteExistingTab, initApp } from '../../redux/actions';
import { doFetch } from './InputHistoryTabFragment';

const ItemType = {
    TAB: 'tab',
};

function Tab({ item, index, moveTab, setSelectedTabId, selectedTabId, handleTabRightClick, isEditing, newTabName, handleTabNameChange, handleTabNameSave, handleTabDelete }) {
    const ref = useRef(null);
    const [{ isDragging }, drag] = useDrag({
        type: ItemType.TAB,
        item: { index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const [, drop] = useDrop({
        accept: ItemType.TAB,
        hover(draggedItem) {
            if (draggedItem.index !== index) {
                moveTab(draggedItem.index, index);
                draggedItem.index = index;
            }
        },
    });

    drag(drop(ref));

    const springProps = useSpring({
        opacity: isDragging ? 0.5 : 1,
        transform: isDragging ? 'scale(0.95)' : 'scale(1)',
        config: { tension: 300, friction: 20 },
    });

    return (
        <animated.div ref={ref} style={{ ...springProps, position: 'relative' }}>
            {isEditing === item.id ? (
                <input
                    type="text"
                    value={newTabName}
                    onChange={handleTabNameChange}
                    onBlur={() => handleTabNameSave(item.id)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleTabNameSave(item.id);
                        }
                    }}
                    autoFocus
                    style={{ fontSize: '10px', width: '200px' }}
                />
            ) : (
                <div style={{ margin: '0', padding: '0', gap: '10px', display: 'flex', flexDirection: 'row', alignItems: 'center', height: '100%' }}>
                    <p
                        style={{ color: item.id === selectedTabId ? '#367AFF' : '#757575', fontSize: '14px', margin: '0', padding: '0', cursor: 'pointer', userSelect: 'none' }}
                        onClick={() => {
                            setSelectedTabId(item.id);
                        }}
                        onContextMenu={(e) => handleTabRightClick(e, item.id, item.tab_name)}
                    >
                        {item.tab_name}
                    </p>
                    {selectedTabId === item.id && (
                        <p
                            style={{ color: '#AA4A44', fontSize: '14px', fontWeight: 'bold', margin: '0', padding: '0', cursor: 'pointer', userSelect: 'none', marginTop: '-5px' }}
                            onClick={() => handleTabDelete(item.id)}>
                            x
                        </p>
                    )}
                </div>
            )}
        </animated.div>
    );
}
// This will hold the reference to the function
const selectGenerationRef = { current: null };

export function doSelectGeneration(tab_id, tab_generation_id) {
    if (selectGenerationRef.current) {
        selectGenerationRef.current(tab_id, tab_generation_id);
    }
}

function InputChatboxTabFragment() {
    const dispatch = useDispatch();
    const tabData = useSelector((state) => state.tabs.present.tabData);
    const selectedTabId = useSelector((state) => state.tabs.present.selectedTabId);
    const chatBoxSessionsByTab = useSelector((state) => state.tabs.present.chatBoxSessionsByTab);
    const isEditing = useSelector((state) => state.tabs.present.isEditing);
    const newTabName = useSelector((state) => state.tabs.present.newTabName);

    // Define userId as 1
    const userId = 1;

    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const audioRef = useRef(null);
    const intervalRef = useRef(null);
    const progressBarRef = useRef(null);
    const tabContainerRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [isScrolling, setIsScrolling] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [charCount, setCharCount] = useState(0);
    const [isLimitReached, setIsLimitReached] = useState(false);
    const [isMiddleMouseDown, setIsMiddleMouseDown] = useState(false);
    const maxCharCount = 5000;

    useEffect(() => {
        fetchData();
    }, [dispatch]);

    const fetchData = async () => {
        let initialSessions = [{ text: '' }]; // Default value for sessions

        try {
            // Fetch the live tabs by user ID
            const tabs = await getLiveTabByUserId(userId);
            // Attempt to fetch the initial chat box session if there are tabs available
            if (tabs.data.length > 0) {
                try {
                    initialSessions = await getChatBoxSession(userId, tabs.data[0].id);
                    initialSessions = [{ text: initialSessions.data.text_entry_content }]
                } catch (sessionError) {
                    initialSessions = [{ text: '' }];
                }
            }
            dispatch(initApp(tabs, initialSessions));
        } catch (error) {
            console.error("Error fetching tabs:", error);
            dispatch(initApp([], [{ text: '' }])); // Use actual tabs if they were fetched
        }
    };

    const handleSelectGeneration = async (tab_id, tab_generation_id) => {
        try {
            const item = await getTabGenerationUserAndTabAndGenerationId(userId, tab_id, tab_generation_id);
            // Do something with the item, e.g., update state, dispatch an action, etc.
            const tabId = item.data.tab_id
            const sessions = [{ text: item.data.text_entry_content }]
            dispatch(selectGeneration(tabId, sessions));
        } catch (error) {
            console.error('Error fetching item:', error);
        }
    };

    useEffect(() => {
        selectGenerationRef.current = handleSelectGeneration;
    }, []);

    useEffect(() => {
        const currentSessions = Array.isArray(chatBoxSessionsByTab[selectedTabId]) ? chatBoxSessionsByTab[selectedTabId] : [];
        const initialCharCount = currentSessions.reduce((acc, session) => {
            return acc + (session.text ? session.text.length : 0);
        }, 0);
        setCharCount(initialCharCount);
    }, [selectedTabId, chatBoxSessionsByTab]);

    const handleGenerateOuput = async () => {
        try {
            await createTabGeneration({ user_id: userId, tab_id: selectedTabId, text_entry_content: chatBoxSessionsByTab[selectedTabId][0].text })
            doFetch();
        } catch (error) {
            console.error("Error creating tab generation:", error);
        }
    }

    const handleTextChange = (index, text) => {
        if (text.length <= maxCharCount) {
            dispatch({
                type: 'SET_CHAT_BOX_SESSIONS',
                payload: {
                    tabId: selectedTabId,
                    sessions: chatBoxSessionsByTab[selectedTabId].map((session, i) =>
                        i === index ? { ...session, text } : session
                    ),
                },
            });
            setCharCount(text.length);
            setIsLimitReached(false);
        } else if (!isLimitReached) {
            setIsLimitReached(true);
            setTimeout(() => setIsLimitReached(false), 500);
        }
    };

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

    const handleNewTab = async () => {
        try {
            const newTabId = tabData.length + 1;
            const tab_name = `Tab ${newTabId}`;
            const response = await createTab({ user_id: userId, tab_name: tab_name });
            const newTab = { id: response.id, tab_name: tab_name };
            const initialSessions = [{ text: '' }];
            // Dispatch the action to create a new tab
            dispatch(createNewTab(newTab, response.id, initialSessions));
        } catch (error) {
            console.error("Error creating tab:", error);
        }
    };

    const handleTabChange = async (tabId) => {
        try {
            // Check if sessions already exist in chatBoxSessionsByTab
            let sessions = chatBoxSessionsByTab[tabId];

            if (!sessions) {
                try {
                    sessions = await getChatBoxSession(userId, tabId);
                    sessions = [{ text: sessions.data.text_entry_content }]
                } catch (sessionError) {
                    console.error("Error fetching chat box session:", sessionError);
                    // Set default value for initialSessions if an error occurs
                    sessions = [{ text: '' }];
                }
            }
            dispatch(changeTab(tabId, sessions));
        } catch (error) {
            console.error("Error switching tab:", error);
        }
    };

    const handleTabRightClick = (e, id, name) => {
        e.preventDefault();
        dispatch({ type: 'SET_IS_EDITING', payload: id });
        dispatch({ type: 'SET_NEW_TAB_NAME', payload: name });
    };

    const handleTabNameChange = (e) => {
        dispatch({ type: 'SET_NEW_TAB_NAME', payload: e.target.value });
    };

    const handleTabNameSave = async (id) => {
        try {
            await updateTabName(userId, id, newTabName);
            dispatch({ type: 'UPDATE_TAB_NAME', payload: { id, newTabName } });
            dispatch({ type: 'SET_IS_EDITING', payload: null });
        } catch (error) {
            console.error("An error is occured: ", error);
        }
    };

    const handleTabDelete = async (id) => {
        try {
            await deleteTab(userId, id);
            dispatch(deleteExistingTab(id));
        } catch (error) {
            console.error("An error is occured when trying to delete the tab: ", error);
        }
    }

    const moveTab = (fromIndex, toIndex) => {
        dispatch({ type: 'MOVE_TAB', payload: { fromIndex, toIndex } });
    };

    useEffect(() => {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('mousedown', (e) => {
            if (e.button === 1) {
                setIsMiddleMouseDown(true);
            }
        });
        document.addEventListener('mouseup', (e) => {
            if (e.button === 1) {
                setIsMiddleMouseDown(false);
            }
        });
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('mousedown', (e) => {
                if (e.button === 1) {
                    setIsMiddleMouseDown(true);
                }
            });
            document.removeEventListener('mouseup', (e) => {
                if (e.button === 1) {
                    setIsMiddleMouseDown(false);
                }
            });
        };
    }, [isDragging]);

    // Add keyboard event listeners for undo and redo
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.ctrlKey && event.key === 'z') {
                dispatch(ActionCreators.undo());
            }
            if (event.ctrlKey && (event.key === 'y' || event.key === 'Z')) {
                dispatch(ActionCreators.redo());
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [dispatch]);

    const startScroll = (e) => {
        if (e.button === 1) { // Middle mouse button
            setIsScrolling(true);
            setStartX(e.pageX - tabContainerRef.current.offsetLeft);
            setScrollLeft(tabContainerRef.current.scrollLeft);
        }
    };

    const stopScroll = () => {
        setIsScrolling(false);
    };

    const scroll = (e) => {
        if (!isScrolling) return;
        e.preventDefault();
        const x = e.pageX - tabContainerRef.current.offsetLeft;
        const walk = (x - startX) * 2; // Scroll speed
        tabContainerRef.current.scrollLeft = scrollLeft - walk;
    };

    const scrollLeftButton = () => {
        if (tabContainerRef.current) {
            tabContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
        }
    };

    const scrollRightButton = () => {
        if (tabContainerRef.current) {
            tabContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
        }
    };

    useEffect(() => {
        const tabContainer = tabContainerRef.current;

        if (isScrolling && tabContainer) {
            tabContainer.addEventListener('mousemove', scroll);
            tabContainer.addEventListener('mouseup', stopScroll);
            tabContainer.addEventListener('mouseleave', stopScroll);
        }

        return () => {
            if (tabContainer) {
                tabContainer.removeEventListener('mousemove', scroll);
                tabContainer.removeEventListener('mouseup', stopScroll);
                tabContainer.removeEventListener('mouseleave', stopScroll);
            }
        };
    }, [isScrolling]);

    // if (!tabData.length) return <div>Loading...</div>;

    const currentSessions = chatBoxSessionsByTab[selectedTabId] || [];

    return (
        <DndProvider backend={HTML5Backend}>
            <div style={{ height: '100%', position: 'relative', width: '100%', display: 'flex', flexDirection: 'column', padding: '0', margin: '0', userSelect: 'none' }}>
                <div style={{ margin: '0', padding: '0', position: 'relative', width: '100%', height: '50px', display: 'flex', flexDirection: 'row', overflow: 'hidden', alignItems: 'center' }}>
                    <div
                        ref={tabContainerRef}
                        onMouseDown={startScroll}
                        style={{
                            overflowX: 'hidden', // Enable horizontal scrolling
                            overflowY: 'hidden',
                            whiteSpace: 'nowrap',
                            padding: '5px 0px',
                            marginLeft: '60px',
                            marginRight: '100px',
                            display: 'inline-flex',
                            flexDirection: 'row',
                            gap: '40px',
                            justifyContent: 'left',
                            height: '50px',
                            maxWidth: 'calc(100% - 160px)',
                            cursor: isMiddleMouseDown ? 'grab' : 'pointer',
                            alignItems: 'center'
                        }}
                    >
                        {tabData.length > 0 && tabData.map((item, index) => (
                            <Tab
                                key={item.id}
                                item={item}
                                index={index}
                                moveTab={moveTab}
                                setSelectedTabId={handleTabChange}
                                selectedTabId={selectedTabId}
                                handleTabRightClick={handleTabRightClick}
                                isEditing={isEditing}
                                newTabName={newTabName}
                                handleTabNameChange={handleTabNameChange}
                                handleTabNameSave={handleTabNameSave}
                                handleTabDelete={handleTabDelete}
                            />
                        ))}
                    </div>
                    <div style={{ margin: '0', padding: '0', width: '30px', position: 'absolute', right: '40px', display: 'flex', flexDirection: 'row', gap: '10px', padding: '5px 0px', justifyContent: 'center', alignItems: 'center' }}>
                        <p
                            style={{ color: '#757575', fontSize: '14px', margin: '0', fontWeight: 'bold', padding: '0', cursor: 'pointer', userSelect: 'none' }}
                            onClick={handleNewTab}
                        >
                            +
                        </p>
                        <FontAwesomeIcon icon={faAngleLeft} onClick={scrollLeftButton} style={{ cursor: 'pointer', width: '8px' }} />
                        <FontAwesomeIcon icon={faAngleRight} onClick={scrollRightButton} style={{ cursor: 'pointer', width: '8px' }} />
                    </div>
                </div>
                <div style={{ width: '100%', height: '100%', margin: '0', padding: '0', paddingTop: '10px', paddingRight: '30px' }}>
                    {Array.isArray(currentSessions) && currentSessions.length > 0 ? (
                        currentSessions.map((item, index) => (
                            <textarea
                                key={index}
                                placeholder='Enter your text here...'
                                className="minimalist-scrollbar"
                                style={{
                                    margin: '0',
                                    padding: '0',
                                    width: '100%',
                                    height: 'calc(100% - 140px)',
                                    paddingLeft: '60px',
                                    borderWidth: '0',
                                    fontSize: '20px',
                                    outline: 'none',
                                    paddingBottom: '60px',
                                    backgroundColor: 'white', // Ensure background is white to prevent overlap
                                    zIndex: 1,
                                    userSelect: 'none' // Ensure it's on top of other elements
                                }}
                                value={item.text} // Use value to ensure textarea reflects state changes
                                onChange={(e) => handleTextChange(index, e.target.value)}
                            />
                        ))
                    ) : (
                        <p>No sessions available</p> // You can replace this with any fallback UI you'd like
                    )}
                </div>

                <div style={{ padding: '0', margin: '0', paddingLeft: '60px', paddingRight: '30px', display: 'flex', flexDirection: 'column', width: '100%', position: 'absolute', bottom: '0', height: '150px', justifyContent: 'end', gap: '20px', backdropFilter: 'blur(10px)', backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
                    <div style={{ width: '100%', padding: '0', margin: '0', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <div style={{ padding: '0', margin: '0', display: 'flex', flexDirection: 'row', gap: '20px', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                            <img src={image} style={{ width: '20px', height: '20px' }} alt="Description" />
                            <p style={{ lineHeight: '20px', margin: '0px', fontWeight: 'bold' }}>HN - Ngọc Huyền</p>
                        </div>
                        <div style={{ padding: '0', margin: '0', display: 'flex', flexDirection: 'row', gap: '50px', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                            <div style={{ padding: '0', margin: '0', display: 'flex', flexDirection: 'row', gap: '0px', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                                <p className={isLimitReached ? 'char-count-limit' : ''} style={{ color: '#757575', fontSize: '14px', margin: '0', padding: '0' }}>{charCount}</p>
                                <p style={{ color: '#757575', fontSize: '14px', margin: '0', padding: '0' }}>/{maxCharCount}</p>
                            </div>
                            <p style={{ color: '#367AFF', fontSize: '14px', margin: '0', padding: '0', cursor: 'pointer' }} onClick={handleGenerateOuput}>Generate Speech</p>
                        </div>
                    </div>
                    <div style={{ width: '100%', padding: '0', margin: '0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', justifyContent: 'end', height: '50px', marginBottom: '30px' }}>
                        <div style={{ width: '100%', padding: '0', margin: '0', display: 'flex', flexDirection: 'row', gap: '20px', alignItems: "end" }}>
                            <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} onClick={handlePlayPause} style={{ margin: '0', padding: '0', fontSize: '28px', width: '22px' }}></FontAwesomeIcon>
                            <div style={{ width: '100%', padding: '0', margin: '0', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                <p style={{ color: '#757575', fontSize: '14px', margin: '0', padding: '0', fontWeight: 'bold' }}>premade/Alice, 6/23/24, 01:18</p>
                                <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', position: 'r' }}>
                                    <FontAwesomeIcon icon={faUndoAlt} onClick={() => handleSkip(-5)} style={{ cursor: 'pointer' }}></FontAwesomeIcon>
                                    <FontAwesomeIcon icon={faRedoAlt} onClick={() => handleSkip(5)} style={{ cursor: 'pointer' }}></FontAwesomeIcon>
                                    <div
                                        ref={progressBarRef}
                                        style={{
                                            margin: '0',
                                            padding: '0',
                                            width: 'calc(100% - 250px)',
                                            backgroundColor: '#eeeeee',
                                            height: '9px',
                                            borderRadius: '9px',
                                            position: 'relative',
                                            cursor: 'pointer'
                                        }}
                                        onMouseDown={handleMouseDown}
                                    >
                                        <div
                                            style={{
                                                position: 'absolute',
                                                top: '50%',
                                                left: '0',
                                                transform: 'translateY(-50%)',
                                                height: '9px',
                                                borderRadius: '9px',
                                                width: `${(currentTime / duration) * 100}%`,
                                                backgroundColor: '#367AFF',
                                                zIndex: 1
                                            }}
                                        ></div>
                                        <div
                                            style={{
                                                position: 'absolute',
                                                top: '50%',
                                                left: `${(currentTime / duration) * 100}%`,
                                                transform: 'translate(-50%, -50%)',
                                                width: '5px',
                                                height: '15px',
                                                backgroundColor: '#555555',
                                                borderRadius: '5px',
                                                cursor: 'pointer',
                                                zIndex: 2
                                            }}
                                        ></div>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                                        <p style={{ margin: '0', padding: '0' }}>{new Date(currentTime * 1000).toISOString().substr(11, 8)}</p>
                                        <p style={{ margin: '0', padding: '0' }}>/</p>
                                        <p style={{ margin: '0', padding: '0' }}>{new Date(duration * 1000).toISOString().substr(11, 8)}</p>
                                    </div>
                                    <FontAwesomeIcon icon={faDownload}></FontAwesomeIcon>
                                    <FontAwesomeIcon icon={faAngleDown}></FontAwesomeIcon>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <audio
                    ref={audioRef}
                    src={audioFile}
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={handleLoadedMetadata}
                    onEnded={handleAudioEnd}
                />
            </div >
        </DndProvider>
    );
}

export default InputChatboxTabFragment;
