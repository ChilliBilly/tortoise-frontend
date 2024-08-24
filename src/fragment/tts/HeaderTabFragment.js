function HeaderTabFragment({ title, subtitle }) {
    return (
        <div style={{ marginLeft: '60px', height: '130px', display: 'flex', flexDirection: 'column', justifyContent: 'center', userSelect: 'none' }}>
            <p style={{ fontWeight: 'bold', fontSize: '28px', margin: '0', lineHeight: '40px', userSelect: 'none' }}>{title}</p>
            <p style={{ fontWeight: 'lighter', margin: '0', lineHeight: '40px', color: '#757575', userSelect: 'none' }}>{subtitle}</p>
        </div>
    )
}

export default HeaderTabFragment