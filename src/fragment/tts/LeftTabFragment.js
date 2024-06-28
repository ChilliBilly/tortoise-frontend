import { faFileAlt } from '@fortawesome/free-solid-svg-icons'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { faFileAudio } from '@fortawesome/free-solid-svg-icons'
import { faAudioDescription } from '@fortawesome/free-solid-svg-icons'
import { faCartPlus } from '@fortawesome/free-solid-svg-icons'
import { faBookBookmark } from '@fortawesome/free-solid-svg-icons'
import { faGear } from '@fortawesome/free-solid-svg-icons'
import { faQuestion } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './LeftTabFragment.css'; // Import your CSS file for styles
import personPortrait from '../../resources/images/person-portrait.jpg'


function LeftTabFragment() {
    return (
        <div style={{ padding: '0px 0px 30px 0px', margin: '0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%', height: '100%' }}>
            <div className="custom-list-container">
                <h1 className="custom-list-header" style={{ margin: '20px 20px', boxSizing: 'border-box', display: 'inline-block' }}>Name</h1>
                <ul className="custom-ul" style={{ margin: '0px 10px', padding: 0, display: 'flex', flexDirection: 'column', alignItems: 'start', gap: '30px' }}>
                    <li className="custom-list-item" style={{ margin: '0px 10px', padding: 0, display: 'flex', alignItems: 'center', gap: '30px' }}>
                        <FontAwesomeIcon icon={faHome} color='gray' width={30}></FontAwesomeIcon>
                        <a>Home</a>
                    </li>
                    <li className="custom-list-item" style={{ margin: '0px 10px', padding: 0, display: 'flex', alignItems: 'center', gap: '30px' }}>
                        <FontAwesomeIcon icon={faFileAudio} color='gray' width={30}></FontAwesomeIcon>
                        <a>Convert Text</a>
                    </li>
                    <li className="custom-list-item" style={{ margin: '0px 10px', padding: 0, display: 'flex', alignItems: 'center', gap: '30px' }}>
                        <FontAwesomeIcon icon={faAudioDescription} color='gray' width={30}></FontAwesomeIcon>
                        <a>Voice Cloning</a>
                    </li>
                    <li className="custom-list-item" style={{ margin: '0px 10px', padding: 0, display: 'flex', alignItems: 'center', gap: '30px' }}>
                        <FontAwesomeIcon icon={faCartPlus} color='gray' width={30}></FontAwesomeIcon>
                        <a>Buy Package</a>
                    </li>
                    <li className="custom-list-item" style={{ margin: '0px 10px', padding: 0, display: 'flex', alignItems: 'center', gap: '30px' }}>
                        <FontAwesomeIcon icon={faBookBookmark} color='gray' width={30}></FontAwesomeIcon>
                        <a>User Guide</a>
                    </li>
                    <li className="custom-list-item" style={{ margin: '0px 10px', padding: 0, display: 'flex', alignItems: 'center', gap: '30px' }}>
                        <FontAwesomeIcon icon={faGear} color='gray' width={30}></FontAwesomeIcon>
                        <a>Settings</a>
                    </li>
                </ul>
            </div>
            <div style={{ margin: '0', padding: '0px 20px', display: 'flex', flexDirection: 'column', gap: '29px', width: '100%' }}>
                <div style={{ margin: '0 10px', padding: '0', display: 'flex', flexDirection: 'row', gap: '20px', alignItems: 'center' }}>
                    <FontAwesomeIcon icon={faFileAlt} color='gray' width={30}></FontAwesomeIcon>
                    <p style={{ margin: '0px 20px', padding: '0' }}>Docs and Resources</p>
                </div>
                <div style={{ margin: '0 10px', padding: '0', display: 'flex', flexDirection: 'row', gap: '20px', alignItems: 'center' }}>
                    <FontAwesomeIcon icon={faQuestion} color='gray' width={30}></FontAwesomeIcon>
                    <p style={{ margin: '0px 20px', padding: '0' }}>FAQs</p>
                </div>
                <div style={{ margin: '0', padding: '0', display: 'flex', flexDirection: 'row', width: '100%', gap: '30px' }}>
                    <div className="image-content">
                        <img src={personPortrait} alt="Description" />
                    </div>
                    <div style={{ margin: '0', padding: '0', display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
                        <p style={{ margin: '0', padding: '0' }}>Basic Account</p>
                        <p style={{ margin: '0', padding: '0', fontWeight: 'bold' }}>John Smith</p>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default LeftTabFragment