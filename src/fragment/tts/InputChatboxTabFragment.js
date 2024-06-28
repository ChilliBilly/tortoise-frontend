import './InputChatboxTabFragment.css';
import image from '../../resources/images/images.png'

function InputChatboxTabFragment() {
    return (
        <div style={{ height: '100%', borderTop: '1px solid #dddddd', borderBottom: '1px solid #dddddd', position: 'relative' }}>
            <div style={{ padding: '5px 0px', borderBottom: '1px solid #dddddd' }}>
                <h3 style={{ margin: '0px 30px' }}>Text to speech</h3>
            </div>

            <div style={{ padding: ' 10px 15px', border: '1px solid #bbbbbb', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '20px', position: 'absolute', bottom: '20px', left: '30px', gap: '10px' }}>
                <img src={image} style={{ width: '20px', height: '20px' }} alt="Description" />
                <p style={{ lineHeight: '20px', margin: '0px', fontWeight: 'bold' }}>HN - Ngọc Huyền</p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '20px', position: 'absolute', bottom: '20px', right: '30px', gap: '15px' }}>
                <p style={{ margin: '0px' }}>0/500</p>
                <div style={{ padding: '10px 15px', border: '1px solid #bbbbbb', borderRadius: '20px', backgroundColor: '#367AFF' }}>
                    <p style={{ lineHeight: '20px', margin: '0px', fontWeight: 'bold', fontSize: '17px', color: 'white' }}>Generate Speech</p>
                </div>
            </div>
        </div>
    )
}

export default InputChatboxTabFragment