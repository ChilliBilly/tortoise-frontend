import './InputHistoryTabFragment.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch, faCheckCircle, faExclamationTriangle, faClock } from '@fortawesome/free-solid-svg-icons';
import { getHistoryData, getAllHistoryData, AUDIO_API_URL } from '../../service/DataService';
import React, { useEffect, useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { doSelectGeneration, setAudioFile } from "./InputChatboxTabFragment";
import { AnimatePresence, motion } from 'framer-motion';
import { UserContext } from '../../context/UserContext';
import { useError } from '../../context/ErrorContext';
let fetchDataRef = null;

export function doFetch() {
  if (fetchDataRef) {
    fetchDataRef(); // Call the ref function when doFetch is invoked
  }
}
function InputHistoryTabFragment() {
  const { showError } = useError();
  const selectedTabId = useSelector(
    (state) => state.tabs.present.selectedTabId
  );

  const [items, setItems] = useState([]);
  const [selectedTab, setSelectedTab] = useState('History');
  const { userId } = useContext(UserContext);
  const [fetchState, setFetchState] = useState(false);
  const [existingItems, setExistingItems] = useState(new Set());

  useEffect(() => {
    fetchData(selectedTab);
  }, [selectedTab, selectedTabId, fetchState]);

  fetchDataRef = () => {
    setFetchState((prevState) => !prevState); // Toggle fetchState
  };

  const fetchData = async (tab) => {
    if (userId == null) {
      return;
    }

    try {
      let items;
      if (tab === 'History') {
        items = await getHistoryData(userId, selectedTabId);
      } else {
        items = await getAllHistoryData(userId);
      }
      const transformedItems = transformItemsData(items);
      setItems(transformedItems);
      setExistingItems(prevItems => new Set([...prevItems, ...transformedItems.map(item => item.id)]));
    } catch (error) {
      // showError(`Error fetching ${tab === 'History' ? 'history' : 'all history'}:` + error);
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

      let name = item.text_entry_content.slice(0, 50);
      if (item.text_entry_content.length > 50) {
        description += "..."; // Add ellipsis if the content exceeds 50 characters
      }

      name = formattedDate + " | " + name
      let duration = "0:0";
      if (item.audio.audio_duration != null) {
        duration = formatDuration(item.audio.audio_duration);
      }

      return {
        id: item.id, // ID of the tab generation
        tab_id: item.tab_id,
        date: formattedDate, // Formatted date
        description: description, // First 20 characters of text_entry_content
        duration: duration,
        status: item.audio.status,
        audio_name: item.audio.audio_name,
        name: name
      };
    });
  }

  function formatDuration(seconds) {
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "CREATED":
      // return <FontAwesomeIcon icon={faClock} color="#367AFF" />;
      case "PROCESSING":
        return <FontAwesomeIcon icon={faCircleNotch} spin color="#367AFF" />;
      case "FAILED":
        return <FontAwesomeIcon icon={faExclamationTriangle} color="#367AFF" />;
      case "READY":
        return <FontAwesomeIcon icon={faCheckCircle} color="#367AFF" />;
      default:
        return null;
    }
  };

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  const handleGenerationClick = (item) => () => {
    doSelectGeneration(item.tab_id, item.id);
    if (item.status == "READY") {
      setAudioFile(`${AUDIO_API_URL}/user/${userId}/${item.audio_name}`, item.name);
    }
  };

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        paddingBottom: "30px",
        userSelect: 'none'
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
          userSelect: 'none'
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
                      userSelect: 'none'
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
                      userSelect: 'none',
                      alignItems: 'center'
                    }}
                  >
                    {item.duration && (
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
                    )}
                    <motion.div
                      key={item.status} // animate when the status changes
                      initial={{ opacity: 0, scale: 0.5, rotate: -15 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      exit={{ opacity: 0, scale: 0.5, rotate: 15 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                        mass: 0.5,
                      }}
                    >
                      {getStatusIcon(item.status)}
                    </motion.div>
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
