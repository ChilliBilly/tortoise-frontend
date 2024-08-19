import './InputHistoryTabFragment.css';
import playButtonLightGray from '../../resources/images/playbutton-light-gray.png'
import downloadButtonGray from '../../resources/images/download-gray.png'
import { getHistoryData, getAllHistoryData } from '../../service/DataService';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

let fetchDataRef = null;

export function doFetch() {
    if (fetchDataRef) {
        fetchDataRef(); // Call the ref function when doFetch is invoked
    }
}
function InputHistoryTabFragment() {
    const selectedTabId = useSelector((state) => state.tabs.present.selectedTabId);

    const [items, setItems] = useState([]);
    const [selectedTab, setSelectedTab] = useState('History');
    const [userId, setUserId] = useState(1);
    const [fetchState, setFetchState] = useState(false);

    useEffect(() => {
        fetchData(selectedTab);
    }, [selectedTab, selectedTabId, fetchState]);

    fetchDataRef = () => {
        setFetchState(prevState => !prevState); // Toggle fetchState
    };

    const fetchData = async (tab) => {
        try {
            let items;
            if (tab === 'History') {
                items = await getHistoryData(userId, selectedTabId);
            } else {
                items = await getAllHistoryData(userId);
            }
            console.log(items.data)
            setItems(transformItemsData(items)); // Uncomment this when ready to set state
        } catch (error) {
            console.error(`Error fetching ${tab === 'History' ? 'history' : 'all history'}:`, error);
            // Set a default fallback or handle it gracefully
            setItems([]); // Uncomment and adjust this line if needed
        }
    };

    function transformItemsData(items) {
        return items.data.map((item) => {
            // Format the "created_at" date to 'MM-DD-YYYY HH:mm'
            const date = new Date(item.created_at);
            const formattedDate = `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;

            // Extract the first 20 words from "text_entry_content"
            const words = item.text_entry_content.split(' ');
            const description = words.slice(0, 20).join(' ') + (words.length > 20 ? '...' : '');

            return {
                id: item.id, // ID of the tab generation
                date: formattedDate, // Formatted date
                description: description, // First 20 words of text_entry_content
                duration: '0:45', // Static duration
            };
        });
    }


    const handleTabClick = (tab) => {
        setSelectedTab(tab);
    };

    return (
        <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column', paddingBottom: '30px' }}>
            <div style={{ padding: '5px 0px', marginLeft: '30px', display: 'flex', flexDirection: 'row', gap: '40px', justifyContent: 'left', height: '30px', paddingRight: '30px' }}>
                <p
                    style={{ color: selectedTab === 'History' ? '#367AFF' : '#757575', fontSize: '14px', margin: '0', padding: '0', cursor: 'pointer', userSelect: 'none' }}
                    onClick={() => handleTabClick('History')}
                >
                    History
                </p>
                <p
                    style={{ color: selectedTab === 'All History' ? '#367AFF' : '#757575', fontSize: '14px', margin: '0', padding: '0', cursor: 'pointer', userSelect: 'none' }}
                    onClick={() => handleTabClick('All History')}
                >
                    All History
                </p>
            </div>

            <div style={{ margin: '0', padding: '0', paddingRight: '25px', paddingLeft: '30px', paddingTop: '10px', width: '100%', height: '100%', overflowY: 'auto' }}>

                {/* LIST */}
                <div class="minimalist-scrollbar" style={{ margin: '0', padding: '0', width: '100%', height: '100%' }}>
                    {items.map(item => (
                        <div key={item.id} style={{ margin: '0', padding: '0', display: 'flex', flexDirection: 'row', width: '100%', height: '60px', alignItems: 'center', borderBottom: '1px solid #eeeeee', position: 'relative', userSelect: 'none' }}>
                            <p style={{ color: '#757575', fontSize: '14px', margin: '0', padding: '0', width: '100%', userSelect: 'none' }}>{item.date} {item.description}</p>
                            <div style={{ margin: '0', padding: '0px 0px 0px 30px', display: 'flex', flexDirection: 'row', position: 'absolute', gap: '10px', right: '0', marginRight: '5px', backgroundColor: 'rgba(255, 255, 255, 1)' }}>
                                <p style={{ color: '#757575', fontSize: '14px', margin: '0', padding: '0', userSelect: 'none' }}>{item.duration}</p>
                                <img src={playButtonLightGray} style={{ width: '20px', height: '20px' }} alt="Description" />
                                <img src={downloadButtonGray} style={{ width: '20px', height: '20px' }} alt="Description" />
                            </div>
                        </div>
                    ))}

                    {/* <div style={{ margin: '0', padding: '0', display: 'flex', flexDirection: 'row', width: '100%', height: '60px', alignItems: 'center', borderBottom: '1px solid #eeeeee', position: 'relative', userSelect: 'none' }}>
                        <p style={{ color: '#757575', fontSize: '14px', margin: '0', padding: '0', width: '100%', userSelect: 'none' }}>Item 1 Item2</p>
                        <div style={{ margin: '0', padding: '0px 0px 0px 30px', display: 'flex', flexDirection: 'row', position: 'absolute', gap: '10px', right: '0', marginRight: '5px', backgroundColor: 'rgba(255, 255, 255, 1)' }}>
                            <p style={{ color: '#757575', fontSize: '14px', margin: '0', padding: '0', userSelect: 'none' }}>0:12</p>
                            <img src={playButtonLightGray} style={{ width: '20px', height: '20px' }} alt="Description" />
                            <img src={downloadButtonGray} style={{ width: '20px', height: '20px' }} alt="Description" />
                        </div>
                    </div>
                    <div style={{ margin: '0', padding: '0', display: 'flex', flexDirection: 'row', width: '100%', height: '60px', alignItems: 'center', borderBottom: '1px solid #eeeeee', position: 'relative', userSelect: 'none' }}>
                        <p style={{ color: '#757575', fontSize: '14px', margin: '0', padding: '0', width: '100%', userSelect: 'none' }}>Item 1 Item2</p>
                        <div style={{ margin: '0', padding: '0px 0px 0px 30px', display: 'flex', flexDirection: 'row', position: 'absolute', gap: '10px', right: '0', marginRight: '5px', backgroundColor: 'rgba(255, 255, 255, 1)' }}>
                            <p style={{ color: '#757575', fontSize: '14px', margin: '0', padding: '0', userSelect: 'none' }}>0:12</p>
                            <img src={playButtonLightGray} style={{ width: '20px', height: '20px' }} alt="Description" />
                            <img src={downloadButtonGray} style={{ width: '20px', height: '20px' }} alt="Description" />
                        </div>
                    </div>
                    <div style={{ margin: '0', padding: '0', display: 'flex', flexDirection: 'row', width: '100%', height: '60px', alignItems: 'center', borderBottom: '1px solid #eeeeee', position: 'relative', userSelect: 'none' }}>
                        <p style={{ color: '#757575', fontSize: '14px', margin: '0', padding: '0', width: '100%', userSelect: 'none' }}>Item 1 Item2</p>
                        <div style={{ margin: '0', padding: '0px 0px 0px 30px', display: 'flex', flexDirection: 'row', position: 'absolute', gap: '10px', right: '0', marginRight: '5px', backgroundColor: 'rgba(255, 255, 255, 1)' }}>
                            <p style={{ color: '#757575', fontSize: '14px', margin: '0', padding: '0', userSelect: 'none' }}>0:12</p>
                            <img src={playButtonLightGray} style={{ width: '20px', height: '20px' }} alt="Description" />
                            <img src={downloadButtonGray} style={{ width: '20px', height: '20px' }} alt="Description" />
                        </div>
                    </div>
                    <div style={{ margin: '0', padding: '0', display: 'flex', flexDirection: 'row', width: '100%', height: '60px', alignItems: 'center', borderBottom: '1px solid #eeeeee', position: 'relative', userSelect: 'none' }}>
                        <p style={{ color: '#757575', fontSize: '14px', margin: '0', padding: '0', width: '100%', userSelect: 'none' }}>Item 1 Item2</p>
                        <div style={{ margin: '0', padding: '0px 0px 0px 30px', display: 'flex', flexDirection: 'row', position: 'absolute', gap: '10px', right: '0', marginRight: '5px', backgroundColor: 'rgba(255, 255, 255, 1)' }}>
                            <p style={{ color: '#757575', fontSize: '14px', margin: '0', padding: '0', userSelect: 'none' }}>0:12</p>
                            <img src={playButtonLightGray} style={{ width: '20px', height: '20px' }} alt="Description" />
                            <img src={downloadButtonGray} style={{ width: '20px', height: '20px' }} alt="Description" />
                        </div>
                    </div>
                    <div style={{ margin: '0', padding: '0', display: 'flex', flexDirection: 'row', width: '100%', height: '60px', alignItems: 'center', borderBottom: '1px solid #eeeeee', position: 'relative', userSelect: 'none' }}>
                        <p style={{ color: '#757575', fontSize: '14px', margin: '0', padding: '0', width: '100%', userSelect: 'none' }}>Item 1 Item2</p>
                        <div style={{ margin: '0', padding: '0px 0px 0px 30px', display: 'flex', flexDirection: 'row', position: 'absolute', gap: '10px', right: '0', marginRight: '5px', backgroundColor: 'rgba(255, 255, 255, 1)' }}>
                            <p style={{ color: '#757575', fontSize: '14px', margin: '0', padding: '0', userSelect: 'none' }}>0:12</p>
                            <img src={playButtonLightGray} style={{ width: '20px', height: '20px' }} alt="Description" />
                            <img src={downloadButtonGray} style={{ width: '20px', height: '20px' }} alt="Description" />
                        </div>
                    </div>
                    <div style={{ margin: '0', padding: '0', display: 'flex', flexDirection: 'row', width: '100%', height: '60px', alignItems: 'center', borderBottom: '1px solid #eeeeee', position: 'relative', userSelect: 'none' }}>
                        <p style={{ color: '#757575', fontSize: '14px', margin: '0', padding: '0', width: '100%', userSelect: 'none' }}>Item 1 Item2</p>
                        <div style={{ margin: '0', padding: '0px 0px 0px 30px', display: 'flex', flexDirection: 'row', position: 'absolute', gap: '10px', right: '0', marginRight: '5px', backgroundColor: 'rgba(255, 255, 255, 1)' }}>
                            <p style={{ color: '#757575', fontSize: '14px', margin: '0', padding: '0', userSelect: 'none' }}>0:12</p>
                            <img src={playButtonLightGray} style={{ width: '20px', height: '20px' }} alt="Description" />
                            <img src={downloadButtonGray} style={{ width: '20px', height: '20px' }} alt="Description" />
                        </div>
                    </div>
                    <div style={{ margin: '0', padding: '0', display: 'flex', flexDirection: 'row', width: '100%', height: '60px', alignItems: 'center', borderBottom: '1px solid #eeeeee', position: 'relative', userSelect: 'none' }}>
                        <p style={{ color: '#757575', fontSize: '14px', margin: '0', padding: '0', width: '100%', userSelect: 'none' }}>Item 1 Item2</p>
                        <div style={{ margin: '0', padding: '0px 0px 0px 30px', display: 'flex', flexDirection: 'row', position: 'absolute', gap: '10px', right: '0', marginRight: '5px', backgroundColor: 'rgba(255, 255, 255, 1)' }}>
                            <p style={{ color: '#757575', fontSize: '14px', margin: '0', padding: '0', userSelect: 'none' }}>0:12</p>
                            <img src={playButtonLightGray} style={{ width: '20px', height: '20px' }} alt="Description" />
                            <img src={downloadButtonGray} style={{ width: '20px', height: '20px' }} alt="Description" />
                        </div>
                    </div>
                    <div style={{ margin: '0', padding: '0', display: 'flex', flexDirection: 'row', width: '100%', height: '60px', alignItems: 'center', borderBottom: '1px solid #eeeeee', position: 'relative', userSelect: 'none' }}>
                        <p style={{ color: '#757575', fontSize: '14px', margin: '0', padding: '0', width: '100%', userSelect: 'none' }}>Item 1 Item2</p>
                        <div style={{ margin: '0', padding: '0px 0px 0px 30px', display: 'flex', flexDirection: 'row', position: 'absolute', gap: '10px', right: '0', marginRight: '5px', backgroundColor: 'rgba(255, 255, 255, 1)' }}>
                            <p style={{ color: '#757575', fontSize: '14px', margin: '0', padding: '0', userSelect: 'none' }}>0:12</p>
                            <img src={playButtonLightGray} style={{ width: '20px', height: '20px' }} alt="Description" />
                            <img src={downloadButtonGray} style={{ width: '20px', height: '20px' }} alt="Description" />
                        </div>
                    </div>
                    <div style={{ margin: '0', padding: '0', display: 'flex', flexDirection: 'row', width: '100%', height: '60px', alignItems: 'center', borderBottom: '1px solid #eeeeee', position: 'relative', userSelect: 'none' }}>
                        <p style={{ color: '#757575', fontSize: '14px', margin: '0', padding: '0', width: '100%', userSelect: 'none' }}>Item 1 Item2</p>
                        <div style={{ margin: '0', padding: '0px 0px 0px 30px', display: 'flex', flexDirection: 'row', position: 'absolute', gap: '10px', right: '0', marginRight: '5px', backgroundColor: 'rgba(255, 255, 255, 1)' }}>
                            <p style={{ color: '#757575', fontSize: '14px', margin: '0', padding: '0', userSelect: 'none' }}>0:12</p>
                            <img src={playButtonLightGray} style={{ width: '20px', height: '20px' }} alt="Description" />
                            <img src={downloadButtonGray} style={{ width: '20px', height: '20px' }} alt="Description" />
                        </div>
                    </div>
                    <div style={{ margin: '0', padding: '0', display: 'flex', flexDirection: 'row', width: '100%', height: '60px', alignItems: 'center', borderBottom: '1px solid #eeeeee', position: 'relative', userSelect: 'none' }}>
                        <p style={{ color: '#757575', fontSize: '14px', margin: '0', padding: '0', width: '100%', userSelect: 'none' }}>Item 1 Item2</p>
                        <div style={{ margin: '0', padding: '0px 0px 0px 30px', display: 'flex', flexDirection: 'row', position: 'absolute', gap: '10px', right: '0', marginRight: '5px', backgroundColor: 'rgba(255, 255, 255, 1)' }}>
                            <p style={{ color: '#757575', fontSize: '14px', margin: '0', padding: '0', userSelect: 'none' }}>0:12</p>
                            <img src={playButtonLightGray} style={{ width: '20px', height: '20px' }} alt="Description" />
                            <img src={downloadButtonGray} style={{ width: '20px', height: '20px' }} alt="Description" />
                        </div>
                    </div>
                    <div style={{ margin: '0', padding: '0', display: 'flex', flexDirection: 'row', width: '100%', height: '60px', alignItems: 'center', borderBottom: '1px solid #eeeeee', position: 'relative', userSelect: 'none' }}>
                        <p style={{ color: '#757575', fontSize: '14px', margin: '0', padding: '0', width: '100%', userSelect: 'none' }}>Item 1 Item2</p>
                        <div style={{ margin: '0', padding: '0px 0px 0px 30px', display: 'flex', flexDirection: 'row', position: 'absolute', gap: '10px', right: '0', marginRight: '5px', backgroundColor: 'rgba(255, 255, 255, 1)' }}>
                            <p style={{ color: '#757575', fontSize: '14px', margin: '0', padding: '0', userSelect: 'none' }}>0:12</p>
                            <img src={playButtonLightGray} style={{ width: '20px', height: '20px' }} alt="Description" />
                            <img src={downloadButtonGray} style={{ width: '20px', height: '20px' }} alt="Description" />
                        </div>
                    </div>
                    <div style={{ margin: '0', padding: '0', display: 'flex', flexDirection: 'row', width: '100%', height: '60px', alignItems: 'center', borderBottom: '1px solid #eeeeee', position: 'relative', userSelect: 'none' }}>
                        <p style={{ color: '#757575', fontSize: '14px', margin: '0', padding: '0', width: '100%', userSelect: 'none' }}>Item 1 Item2</p>
                        <div style={{ margin: '0', padding: '0px 0px 0px 30px', display: 'flex', flexDirection: 'row', position: 'absolute', gap: '10px', right: '0', marginRight: '5px', backgroundColor: 'rgba(255, 255, 255, 1)' }}>
                            <p style={{ color: '#757575', fontSize: '14px', margin: '0', padding: '0', userSelect: 'none' }}>0:12</p>
                            <img src={playButtonLightGray} style={{ width: '20px', height: '20px' }} alt="Description" />
                            <img src={downloadButtonGray} style={{ width: '20px', height: '20px' }} alt="Description" />
                        </div>
                    </div>
                    <div style={{ margin: '0', padding: '0', display: 'flex', flexDirection: 'row', width: '100%', height: '60px', alignItems: 'center', borderBottom: '1px solid #eeeeee', position: 'relative', userSelect: 'none' }}>
                        <p style={{ color: '#757575', fontSize: '14px', margin: '0', padding: '0', width: '100%', userSelect: 'none' }}>Item 1 Item2</p>
                        <div style={{ margin: '0', padding: '0px 0px 0px 30px', display: 'flex', flexDirection: 'row', position: 'absolute', gap: '10px', right: '0', marginRight: '5px', backgroundColor: 'rgba(255, 255, 255, 1)' }}>
                            <p style={{ color: '#757575', fontSize: '14px', margin: '0', padding: '0', userSelect: 'none' }}>0:12</p>
                            <img src={playButtonLightGray} style={{ width: '20px', height: '20px' }} alt="Description" />
                            <img src={downloadButtonGray} style={{ width: '20px', height: '20px' }} alt="Description" />
                        </div>
                    </div>
                    <div style={{ margin: '0', padding: '0', display: 'flex', flexDirection: 'row', width: '100%', height: '60px', alignItems: 'center', borderBottom: '1px solid #eeeeee', position: 'relative', userSelect: 'none' }}>
                        <p style={{ color: '#757575', fontSize: '14px', margin: '0', padding: '0', width: '100%', userSelect: 'none' }}>Item 1 Item2</p>
                        <div style={{ margin: '0', padding: '0px 0px 0px 30px', display: 'flex', flexDirection: 'row', position: 'absolute', gap: '10px', right: '0', marginRight: '5px', backgroundColor: 'rgba(255, 255, 255, 1)' }}>
                            <p style={{ color: '#757575', fontSize: '14px', margin: '0', padding: '0', userSelect: 'none' }}>0:12</p>
                            <img src={playButtonLightGray} style={{ width: '20px', height: '20px' }} alt="Description" />
                            <img src={downloadButtonGray} style={{ width: '20px', height: '20px' }} alt="Description" />
                        </div>
                    </div>
                    <div style={{ margin: '0', padding: '0', display: 'flex', flexDirection: 'row', width: '100%', height: '60px', alignItems: 'center', borderBottom: '1px solid #eeeeee', position: 'relative', userSelect: 'none' }}>
                        <p style={{ color: '#757575', fontSize: '14px', margin: '0', padding: '0', width: '100%', userSelect: 'none' }}>Item 1 Item2</p>
                        <div style={{ margin: '0', padding: '0px 0px 0px 30px', display: 'flex', flexDirection: 'row', position: 'absolute', gap: '10px', right: '0', marginRight: '5px', backgroundColor: 'rgba(255, 255, 255, 1)' }}>
                            <p style={{ color: '#757575', fontSize: '14px', margin: '0', padding: '0', userSelect: 'none' }}>0:12</p>
                            <img src={playButtonLightGray} style={{ width: '20px', height: '20px' }} alt="Description" />
                            <img src={downloadButtonGray} style={{ width: '20px', height: '20px' }} alt="Description" />
                        </div>
                    </div>
                    <div style={{ margin: '0', padding: '0', display: 'flex', flexDirection: 'row', width: '100%', height: '60px', alignItems: 'center', borderBottom: '1px solid #eeeeee', position: 'relative', userSelect: 'none' }}>
                        <p style={{ color: '#757575', fontSize: '14px', margin: '0', padding: '0', width: '100%', userSelect: 'none' }}>Item 1 Item2</p>
                        <div style={{ margin: '0', padding: '0px 0px 0px 30px', display: 'flex', flexDirection: 'row', position: 'absolute', gap: '10px', right: '0', marginRight: '5px', backgroundColor: 'rgba(255, 255, 255, 1)' }}>
                            <p style={{ color: '#757575', fontSize: '14px', margin: '0', padding: '0', userSelect: 'none' }}>0:12</p>
                            <img src={playButtonLightGray} style={{ width: '20px', height: '20px' }} alt="Description" />
                            <img src={downloadButtonGray} style={{ width: '20px', height: '20px' }} alt="Description" />
                        </div>
                    </div>
                    <div style={{ margin: '0', padding: '0', display: 'flex', flexDirection: 'row', width: '100%', height: '60px', alignItems: 'center', borderBottom: '1px solid #eeeeee', position: 'relative', userSelect: 'none' }}>
                        <p style={{ color: '#757575', fontSize: '14px', margin: '0', padding: '0', width: '100%', userSelect: 'none' }}>Item 1 Item2</p>
                        <div style={{ margin: '0', padding: '0px 0px 0px 30px', display: 'flex', flexDirection: 'row', position: 'absolute', gap: '10px', right: '0', marginRight: '5px', backgroundColor: 'rgba(255, 255, 255, 1)' }}>
                            <p style={{ color: '#757575', fontSize: '14px', margin: '0', padding: '0', userSelect: 'none' }}>0:12</p>
                            <img src={playButtonLightGray} style={{ width: '20px', height: '20px' }} alt="Description" />
                            <img src={downloadButtonGray} style={{ width: '20px', height: '20px' }} alt="Description" />
                        </div>
                    </div>
                    <div style={{ margin: '0', padding: '0', display: 'flex', flexDirection: 'row', width: '100%', height: '60px', alignItems: 'center', borderBottom: '1px solid #eeeeee', position: 'relative', userSelect: 'none' }}>
                        <p style={{ color: '#757575', fontSize: '14px', margin: '0', padding: '0', width: '100%', userSelect: 'none' }}>Item 1 Item2</p>
                        <div style={{ margin: '0', padding: '0px 0px 0px 30px', display: 'flex', flexDirection: 'row', position: 'absolute', gap: '10px', right: '0', marginRight: '5px', backgroundColor: 'rgba(255, 255, 255, 1)' }}>
                            <p style={{ color: '#757575', fontSize: '14px', margin: '0', padding: '0', userSelect: 'none' }}>0:12</p>
                            <img src={playButtonLightGray} style={{ width: '20px', height: '20px' }} alt="Description" />
                            <img src={downloadButtonGray} style={{ width: '20px', height: '20px' }} alt="Description" />
                        </div>
                    </div>
                    <div style={{ margin: '0', padding: '0', display: 'flex', flexDirection: 'row', width: '100%', height: '60px', alignItems: 'center', borderBottom: '1px solid #eeeeee', position: 'relative', userSelect: 'none' }}>
                        <p style={{ color: '#757575', fontSize: '14px', margin: '0', padding: '0', width: '100%', userSelect: 'none' }}>Item 1 Item2</p>
                        <div style={{ margin: '0', padding: '0px 0px 0px 30px', display: 'flex', flexDirection: 'row', position: 'absolute', gap: '10px', right: '0', marginRight: '5px', backgroundColor: 'rgba(255, 255, 255, 1)' }}>
                            <p style={{ color: '#757575', fontSize: '14px', margin: '0', padding: '0', userSelect: 'none' }}>0:12</p>
                            <img src={playButtonLightGray} style={{ width: '20px', height: '20px' }} alt="Description" />
                            <img src={downloadButtonGray} style={{ width: '20px', height: '20px' }} alt="Description" />
                        </div>
                    </div>
                    <div style={{ margin: '0', padding: '0', display: 'flex', flexDirection: 'row', width: '100%', height: '60px', alignItems: 'center', borderBottom: '1px solid #eeeeee', position: 'relative', userSelect: 'none' }}>
                        <p style={{ color: '#757575', fontSize: '14px', margin: '0', padding: '0', width: '100%', userSelect: 'none' }}>Item 1 Item2</p>
                        <div style={{ margin: '0', padding: '0px 0px 0px 30px', display: 'flex', flexDirection: 'row', position: 'absolute', gap: '10px', right: '0', marginRight: '5px', backgroundColor: 'rgba(255, 255, 255, 1)' }}>
                            <p style={{ color: '#757575', fontSize: '14px', margin: '0', padding: '0', userSelect: 'none' }}>0:12</p>
                            <img src={playButtonLightGray} style={{ width: '20px', height: '20px' }} alt="Description" />
                            <img src={downloadButtonGray} style={{ width: '20px', height: '20px' }} alt="Description" />
                        </div>
                    </div>
                    <div style={{ margin: '0', padding: '0', display: 'flex', flexDirection: 'row', width: '100%', height: '60px', alignItems: 'center', borderBottom: '1px solid #eeeeee', position: 'relative', userSelect: 'none' }}>
                        <p style={{ color: '#757575', fontSize: '14px', margin: '0', padding: '0', width: '100%', userSelect: 'none' }}>Item 1 Item2</p>
                        <div style={{ margin: '0', padding: '0px 0px 0px 30px', display: 'flex', flexDirection: 'row', position: 'absolute', gap: '10px', right: '0', marginRight: '5px', backgroundColor: 'rgba(255, 255, 255, 1)' }}>
                            <p style={{ color: '#757575', fontSize: '14px', margin: '0', padding: '0', userSelect: 'none' }}>0:12</p>
                            <img src={playButtonLightGray} style={{ width: '20px', height: '20px' }} alt="Description" />
                            <img src={downloadButtonGray} style={{ width: '20px', height: '20px' }} alt="Description" />
                        </div>
                    </div>
                    <div style={{ margin: '0', padding: '0', display: 'flex', flexDirection: 'row', width: '100%', height: '60px', alignItems: 'center', borderBottom: '1px solid #eeeeee', position: 'relative', userSelect: 'none' }}>
                        <p style={{ color: '#757575', fontSize: '14px', margin: '0', padding: '0', width: '100%', userSelect: 'none' }}>Item 1 Item2</p>
                        <div style={{ margin: '0', padding: '0px 0px 0px 30px', display: 'flex', flexDirection: 'row', position: 'absolute', gap: '10px', right: '0', marginRight: '5px', backgroundColor: 'rgba(255, 255, 255, 1)' }}>
                            <p style={{ color: '#757575', fontSize: '14px', margin: '0', padding: '0', userSelect: 'none' }}>0:12</p>
                            <img src={playButtonLightGray} style={{ width: '20px', height: '20px' }} alt="Description" />
                            <img src={downloadButtonGray} style={{ width: '20px', height: '20px' }} alt="Description" />
                        </div>
                    </div>
                    <div style={{ margin: '0', padding: '0', display: 'flex', flexDirection: 'row', width: '100%', height: '60px', alignItems: 'center', borderBottom: '1px solid #eeeeee', position: 'relative', userSelect: 'none' }}>
                        <p style={{ color: '#757575', fontSize: '14px', margin: '0', padding: '0', width: '100%', userSelect: 'none' }}>Item 1 Item2</p>
                        <div style={{ margin: '0', padding: '0px 0px 0px 30px', display: 'flex', flexDirection: 'row', position: 'absolute', gap: '10px', right: '0', marginRight: '5px', backgroundColor: 'rgba(255, 255, 255, 1)' }}>
                            <p style={{ color: '#757575', fontSize: '14px', margin: '0', padding: '0', userSelect: 'none' }}>0:12</p>
                            <img src={playButtonLightGray} style={{ width: '20px', height: '20px' }} alt="Description" />
                            <img src={downloadButtonGray} style={{ width: '20px', height: '20px' }} alt="Description" />
                        </div>
                    </div>
                    <div style={{ margin: '0', padding: '0', display: 'flex', flexDirection: 'row', width: '100%', height: '60px', alignItems: 'center', borderBottom: '1px solid #eeeeee', position: 'relative', userSelect: 'none' }}>
                        <p style={{ color: '#757575', fontSize: '14px', margin: '0', padding: '0', width: '100%', userSelect: 'none' }}>Item 1 Item2</p>
                        <div style={{ margin: '0', padding: '0px 0px 0px 30px', display: 'flex', flexDirection: 'row', position: 'absolute', gap: '10px', right: '0', marginRight: '5px', backgroundColor: 'rgba(255, 255, 255, 1)' }}>
                            <p style={{ color: '#757575', fontSize: '14px', margin: '0', padding: '0', userSelect: 'none' }}>0:12</p>
                            <img src={playButtonLightGray} style={{ width: '20px', height: '20px' }} alt="Description" />
                            <img src={downloadButtonGray} style={{ width: '20px', height: '20px' }} alt="Description" />
                        </div>
                    </div>
                    <div style={{ margin: '0', padding: '0', display: 'flex', flexDirection: 'row', width: '100%', height: '60px', alignItems: 'center', borderBottom: '1px solid #eeeeee', position: 'relative', userSelect: 'none' }}>
                        <p style={{ color: '#757575', fontSize: '14px', margin: '0', padding: '0', width: '100%', userSelect: 'none' }}>Item 1 Item2</p>
                        <div style={{ margin: '0', padding: '0px 0px 0px 30px', display: 'flex', flexDirection: 'row', position: 'absolute', gap: '10px', right: '0', marginRight: '5px', backgroundColor: 'rgba(255, 255, 255, 1)' }}>
                            <p style={{ color: '#757575', fontSize: '14px', margin: '0', padding: '0', userSelect: 'none' }}>0:12</p>
                            <img src={playButtonLightGray} style={{ width: '20px', height: '20px' }} alt="Description" />
                            <img src={downloadButtonGray} style={{ width: '20px', height: '20px' }} alt="Description" />
                        </div>
                    </div>
                    <div style={{ margin: '0', padding: '0', display: 'flex', flexDirection: 'row', width: '100%', height: '60px', alignItems: 'center', borderBottom: '1px solid #eeeeee', position: 'relative', userSelect: 'none' }}>
                        <p style={{ color: '#757575', fontSize: '14px', margin: '0', padding: '0', width: '100%', userSelect: 'none' }}>Item 1 Item2</p>
                        <div style={{ margin: '0', padding: '0px 0px 0px 30px', display: 'flex', flexDirection: 'row', position: 'absolute', gap: '10px', right: '0', marginRight: '5px', backgroundColor: 'rgba(255, 255, 255, 1)' }}>
                            <p style={{ color: '#757575', fontSize: '14px', margin: '0', padding: '0', userSelect: 'none' }}>0:12</p>
                            <img src={playButtonLightGray} style={{ width: '20px', height: '20px' }} alt="Description" />
                            <img src={downloadButtonGray} style={{ width: '20px', height: '20px' }} alt="Description" />
                        </div>
                    </div>
                    <div style={{ margin: '0', padding: '0', display: 'flex', flexDirection: 'row', width: '100%', height: '60px', alignItems: 'center', borderBottom: '1px solid #eeeeee', position: 'relative', userSelect: 'none' }}>
                        <p style={{ color: '#757575', fontSize: '14px', margin: '0', padding: '0', width: '100%', userSelect: 'none' }}>Item 1 Item2</p>
                        <div style={{ margin: '0', padding: '0px 0px 0px 30px', display: 'flex', flexDirection: 'row', position: 'absolute', gap: '10px', right: '0', marginRight: '5px', backgroundColor: 'rgba(255, 255, 255, 1)' }}>
                            <p style={{ color: '#757575', fontSize: '14px', margin: '0', padding: '0', userSelect: 'none' }}>0:12</p>
                            <img src={playButtonLightGray} style={{ width: '20px', height: '20px' }} alt="Description" />
                            <img src={downloadButtonGray} style={{ width: '20px', height: '20px' }} alt="Description" />
                        </div>
                    </div>
                    <div style={{ margin: '0', padding: '0', display: 'flex', flexDirection: 'row', width: '100%', height: '60px', alignItems: 'center', borderBottom: '1px solid #eeeeee', position: 'relative', userSelect: 'none' }}>
                        <p style={{ color: '#757575', fontSize: '14px', margin: '0', padding: '0', width: '100%', userSelect: 'none' }}>Item 1 Item2</p>
                        <div style={{ margin: '0', padding: '0px 0px 0px 30px', display: 'flex', flexDirection: 'row', position: 'absolute', gap: '10px', right: '0', marginRight: '5px', backgroundColor: 'rgba(255, 255, 255, 1)' }}>
                            <p style={{ color: '#757575', fontSize: '14px', margin: '0', padding: '0', userSelect: 'none' }}>0:12</p>
                            <img src={playButtonLightGray} style={{ width: '20px', height: '20px' }} alt="Description" />
                            <img src={downloadButtonGray} style={{ width: '20px', height: '20px' }} alt="Description" />
                        </div>
                    </div>
                    <div style={{ margin: '0', padding: '0', display: 'flex', flexDirection: 'row', width: '100%', height: '60px', alignItems: 'center', borderBottom: '1px solid #eeeeee', position: 'relative', userSelect: 'none' }}>
                        <p style={{ color: '#757575', fontSize: '14px', margin: '0', padding: '0', width: '100%', userSelect: 'none' }}>Item 1 Item2</p>
                        <div style={{ margin: '0', padding: '0px 0px 0px 30px', display: 'flex', flexDirection: 'row', position: 'absolute', gap: '10px', right: '0', marginRight: '5px', backgroundColor: 'rgba(255, 255, 255, 1)' }}>
                            <p style={{ color: '#757575', fontSize: '14px', margin: '0', padding: '0', userSelect: 'none' }}>0:12</p>
                            <img src={playButtonLightGray} style={{ width: '20px', height: '20px' }} alt="Description" />
                            <img src={downloadButtonGray} style={{ width: '20px', height: '20px' }} alt="Description" />
                        </div>
                    </div>
                    <div style={{ margin: '0', padding: '0', display: 'flex', flexDirection: 'row', width: '100%', height: '60px', alignItems: 'center', borderBottom: '1px solid #eeeeee', position: 'relative', userSelect: 'none' }}>
                        <p style={{ color: '#757575', fontSize: '14px', margin: '0', padding: '0', width: '100%', userSelect: 'none' }}>Item 1 Item2</p>
                        <div style={{ margin: '0', padding: '0px 0px 0px 30px', display: 'flex', flexDirection: 'row', position: 'absolute', gap: '10px', right: '0', marginRight: '5px', backgroundColor: 'rgba(255, 255, 255, 1)' }}>
                            <p style={{ color: '#757575', fontSize: '14px', margin: '0', padding: '0', userSelect: 'none' }}>0:12</p>
                            <img src={playButtonLightGray} style={{ width: '20px', height: '20px' }} alt="Description" />
                            <img src={downloadButtonGray} style={{ width: '20px', height: '20px' }} alt="Description" />
                        </div>
                    </div>
                    <div style={{ margin: '0', padding: '0', display: 'flex', flexDirection: 'row', width: '100%', height: '60px', alignItems: 'center', borderBottom: '1px solid #eeeeee', position: 'relative', userSelect: 'none' }}>
                        <p style={{ color: '#757575', fontSize: '14px', margin: '0', padding: '0', width: '100%', userSelect: 'none' }}>Item 1 Item2</p>
                        <div style={{ margin: '0', padding: '0px 0px 0px 30px', display: 'flex', flexDirection: 'row', position: 'absolute', gap: '10px', right: '0', marginRight: '5px', backgroundColor: 'rgba(255, 255, 255, 1)' }}>
                            <p style={{ color: '#757575', fontSize: '14px', margin: '0', padding: '0', userSelect: 'none' }}>0:12</p>
                            <img src={playButtonLightGray} style={{ width: '20px', height: '20px' }} alt="Description" />
                            <img src={downloadButtonGray} style={{ width: '20px', height: '20px' }} alt="Description" />
                        </div>
                    </div>
                    <div style={{ margin: '0', padding: '0', display: 'flex', flexDirection: 'row', width: '100%', height: '60px', alignItems: 'center', borderBottom: '1px solid #eeeeee', position: 'relative', userSelect: 'none' }}>
                        <p style={{ color: '#757575', fontSize: '14px', margin: '0', padding: '0', width: '100%', userSelect: 'none' }}>Item 1 Item2</p>
                        <div style={{ margin: '0', padding: '0px 0px 0px 30px', display: 'flex', flexDirection: 'row', position: 'absolute', gap: '10px', right: '0', marginRight: '5px', backgroundColor: 'rgba(255, 255, 255, 1)' }}>
                            <p style={{ color: '#757575', fontSize: '14px', margin: '0', padding: '0', userSelect: 'none' }}>0:12</p>
                            <img src={playButtonLightGray} style={{ width: '20px', height: '20px' }} alt="Description" />
                            <img src={downloadButtonGray} style={{ width: '20px', height: '20px' }} alt="Description" />
                        </div>
                    </div> */}

                </div>
            </div>
        </div>
    )
}

export default InputHistoryTabFragment