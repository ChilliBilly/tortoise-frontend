import './LeftTabFragment.css'; // Import your CSS file for styles
import personPortrait from '../../resources/images/person-portrait.jpg'
import homeGray from '../../resources/images/home-gray.png'
import ConvertTextBlue from '../../resources/images/convert-text-blue.png'
import MicroGray from '../../resources/images/micro-gray.png'
import CartGray from '../../resources/images/cart-gray.png'
import bookGray from '../../resources/images/book-gray.png'
import gearGray from '../../resources/images/gear-gray.png'
import fileGray from '../../resources/images/file-gray.png'
import questionMarkGray from '../../resources/images/questionmark-gray.png'
import logo from '../../resources/images/logo.png'

function LeftTabFragment() {
    return (
        <div style={{ margin: '0', padding: '15px 30px 30px 30px', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '20px' }}>

            {/* TOP PART */}
            <div style={{ margin: '0', padding: '0', width: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ margin: '0', padding: '0', display: 'flex', flexDirection: 'row', gap: '20px', alignItems: 'center', marginLeft: '-10px' }}>
                    <img src={logo} style={{ width: '60px', height: '60px' }} alt="Description" />
                    <p style={{ margin: '0', padding: '0', fontSize: '25px' }}>ChilliBilly</p>
                </div>
                <div style={{ margin: '0', padding: '0', width: '100%' }}>
                    <p style={{ color: '#757575', fontSize: '11px', margin: '0', padding: '0', fontWeight: 'bold' }}>MAIN</p>
                    <div style={{ margin: '0', padding: '0', width: '100%', display: 'flex', flexDirection: 'column', paddingTop: '10px', gap: '15px' }}>
                        <div style={{ margin: '0', padding: '0', width: '100%', display: 'flex', flexDirection: 'row', gap: '15px', height: '30px', alignItems: 'center' }}>
                            <img src={homeGray} style={{ width: '15px', height: '15px' }} alt="Description" />
                            <p style={{ color: '#757575', fontSize: '14px', margin: '0', padding: '0' }}>Home</p>
                        </div>
                        <div style={{ margin: '0', padding: '0', width: '100%', display: 'flex', flexDirection: 'row', gap: '15px', height: '30px', alignItems: 'center' }}>
                            <img src={ConvertTextBlue} style={{ width: '15px', height: '15px' }} alt="Description" />
                            <p style={{ color: '#367AFF', fontSize: '14px', margin: '0', padding: '0' }}>Convert Text</p>
                        </div>
                        <div style={{ margin: '0', padding: '0', width: '100%', display: 'flex', flexDirection: 'row', gap: '15px', height: '30px', alignItems: 'center' }}>
                            <img src={MicroGray} style={{ width: '15px', height: '15px' }} alt="Description" />
                            <p style={{ color: '#757575', fontSize: '14px', margin: '0', padding: '0' }}>Voice Cloning</p>
                        </div>
                        <div style={{ margin: '0', padding: '0', width: '100%', display: 'flex', flexDirection: 'row', gap: '15px', height: '30px', alignItems: 'center' }}>
                            <img src={CartGray} style={{ width: '15px', height: '15px' }} alt="Description" />
                            <p style={{ color: '#757575', fontSize: '14px', margin: '0', padding: '0' }}>Buy Package</p>
                        </div>
                        <div style={{ margin: '0', padding: '0', width: '100%', display: 'flex', flexDirection: 'row', gap: '15px', height: '30px', alignItems: 'center' }}>
                            <img src={bookGray} style={{ width: '15px', height: '15px' }} alt="Description" />
                            <p style={{ color: '#757575', fontSize: '14px', margin: '0', padding: '0' }}>User Guide</p>
                        </div>
                    </div>
                </div>
                <div style={{ margin: '0', padding: '0', width: '100%' }}>
                    <p style={{ color: '#757575', fontSize: '11px', margin: '0', padding: '0', fontWeight: 'bold' }}>SETTING</p>
                    <div style={{ margin: '0', padding: '0', width: '100%', display: 'flex', flexDirection: 'column', paddingTop: '10px', gap: '15px' }}>
                        <div style={{ margin: '0', padding: '0', width: '100%', display: 'flex', flexDirection: 'row', gap: '15px', height: '30px', alignItems: 'center' }}>
                            <img src={gearGray} style={{ width: '15px', height: '15px' }} alt="Description" />
                            <p style={{ color: '#757575', fontSize: '14px', margin: '0', padding: '0' }}>Settings</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* BOTTOM PART */}
            <div style={{ margin: '0', padding: '0', width: '100%', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div style={{ margin: '0', padding: '0', display: 'flex', flexDirection: 'row', gap: '15px', alignItems: 'center' }}>
                    <div style={{ width: '30px', height: '15px', display: 'flex', justifyContent: 'center' }}>
                        <img src={fileGray} style={{ width: '15px', height: '15px' }} alt="Description" />
                    </div>
                    <p style={{ margin: '0px', padding: '0' }}>Docs and Resources</p>
                </div>
                <div style={{ margin: '0', padding: '0', display: 'flex', flexDirection: 'row', gap: '15px', alignItems: 'center' }}>
                    <div style={{ width: '30px', height: '15px', display: 'flex', justifyContent: 'center' }}>
                        <img src={questionMarkGray} style={{ width: '15px', height: '15px' }} alt="Description" />
                    </div>
                    <p style={{ margin: '0px', padding: '0' }}>FAQs</p>
                </div>
                <div style={{ margin: '0', padding: '0', display: 'flex', flexDirection: 'row', width: '100%', gap: '15px', alignItems: 'center' }}>
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