import './TextToSpeechPage.css';
import HeaderTabComponent from '../component/tts/HeaderTabComponent';
import LeftTabComponent from '../component/tts/LeftTabComponent';
import AddVoiceComponent from '../component/clone/AddVoiceComponent';
import SoundDisplayTabComponent from '../component/tts/SoundDisplayTabComponent';

function VoiceCloningPage() {
    return (
        <div className="flex-container" style={{ display: 'flex', height: '100vh', width: '100vw' }}>
            <div style={{ borderRight: '1px solid #eeeeee', flex: '0 0 auto', width: '250px' }}>
                <LeftTabComponent />
            </div>
            <div className="flex-column" style={{ height: '100%', width: '100%', position: 'relative' }}>
                <div style={{ margin: '0', padding: '0', height: '11%', minHeight: '120px' }}>
                    <HeaderTabComponent 
                    title="Voice Cloning"
                    subtitle="Clone your own voice or import audio samples to create custom lifelike voices"/>
                </div>
                <div style={{ margin: '0', padding: '0', height: '89%', width: '100%', overflowY: 'hidden' }}>
                    <AddVoiceComponent />
                </div>
                {/* <div style={{ padding: '0', height: '100%', width: '70%' }}>
                    <SoundDisplayTabComponent />
                </div> */}
            </div>
        </div>
    );
}

export default VoiceCloningPage