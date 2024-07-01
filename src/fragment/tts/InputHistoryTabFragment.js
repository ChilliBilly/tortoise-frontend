import './InputHistoryTabFragment.css';
import playButtonLightGray from '../../resources/images/playbutton-light-gray.png'
import downloadButtonGray from '../../resources/images/download-gray.png'
function InputHistoryTabFragment() {
    return (
        <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column', paddingBottom: '30px' }}>
            <div style={{ padding: '5px 0px', marginLeft: '30px', display: 'flex', flexDirection: 'row', gap: '40px', justifyContent: 'left', height: '30px', paddingRight: '30px' }}>
                <p style={{ color: '#367AFF', fontSize: '14px', margin: '0', padding: '0' }}>History</p>
                <p style={{ color: '#757575', fontSize: '14px', margin: '0', padding: '0' }}>All History</p>
            </div>

            <div style={{ margin: '0', padding: '0', paddingRight: '25px', paddingLeft: '30px', paddingTop: '10px', width: '100%', height: '100%', overflowY: 'auto' }}>

                {/* LIST */}
                <div class="minimalist-scrollbar" style={{ margin: '0', padding: '0', width: '100%', height: '100%' }}>
                    {/* ITEM */}
                    <div style={{ margin: '0', padding: '0', display: 'flex', flexDirection: 'row', width: '100%', height: '60px', alignItems: 'center', borderBottom: '1px solid #eeeeee', position: 'relative' }}>
                        <p style={{ color: '#757575', fontSize: '14px', margin: '0', padding: '0', width: '100%' }}>6-23-2024 01:18 Text to speech 1 [some first text here for display]</p>
                        <div style={{ margin: '0', padding: '0px 0px 0px 30px', display: 'flex', flexDirection: 'row', position: 'absolute', gap: '10px', right: '0', marginRight: '5px', backgroundColor: 'rgba(255, 255, 255, 1)' }}>
                            <p style={{ color: '#757575', fontSize: '14px', margin: '0', padding: '0' }}>0:12</p>
                            <img src={playButtonLightGray} style={{ width: '20px', height: '20px' }} alt="Description" />
                            <img src={downloadButtonGray} style={{ width: '20px', height: '20px' }} alt="Description" />
                        </div>
                    </div>
                    <div style={{ margin: '0', padding: '0', display: 'flex', flexDirection: 'row', width: '100%', height: '60px', alignItems: 'center', borderBottom: '1px solid #eeeeee', position: 'relative' }}>
                        <p style={{ color: '#757575', fontSize: '14px', margin: '0', padding: '0', width: '100%' }}>6-23-2024 01:18 Text to speech 1 [some first text here for display]</p>
                        <div style={{ margin: '0', padding: '0px 0px 0px 30px', display: 'flex', flexDirection: 'row', position: 'absolute', gap: '10px', right: '0', marginRight: '5px', backgroundColor: 'rgba(255, 255, 255, 1)' }}>
                            <p style={{ color: '#757575', fontSize: '14px', margin: '0', padding: '0' }}>0:12</p>
                            <img src={playButtonLightGray} style={{ width: '20px', height: '20px' }} alt="Description" />
                            <img src={downloadButtonGray} style={{ width: '20px', height: '20px' }} alt="Description" />
                        </div>
                    </div>
                    <div style={{ margin: '0', padding: '0', display: 'flex', flexDirection: 'row', width: '100%', height: '60px', alignItems: 'center', borderBottom: '1px solid #eeeeee', position: 'relative' }}>
                        <p style={{ color: '#757575', fontSize: '14px', margin: '0', padding: '0', width: '100%' }}>6-23-2024 01:18 Text to speech 1 [some first text here for display]</p>
                        <div style={{ margin: '0', padding: '0px 0px 0px 30px', display: 'flex', flexDirection: 'row', position: 'absolute', gap: '10px', right: '0', marginRight: '5px', backgroundColor: 'rgba(255, 255, 255, 1)' }}>
                            <p style={{ color: '#757575', fontSize: '14px', margin: '0', padding: '0' }}>0:12</p>
                            <img src={playButtonLightGray} style={{ width: '20px', height: '20px' }} alt="Description" />
                            <img src={downloadButtonGray} style={{ width: '20px', height: '20px' }} alt="Description" />
                        </div>
                    </div>
                    <div style={{ margin: '0', padding: '0', display: 'flex', flexDirection: 'row', width: '100%', height: '60px', alignItems: 'center', borderBottom: '1px solid #eeeeee', position: 'relative' }}>
                        <p style={{ color: '#757575', fontSize: '14px', margin: '0', padding: '0', width: '100%' }}>6-23-2024 01:18 Text to speech 1 [some first text here for display]</p>
                        <div style={{ margin: '0', padding: '0px 0px 0px 30px', display: 'flex', flexDirection: 'row', position: 'absolute', gap: '10px', right: '0', marginRight: '5px', backgroundColor: 'rgba(255, 255, 255, 1)' }}>
                            <p style={{ color: '#757575', fontSize: '14px', margin: '0', padding: '0' }}>0:12</p>
                            <img src={playButtonLightGray} style={{ width: '20px', height: '20px' }} alt="Description" />
                            <img src={downloadButtonGray} style={{ width: '20px', height: '20px' }} alt="Description" />
                        </div>
                    </div>
                    <div style={{ margin: '0', padding: '0', display: 'flex', flexDirection: 'row', width: '100%', height: '60px', alignItems: 'center', borderBottom: '1px solid #eeeeee', position: 'relative' }}>
                        <p style={{ color: '#757575', fontSize: '14px', margin: '0', padding: '0', width: '100%' }}>6-23-2024 01:18 Text to speech 1 [some first text here for display]</p>
                        <div style={{ margin: '0', padding: '0px 0px 0px 30px', display: 'flex', flexDirection: 'row', position: 'absolute', gap: '10px', right: '0', marginRight: '5px', backgroundColor: 'rgba(255, 255, 255, 1)' }}>
                            <p style={{ color: '#757575', fontSize: '14px', margin: '0', padding: '0' }}>0:12</p>
                            <img src={playButtonLightGray} style={{ width: '20px', height: '20px' }} alt="Description" />
                            <img src={downloadButtonGray} style={{ width: '20px', height: '20px' }} alt="Description" />
                        </div>
                    </div>
                    <div style={{ margin: '0', padding: '0', display: 'flex', flexDirection: 'row', width: '100%', height: '60px', alignItems: 'center', borderBottom: '1px solid #eeeeee', position: 'relative' }}>
                        <p style={{ color: '#757575', fontSize: '14px', margin: '0', padding: '0', width: '100%' }}>6-23-2024 01:18 Text to speech 1 [some first text here for display]</p>
                        <div style={{ margin: '0', padding: '0px 0px 0px 30px', display: 'flex', flexDirection: 'row', position: 'absolute', gap: '10px', right: '0', marginRight: '5px', backgroundColor: 'rgba(255, 255, 255, 1)' }}>
                            <p style={{ color: '#757575', fontSize: '14px', margin: '0', padding: '0' }}>0:12</p>
                            <img src={playButtonLightGray} style={{ width: '20px', height: '20px' }} alt="Description" />
                            <img src={downloadButtonGray} style={{ width: '20px', height: '20px' }} alt="Description" />
                        </div>
                    </div>
                    <div style={{ margin: '0', padding: '0', display: 'flex', flexDirection: 'row', width: '100%', height: '60px', alignItems: 'center', borderBottom: '1px solid #eeeeee', position: 'relative' }}>
                        <p style={{ color: '#757575', fontSize: '14px', margin: '0', padding: '0', width: '100%' }}>6-23-2024 01:18 Text to speech 1 [some first text here for display]</p>
                        <div style={{ margin: '0', padding: '0px 0px 0px 30px', display: 'flex', flexDirection: 'row', position: 'absolute', gap: '10px', right: '0', marginRight: '5px', backgroundColor: 'rgba(255, 255, 255, 1)' }}>
                            <p style={{ color: '#757575', fontSize: '14px', margin: '0', padding: '0' }}>0:12</p>
                            <img src={playButtonLightGray} style={{ width: '20px', height: '20px' }} alt="Description" />
                            <img src={downloadButtonGray} style={{ width: '20px', height: '20px' }} alt="Description" />
                        </div>
                    </div>
                    <div style={{ margin: '0', padding: '0', display: 'flex', flexDirection: 'row', width: '100%', height: '60px', alignItems: 'center', borderBottom: '1px solid #eeeeee', position: 'relative' }}>
                        <p style={{ color: '#757575', fontSize: '14px', margin: '0', padding: '0', width: '100%' }}>6-23-2024 01:18 Text to speech 1 [some first text here for display]</p>
                        <div style={{ margin: '0', padding: '0px 0px 0px 30px', display: 'flex', flexDirection: 'row', position: 'absolute', gap: '10px', right: '0', marginRight: '5px', backgroundColor: 'rgba(255, 255, 255, 1)' }}>
                            <p style={{ color: '#757575', fontSize: '14px', margin: '0', padding: '0' }}>0:12</p>
                            <img src={playButtonLightGray} style={{ width: '20px', height: '20px' }} alt="Description" />
                            <img src={downloadButtonGray} style={{ width: '20px', height: '20px' }} alt="Description" />
                        </div>
                    </div>
                    <div style={{ margin: '0', padding: '0', display: 'flex', flexDirection: 'row', width: '100%', height: '60px', alignItems: 'center', borderBottom: '1px solid #eeeeee', position: 'relative' }}>
                        <p style={{ color: '#757575', fontSize: '14px', margin: '0', padding: '0', width: '100%' }}>6-23-2024 01:18 Text to speech 1 [some first text here for display]</p>
                        <div style={{ margin: '0', padding: '0px 0px 0px 30px', display: 'flex', flexDirection: 'row', position: 'absolute', gap: '10px', right: '0', marginRight: '5px', backgroundColor: 'rgba(255, 255, 255, 1)' }}>
                            <p style={{ color: '#757575', fontSize: '14px', margin: '0', padding: '0' }}>0:12</p>
                            <img src={playButtonLightGray} style={{ width: '20px', height: '20px' }} alt="Description" />
                            <img src={downloadButtonGray} style={{ width: '20px', height: '20px' }} alt="Description" />
                        </div>
                    </div>
                    <div style={{ margin: '0', padding: '0', display: 'flex', flexDirection: 'row', width: '100%', height: '60px', alignItems: 'center', borderBottom: '1px solid #eeeeee', position: 'relative' }}>
                        <p style={{ color: '#757575', fontSize: '14px', margin: '0', padding: '0', width: '100%' }}>6-23-2024 01:18 Text to speech 1 [some first text here for display]</p>
                        <div style={{ margin: '0', padding: '0px 0px 0px 30px', display: 'flex', flexDirection: 'row', position: 'absolute', gap: '10px', right: '0', marginRight: '5px', backgroundColor: 'rgba(255, 255, 255, 1)' }}>
                            <p style={{ color: '#757575', fontSize: '14px', margin: '0', padding: '0' }}>0:12</p>
                            <img src={playButtonLightGray} style={{ width: '20px', height: '20px' }} alt="Description" />
                            <img src={downloadButtonGray} style={{ width: '20px', height: '20px' }} alt="Description" />
                        </div>
                    </div>
                    <div style={{ margin: '0', padding: '0', display: 'flex', flexDirection: 'row', width: '100%', height: '60px', alignItems: 'center', borderBottom: '1px solid #eeeeee', position: 'relative' }}>
                        <p style={{ color: '#757575', fontSize: '14px', margin: '0', padding: '0', width: '100%' }}>6-23-2024 01:18 Text to speech 1 [some first text here for display]</p>
                        <div style={{ margin: '0', padding: '0px 0px 0px 30px', display: 'flex', flexDirection: 'row', position: 'absolute', gap: '10px', right: '0', marginRight: '5px', backgroundColor: 'rgba(255, 255, 255, 1)' }}>
                            <p style={{ color: '#757575', fontSize: '14px', margin: '0', padding: '0' }}>0:12</p>
                            <img src={playButtonLightGray} style={{ width: '20px', height: '20px' }} alt="Description" />
                            <img src={downloadButtonGray} style={{ width: '20px', height: '20px' }} alt="Description" />
                        </div>
                    </div>
                    <div style={{ margin: '0', padding: '0', display: 'flex', flexDirection: 'row', width: '100%', height: '60px', alignItems: 'center', borderBottom: '1px solid #eeeeee', position: 'relative' }}>
                        <p style={{ color: '#757575', fontSize: '14px', margin: '0', padding: '0', width: '100%' }}>6-23-2024 01:18 Text to speech 1 [some first text here for display]</p>
                        <div style={{ margin: '0', padding: '0px 0px 0px 30px', display: 'flex', flexDirection: 'row', position: 'absolute', gap: '10px', right: '0', marginRight: '5px', backgroundColor: 'rgba(255, 255, 255, 1)' }}>
                            <p style={{ color: '#757575', fontSize: '14px', margin: '0', padding: '0' }}>0:12</p>
                            <img src={playButtonLightGray} style={{ width: '20px', height: '20px' }} alt="Description" />
                            <img src={downloadButtonGray} style={{ width: '20px', height: '20px' }} alt="Description" />
                        </div>
                    </div>
                    <div style={{ margin: '0', padding: '0', display: 'flex', flexDirection: 'row', width: '100%', height: '60px', alignItems: 'center', borderBottom: '1px solid #eeeeee', position: 'relative' }}>
                        <p style={{ color: '#757575', fontSize: '14px', margin: '0', padding: '0', width: '100%' }}>6-23-2024 01:18 Text to speech 1 [some first text here for display]</p>
                        <div style={{ margin: '0', padding: '0px 0px 0px 30px', display: 'flex', flexDirection: 'row', position: 'absolute', gap: '10px', right: '0', marginRight: '5px', backgroundColor: 'rgba(255, 255, 255, 1)' }}>
                            <p style={{ color: '#757575', fontSize: '14px', margin: '0', padding: '0' }}>0:12</p>
                            <img src={playButtonLightGray} style={{ width: '20px', height: '20px' }} alt="Description" />
                            <img src={downloadButtonGray} style={{ width: '20px', height: '20px' }} alt="Description" />
                        </div>
                    </div>
                    <div style={{ margin: '0', padding: '0', display: 'flex', flexDirection: 'row', width: '100%', height: '60px', alignItems: 'center', borderBottom: '1px solid #eeeeee', position: 'relative' }}>
                        <p style={{ color: '#757575', fontSize: '14px', margin: '0', padding: '0', width: '100%' }}>6-23-2024 01:18 Text to speech 1 [some first text here for display]</p>
                        <div style={{ margin: '0', padding: '0px 0px 0px 30px', display: 'flex', flexDirection: 'row', position: 'absolute', gap: '10px', right: '0', marginRight: '5px', backgroundColor: 'rgba(255, 255, 255, 1)' }}>
                            <p style={{ color: '#757575', fontSize: '14px', margin: '0', padding: '0' }}>0:12</p>
                            <img src={playButtonLightGray} style={{ width: '20px', height: '20px' }} alt="Description" />
                            <img src={downloadButtonGray} style={{ width: '20px', height: '20px' }} alt="Description" />
                        </div>
                    </div>
                    <div style={{ margin: '0', padding: '0', display: 'flex', flexDirection: 'row', width: '100%', height: '60px', alignItems: 'center', borderBottom: '1px solid #eeeeee', position: 'relative' }}>
                        <p style={{ color: '#757575', fontSize: '14px', margin: '0', padding: '0', width: '100%' }}>6-23-2024 01:18 Text to speech 1 [some first text here for display]</p>
                        <div style={{ margin: '0', padding: '0px 0px 0px 30px', display: 'flex', flexDirection: 'row', position: 'absolute', gap: '10px', right: '0', marginRight: '5px', backgroundColor: 'rgba(255, 255, 255, 1)' }}>
                            <p style={{ color: '#757575', fontSize: '14px', margin: '0', padding: '0' }}>0:12</p>
                            <img src={playButtonLightGray} style={{ width: '20px', height: '20px' }} alt="Description" />
                            <img src={downloadButtonGray} style={{ width: '20px', height: '20px' }} alt="Description" />
                        </div>
                    </div>
                    <div style={{ margin: '0', padding: '0', display: 'flex', flexDirection: 'row', width: '100%', height: '60px', alignItems: 'center', borderBottom: '1px solid #eeeeee', position: 'relative' }}>
                        <p style={{ color: '#757575', fontSize: '14px', margin: '0', padding: '0', width: '100%' }}>6-23-2024 01:18 Text to speech 1 [some first text here for display]</p>
                        <div style={{ margin: '0', padding: '0px 0px 0px 30px', display: 'flex', flexDirection: 'row', position: 'absolute', gap: '10px', right: '0', marginRight: '5px', backgroundColor: 'rgba(255, 255, 255, 1)' }}>
                            <p style={{ color: '#757575', fontSize: '14px', margin: '0', padding: '0' }}>0:99</p>
                            <img src={playButtonLightGray} style={{ width: '20px', height: '20px' }} alt="Description" />
                            <img src={downloadButtonGray} style={{ width: '20px', height: '20px' }} alt="Description" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InputHistoryTabFragment