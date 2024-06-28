import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputChatboxTabFragment from '../../fragment/tts/InputChatboxTabFragment';
import InputHistoryTabFragment from '../../fragment/tts/InputHistoryTabFragment';

function InputTabComponent() {
    return (
        <Container fluid style={{ height: '100%' }}>
            <Row style={{ height: '100%' }}>
                <Col style={{ padding: '0', height: '100%' }}>
                    <InputChatboxTabFragment />
                </Col>
                <Col style={{ padding: '0', height: '100%' }}>
                    <InputHistoryTabFragment />
                </Col>
            </Row>
        </Container>
    )
}

export default InputTabComponent