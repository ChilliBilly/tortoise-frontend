import './TextToSpeechPage.css';
import HeaderTabComponent from '../component/tts/HeaderTabComponent';
import InputTabComponent from '../component/tts/InputTabComponent';
import LeftTabComponent from '../component/tts/LeftTabComponent';
import SoundDisplayTabComponent from '../component/tts/SoundDisplayTabComponent';

function TextToSpeechPage() {
    return (
        <div className="flex-container">
            <div style={{ borderRight: '1px solid #dddddd' }}>
                <LeftTabComponent />
            </div>
            <div className="flex-column">
                <div style={{ margin: '0', padding: '0', height: '11%', minHeight: '120px' }}>
                    <HeaderTabComponent />
                </div>
                <div style={{ margin: '0', padding: '0', height: '70%' }}>
                    <InputTabComponent />
                </div>
                <div style={{ margin: '0', padding: '0', height: '19%' }}>
                    <SoundDisplayTabComponent />
                </div>
            </div>
        </div>
    );
}

export default TextToSpeechPage