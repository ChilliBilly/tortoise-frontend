import './LeftTabFragment.css';
import personPortrait from '../../resources/images/person-portrait.jpg';
import homeGray from '../../resources/images/home-gray.png';
import AudioGray from '../../resources/images/audio_gray_logo.svg';
import AudioBlue from '../../resources/images/audio_blue_logo.svg';
import MicroGray from '../../resources/images/micro_gray_logo.svg';
import MicroBlue from '../../resources/images/micro_blue_logo.svg';
import logo from '../../resources/images/logo.png';
import logoutIcon from '../../resources/images/return_gray_logo.svg';
import LeftTabItem from './LeftTabItem';
import { getUser } from '../../service/DataService';
import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../context/UserContext';
import { useLocation } from 'react-router-dom';

function LeftTabFragment({ onLogout }) {
    const [userData, setUserData] = useState(null);
    const { userId } = useContext(UserContext);
    const location = useLocation();

    // Determine the icon based on the current path
    const ttsSrc = location.pathname === "/tts" ? AudioBlue : AudioGray;
    const voiceCloneSrc = location.pathname === "/voiceclone" ? MicroBlue : MicroGray;

    useEffect(() => {
        const getUserData = async () => {
            try {
                const response = await getUser(userId);
                setUserData(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        getUserData();
    }, [userId]);
    return (
        <div className="left-tab-container">
            {/* TOP PART */}
            <div className="top-part">
                <div className="logo-section">
                    <img src={logo} className="logo-image" alt="Logo" />
                    <p className="logo-text">ChilliBilly</p>
                </div>
                <div className="section">
                    <p className="section-header">MAIN</p>
                    <div className="section-items">
                        <LeftTabItem
                            src={homeGray}
                            alt="Home Icon"
                            text="Home"
                            path="/"
                        />
                        <LeftTabItem
                            src={ttsSrc}
                            alt="Convert Text Icon"
                            text="Convert Text"
                            path="/tts"
                        />
                        <LeftTabItem
                            src={voiceCloneSrc}
                            alt="Voice Cloning Icon"
                            text="Voice Cloning"
                            path="/voiceclone"
                        />
                    </div>
                </div>
                <div className="section">
                    <p className="section-header">SETTING</p>
                    <div className="section-items">
                        {/* <LeftTabItem src={gearGray} alt="Settings Icon" text="Settings" /> */}
                        <div onClick={onLogout}>
                            <LeftTabItem src={logoutIcon} alt="Log Out Icon" text="Return" />
                        </div>
                    </div>
                </div>
            </div>

            {/* BOTTOM PART */}
            <div className="bottom-part">
                <div className="profile-section">
                    <div className="image-content">
                        <img src={personPortrait} alt="Profile" />
                    </div>
                    <div className="profile-info">
                        <p className="account-type">{userData ? userData.role : 'Loading...'}</p>
                        <p className="user-name">{userData ? userData.username : 'Loading...'}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LeftTabFragment;
