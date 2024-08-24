import './InputHistoryTabFragment.css';
import playButtonLightGray from '../../resources/images/playbutton-light-gray.png'
import downloadButtonGray from '../../resources/images/download-gray.png'
import { getHistoryData, getAllHistoryData } from '../../service/DataService';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { doSelectGeneration, setAudioFile } from "./InputChatboxTabFragment";
import { AnimatePresence, motion } from 'framer-motion';
import testAudioFile from "../../resources/audios/voice-1.wav";
let fetchDataRef = null;

export function doFetch() {
  if (fetchDataRef) {
    fetchDataRef(); // Call the ref function when doFetch is invoked
  }
}
function InputHistoryTabFragment() {
  const selectedTabId = useSelector(
    (state) => state.tabs.present.selectedTabId
  );

  const [items, setItems] = useState([]);
  const [selectedTab, setSelectedTab] = useState('History');
  const [userId, setUserId] = useState(1);
  const [fetchState, setFetchState] = useState(false);
  const [existingItems, setExistingItems] = useState(new Set());

  useEffect(() => {
    fetchData(selectedTab);
  }, [selectedTab, selectedTabId, fetchState]);

  fetchDataRef = () => {
    setFetchState((prevState) => !prevState); // Toggle fetchState
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
      const transformedItems = transformItemsData(items);
      setItems(transformedItems);
      setExistingItems(prevItems => new Set([...prevItems, ...transformedItems.map(item => item.id)]));
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
      const formattedDate = `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()} ${date
        .getHours()
        .toString()
        .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;

      // Extract the first 20 characters from "text_entry_content"
      let description = item.text_entry_content.slice(0, 20);
      if (item.text_entry_content.length > 20) {
        description += "..."; // Add ellipsis if the content exceeds 20 characters
      }

      return {
        id: item.id, // ID of the tab generation
        tab_id: item.tab_id,
        date: formattedDate, // Formatted date
        description: description, // First 20 characters of text_entry_content
        duration: "0:45", // Static duration
        audioLink: testAudioFile,
      };
    });
  }

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  const handleGenerationClick = (item) => () => {
    doSelectGeneration(item.tab_id, item.id);
  };

  const handlePlayAudio = (e, audioSrc) => {
    e.stopPropagation();
    // TODO: set necessary info for player
    setAudioFile(audioSrc);
  }

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        paddingBottom: "30px",
      }}
    >
      <div
        style={{
          padding: "5px 0px",
          marginLeft: "60px",
          display: "flex",
          flexDirection: "row",
          gap: "40px",
          justifyContent: "left",
          height: "50px",
          paddingRight: "30px",
          alignItems: "center",
        }}
      >
        <p
          style={{
            color: selectedTab === "History" ? "#367AFF" : "#757575",
            fontSize: "14px",
            margin: "0",
            padding: "0",
            cursor: "pointer",
            userSelect: "none",
          }}
          onClick={() => handleTabClick("History")}
        >
          History
        </p>
        <p
          style={{
            color: selectedTab === "All History" ? "#367AFF" : "#757575",
            fontSize: "14px",
            margin: "0",
            padding: "0",
            cursor: "pointer",
            userSelect: "none",
          }}
          onClick={() => handleTabClick("All History")}
        >
          All History
        </p>
      </div>

      <div
        style={{
          margin: "0",
          padding: "0",
          paddingRight: "25px",
          paddingLeft: "30px",
          paddingTop: "10px",
          width: "100%",
          height: "100%",
          overflowY: "auto",
        }}
      >
        {/* LIST */}
        <div
          class="minimalist-scrollbar"
          style={{ margin: "0", padding: "10px", width: "100%", height: "100%" }}
        >
          <AnimatePresence>
            {items.map((item) => (
              <motion.div
                key={item.id}
                onClick={handleGenerationClick(item)}
                initial={{ opacity: 0, x: -50 }} // Initial state for new items
                animate={{ opacity: 1, x: 0 }} // Animation state for new items
                exit={{ opacity: 0, x: 50 }} // Exit state for removing items
                layout
                whileHover={{ scale: 1.01 }} // Slightly increase size on hover
                whileTap={{ scale: 1.03 }} // Increase size more on click and hold
              >
                <div
                  key={item.id}
                  style={{
                    margin: "0 0 5px 0",
                    padding: "20px",
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                    height: "60px",
                    alignItems: "center",
                    position: "relative",
                    userSelect: "none",
                    cursor: "pointer",
                    border: "1px solid #eeeeee",
                    backgroundColor: "#fff", // Ensure the background is white
                    borderRadius: "60px", // Rounded corners for smoother look
                  }}
                  onClick={handleGenerationClick(item)}
                >
                  <p
                    style={{
                      color: "#757575",
                      fontSize: "14px",
                      margin: "0",
                      padding: "0",
                      width: "100%",
                      userSelect: "none",
                    }}
                  >
                    {item.date} {item.description}
                  </p>
                  <div
                    style={{
                      margin: "0",
                      padding: "0px 20px 0px 30px",
                      display: "flex",
                      flexDirection: "row",
                      position: "absolute",
                      gap: "10px",
                      right: "0",
                      marginRight: "5px",
                      backgroundColor: "rgba(255, 255, 255, 1)",
                    }}
                  >
                    <p
                      style={{
                        color: "#757575",
                        fontSize: "14px",
                        margin: "0",
                        padding: "0",
                        userSelect: "none",
                      }}
                    >
                      {item.duration}
                    </p>
                    <img
                      src={playButtonLightGray}
                      style={{ width: "20px", height: "20px" }}
                      alt="Description"
                      onClick={(e) => handlePlayAudio(e, item.audioLink)}
                    />
                    <img
                      src={downloadButtonGray}
                      style={{ width: "20px", height: "20px" }}
                      alt="Description"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default InputHistoryTabFragment;
