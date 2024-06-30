
import InputChatboxTabFragment from '../../fragment/tts/InputChatboxTabFragment';
import InputHistoryTabFragment from '../../fragment/tts/InputHistoryTabFragment';

function InputTabComponent() {
    return (
        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'row' }}>
            <div style={{ padding: '0', height: '100%', width: '70%' }}>
                <InputChatboxTabFragment />
            </div>
            <div style={{ padding: '0', height: '100%', width: '30%' }}>
                <InputHistoryTabFragment />
            </div>
        </div>
    )
}

export default InputTabComponent