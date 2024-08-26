import './LeftTabFragment.css';
import personPortrait from '../../resources/images/person-portrait.jpg';
import homeGray from '../../resources/images/home-gray.png';
import ConvertTextBlue from '../../resources/images/convert-text-blue.png';
import MicroGray from '../../resources/images/micro-gray.png';
import CartGray from '../../resources/images/cart-gray.png';
import bookGray from '../../resources/images/book-gray.png';
import gearGray from '../../resources/images/gear-gray.png';
import logo from '../../resources/images/logo.png';
import logoutIcon from '../../resources/images/logout-icon.png';
import LeftTabItem from './LeftTabItem';
import { getUser } from '../../service/DataService';
import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../context/UserContext'

function LeftTabFragment({ onLogout }) {
    const [userData, setUserData] = useState(null);
    const { userId } = useContext(UserContext);

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
                        <LeftTabItem src={homeGray} alt="Home Icon" text="Home" />
                        <LeftTabItem src={ConvertTextBlue} alt="Convert Text Icon" text="Convert Text" />
                        <LeftTabItem src={MicroGray} alt="Voice Cloning Icon" text="Voice Cloning" />
                        <LeftTabItem src={CartGray} alt="Buy Package Icon" text="Buy Package" />
                        <LeftTabItem src={bookGray} alt="User Guide Icon" text="User Guide" />
                    </div>
                </div>
                <div className="section">
                    <p className="section-header">SETTING</p>
                    <div className="section-items">
                        <LeftTabItem src={gearGray} alt="Settings Icon" text="Settings" />
                        <div onClick={onLogout}>
                            <LeftTabItem src={logoutIcon} alt="Log Out Icon" text="Log Out" />
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
