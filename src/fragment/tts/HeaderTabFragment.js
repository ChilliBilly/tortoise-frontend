function HeaderTabFragment({title, subtitle}) {
    return (
        <div style={{ marginLeft: '60px', height: '130px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <p style={{ fontWeight: 'bold', fontSize: '28px', margin: '0', lineHeight: '40px' }}>{title}</p>
            <p style={{ fontWeight: 'lighter', margin: '0', lineHeight: '40px', color: '#757575' }}>{subtitle}</p>
        </div>
    )
}

export default HeaderTabFragment