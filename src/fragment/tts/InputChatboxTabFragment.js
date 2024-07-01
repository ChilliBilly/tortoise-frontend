import './InputChatboxTabFragment.css';
import image from '../../resources/images/images.png'
import { faUndoAlt } from '@fortawesome/free-solid-svg-icons'
import { faRedoAlt } from '@fortawesome/free-solid-svg-icons'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { faDownload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function InputChatboxTabFragment() {
    return (
        <div style={{ height: '100%', position: 'relative', width: '100%', display: 'flex', flexDirection: 'column', padding: '0', margin: '0' }}>
            <div style={{ padding: '5px 0px', marginLeft: '60px', display: 'flex', flexDirection: 'row', gap: '40px', justifyContent: 'left', height: '30px', paddingRight: '30px' }}>
                <p style={{ color: '#367AFF', fontSize: '14px', margin: '0', padding: '0' }}>Text to speech 1</p>
                <p style={{ color: '#757575', fontSize: '14px', margin: '0', padding: '0' }}>Text to speech 2</p>
                <p style={{ color: '#757575', fontSize: '14px', margin: '0', padding: '0' }}>Text to speech 3</p>
                <p style={{ color: '#757575', fontSize: '14px', margin: '0', padding: '0' }}>Text to speech 4</p>
                <p style={{ color: '#757575', fontSize: '14px', margin: '0', padding: '0' }}>+</p>
            </div>

            <div style={{ width: '100%', height: '100%', margin: '0', padding: '0', paddingTop: '10px', paddingRight: '30px' }}>
                <textarea placeholder='Enter your text here...' class="minimalist-scrollbar" style={{ margin: '0', padding: '0', width: '100%', height: 'calc(100% - 140px)', paddingLeft: '60px', borderWidth: '0', fontSize: '20px', outline: 'none', paddingBottom: '60px' }}></textarea>
            </div>

            <div style={{ padding: '0', margin: '0', paddingLeft: '60px', paddingRight: '30px', display: 'flex', flexDirection: 'column', width: '100%', position: 'absolute', bottom: '0', height: '160px', justifyContent: 'end', gap: '20px', backdropFilter: 'blur(10px)', backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
                <div style={{ width: '100%', padding: '0', margin: '0', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <div style={{ padding: '0', margin: '0', display: 'flex', flexDirection: 'row', gap: '20px' }}>
                        <img src={image} style={{ width: '20px', height: '20px' }} alt="Description" />
                        <p style={{ lineHeight: '20px', margin: '0px', fontWeight: 'bold' }}>HN - Ngọc Huyền</p>
                    </div>
                    <div style={{ padding: '0', margin: '0', display: 'flex', flexDirection: 'row', gap: '50px' }}>
                        <p style={{ color: '#757575', fontSize: '14px', margin: '0', padding: '0' }}>0/500</p>
                        <p style={{ color: '#367AFF', fontSize: '14px', margin: '0', padding: '0' }}>Generate Speech</p>
                    </div>
                </div>
                <div style={{ width: '100%', padding: '0', margin: '0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', justifyContent: 'end', height: '50px', marginBottom: '30px' }}>
                    <div style={{ width: '100%', padding: '0', margin: '0', display: 'flex', flexDirection: 'row', gap: '20px', alignItems: "end" }}>
                        <div style={{ width: 0, height: 0, borderLeft: '11px solid transparent', borderRight: '11px solid transparent', borderBottom: '19px solid black', transform: 'rotate(90deg)', marginBottom: '5px' }} />
                        <div style={{ width: '100%', padding: '0', margin: '0', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <p style={{ color: '#757575', fontSize: '14px', margin: '0', padding: '0', fontWeight: 'bold' }}>premade/Alice, 6/23/24, 01:18</p>
                            <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                                <FontAwesomeIcon icon={faUndoAlt}></FontAwesomeIcon>
                                <FontAwesomeIcon icon={faRedoAlt}></FontAwesomeIcon>
                                <div style={{ width: 'calc(100% - 250px)', height: '22px', position: 'relative', display: 'flex', alignItems: 'center' }}>
                                    <div style={{ margin: '0', padding: '0', width: '100%', backgroundColor: '#eeeeee', height: '9px', borderRadius: '9px', position: 'relative' }}></div>
                                    <div style={{ margin: '0', padding: '0', width: '5px', height: '15px', backgroundColor: '#555555', borderRadius: '5px', position: 'absolute', top: '4px' }}></div>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                                    <p style={{ margin: '0', padding: '0' }}>0:00</p>
                                    <p style={{ margin: '0', padding: '0' }}>/</p>
                                    <p style={{ margin: '0', padding: '0' }}>0:12</p>
                                </div>
                                <FontAwesomeIcon icon={faDownload}></FontAwesomeIcon>
                                <FontAwesomeIcon icon={faAngleDown}></FontAwesomeIcon>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default InputChatboxTabFragment