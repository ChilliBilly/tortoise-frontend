import { faUndoAlt } from '@fortawesome/free-solid-svg-icons'
import { faRedoAlt } from '@fortawesome/free-solid-svg-icons'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { faDownload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function SoundDisplayTabFragment() {
    return (
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <div style={{ width: '80px', height: '80px', backgroundColor: '#444444', borderRadius: '80px', cursor: 'pointer', position: 'absolute', top: 'calc(100% - 50% - 40px)', left: '30px' }}>
                <div style={{ width: 0, height: 0, borderLeft: '20px solid transparent', borderRight: '20px solid transparent', borderBottom: '34.64px solid white', top: '21.68px', left: '24px', position: 'absolute', transform: 'rotate(90deg)' }}>
                </div>
            </div>
            <p style={{ fontWeight: 'bold', margin: '0px', padding: '0px', position: 'absolute', top: 'calc(100% - 50% - 40px)', left: '150px' }}>premade/Alice, 6/23/24, 01:18</p>
            <div style={{ display: 'flex', width: 'calc(100% - 150px - 30px)', justifyContent: 'space-between', position: 'absolute', top: 'calc(100% - 50% - 40px + 55px)', left: '150px', alignItems: 'center' }}>
                <FontAwesomeIcon icon={faUndoAlt}></FontAwesomeIcon>
                <FontAwesomeIcon icon={faRedoAlt}></FontAwesomeIcon>
                <div style={{ width: 'calc(100% - 250px)', height: '22px', position: 'relative', display: 'flex', alignItems: 'center' }}>
                    <div style={{ margin: '0', padding: '0', width: '100%', backgroundColor: '#eeeeee', height: '14px', borderRadius: '14px', position: 'relative' }}></div>
                    <div style={{ margin: '0', padding: '0', width: '8px', height: '22px', backgroundColor: '#555555', borderRadius: '8px', position: 'absolute', top: '0px' }}></div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                    <p style={{ margin: '0', padding: '0' }}>0:00</p>
                    <p style={{ margin: '0', padding: '0' }}>/</p>
                    <p style={{ margin: '0', padding: '0' }}>0:12</p>
                </div>
                <FontAwesomeIcon icon={faDownload}></FontAwesomeIcon>
                <FontAwesomeIcon icon={faAngleDown}></FontAwesomeIcon>
            </div>
        </div >
    )
}

export default SoundDisplayTabFragment