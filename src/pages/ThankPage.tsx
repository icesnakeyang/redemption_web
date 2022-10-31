const ThankPage = () => {
    return (<div style={{background: '#fff', height: '100vh', margin: 0, padding: 0}}>
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <img style={{marginTop: 100}} src='images.png' width="128"/>
        </div>
        <div style={{}}>
            <div style={{
                fontSize: 44,
                fontWeight: 'bold',
                color: '#ea264d',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                Thank you!
            </div>
            <div style={{
                fontSize: 32,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                paddingLeft: 40,
                marginTop: 20,
                color:'#332e2e'
            }}>
                for your participation in this study!
            </div>
            <div style={{
                fontSize: 24,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                paddingLeft: 40,
                paddingRight: 20,
                marginTop: 20,
                color:'#332e2e'

            }}>
                Our Specialist will get in touch with you for your redemption soon!
            </div>
        </div>
    </div>)
}
export default ThankPage
