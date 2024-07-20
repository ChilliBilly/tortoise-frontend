import './TextToSpeechPage.css';
import HeaderTabComponent from '../component/tts/HeaderTabComponent';
import InputTabComponent from '../component/tts/InputTabComponent';
import LeftTabComponent from '../component/tts/LeftTabComponent';

function TextToSpeechPage() {
    return (
        <div className="flex-container" style={{ display: 'flex', height: '100vh', width: '100vw' }}>
            <div style={{ borderRight: '1px solid #eeeeee', flex: '0 0 auto', width: '250px' }}>
                <LeftTabComponent />
            </div>
            <div className="flex-column" style={{ height: '100%', width: '100%', position: 'relative' }}>
                <div style={{ margin: '0', padding: '0', height: '11%', minHeight: '120px' }}>
                    <HeaderTabComponent
                     title="Speech Synthesis" 
                     subtitle="Use our smart text to speech tool to generate realistic, captivating speech in Vietnamese"/>
                </div>
                <div style={{ margin: '0', padding: '0', height: '89%', width: '100%', overflowY: 'hidden' }}>
                    <InputTabComponent />
                </div>
            </div>
        </div>
    );
}

export default TextToSpeechPage