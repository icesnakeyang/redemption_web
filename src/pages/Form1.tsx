import {Button, Card, Checkbox, Col, Form, Input, Row, Select} from "antd";
import {useTranslation} from "react-i18next";
import {useState} from "react";

const {Option} = Select;

const Form1 = () => {
    const {t} = useTranslation();
    const [icNumber1, setIcNumber1] = useState('')
    const [icNumber2, setIcNumber2] = useState('')
    const [icNumber3, setIcNumber3] = useState('')
    const [phoneF1, setPhoneF1] = useState('010')
    const [phoneF2, setPhoneF2] = useState('')
    const [address, setAdress] = useState('')
    const [postcode, setPostcode] = useState('')
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')

    const onIcN1 = (e: any) => {
        const {value: inputValue} = e.target;
        const reg = /^([0]|[1-9][0-9]*)$/
        if (reg.test(inputValue) || inputValue === '') {
            setIcNumber1(inputValue)
        }
    };

    const onIcN2 = (e: any) => {
        const {value: inputValue} = e.target;
        const reg = /^([0]|[1-9][0-9]*)$/
        if (reg.test(inputValue) || inputValue === '') {
            setIcNumber2(inputValue)
        }
    };

    const onIcN3 = (e: any) => {
        const {value: inputValue} = e.target;
        const reg = /^([0]|[1-9][0-9]*)$/
        if (reg.test(inputValue) || inputValue === '') {
            setIcNumber3(inputValue)
        }
    };

    const onPostcode = (e: any) => {
        const code = e.target.value
        const reg = /^([0]|[1-9][0-9]*)$/
        if (reg.test(code) || code === '') {
            setPostcode(code)
        }
    }

    const onConfirm = () => {
        let params = {
            name,
            icNumber1,
            icNumber2,
            icNumber3,
            phoneF1,
            phoneF2,
            address,
            postcode,
            email
        }
        console.log(params)
    }

    return (<div style={{background: '#f5f4f8', padding: 20}}>
            <div style={{display: "flex", justifyContent: 'center'}}>{t('common.tip1')}</div>
            <Card style={{background: '#fefefe', borderWidth: 1, borderColor: '#e6e7eb', borderRadius: 5}}>
                <Form>
                    {/*name*/}
                    <Form.Item>
                        <div>{t('form1.name')}</div>
                        <Input style={{borderWidth: 0, borderBottomWidth: 1}}
                               onChange={e => setName(e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Row>
                            {/*IC Number*/}
                            <Col xs={24} sm={5} md={4} lg={4} xl={3} xxl={2}>
                                <div>
                                    {t('form1.icNumber')}
                                </div>
                            </Col>

                            <Col xs={24} sm={19} md={20} lg={20} xl={21} xxl={22}>
                                <Row>
                                    <Col>
                                        <div style={{display: 'flex', alignItems: 'center'}}>
                                            <div>
                                                {/*ic number 1*/}
                                                <Input
                                                    style={{width: 81, borderWidth: 0, borderBottomWidth: 1}}
                                                    onChange={(e) => onIcN1(e)}
                                                    placeholder="xxxxxx"
                                                    maxLength={6}
                                                    value={icNumber1}
                                                />
                                            </div>
                                            <div style={{marginLeft: 5}}>
                                                -
                                            </div>
                                            <div style={{marginLeft: 5}}>
                                                {/*ic number 2*/}
                                                <Input style={{width: 44, borderWidth: 0, borderBottomWidth: 1}}
                                                       onChange={(e) => onIcN2(e)}
                                                       placeholder="xx"
                                                       maxLength={2}
                                                       value={icNumber2}/>
                                            </div>
                                            <div style={{marginLeft: 5}}>
                                                -
                                            </div>
                                            <div style={{marginLeft: 5}}>
                                                {/*ic number 3*/}
                                                <Input style={{width: 62, borderWidth: 0, borderBottomWidth: 1}}
                                                       onChange={(e) => onIcN3(e)}
                                                       placeholder="xxxx"
                                                       maxLength={4}
                                                       value={icNumber3}/>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Form.Item>

                    {/*phone*/}
                    <Form.Item>
                        <Row>
                            <Col xs={24} sm={5} md={4} lg={4} xl={3} xxl={2}>
                                <div>{t('form1.phone')}</div>
                            </Col>
                            <Col xs={24} sm={19} md={20} lg={20} xl={21} xxl={22}>
                                <Row>
                                    <Col>
                                        <Select
                                            bordered={false}
                                            defaultValue="010"
                                            style={{width: 90, background: '#fafafa'}}
                                            onChange={() => {

                                            }}>
                                            <Option value="010">010</Option>
                                            <Option value="011">011</Option>
                                            <Option value="012">012</Option>
                                            <Option value="013">013</Option>
                                            <Option value="013">014</Option>
                                            <Option value="013">015</Option>
                                            <Option value="013">016</Option>
                                            <Option value="013">017</Option>
                                            <Option value="013">018</Option>
                                            <Option value="013">019</Option>
                                        </Select>
                                    </Col>
                                    <Col style={{marginLeft: 5}}>
                                        <Input style={{width: 105, borderWidth: 0, borderBottomWidth: 1}}
                                               onChange={(e) => setPhoneF2(e.target.value)}
                                               placeholder="xxxxxxxx"
                                               maxLength={4}
                                               value={phoneF2}/>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Form.Item>

                    {/*address*/}
                    <Form.Item>
                        <Row>
                            <Col xs={24} sm={5} md={4} lg={4} xl={3} xxl={2}>
                                <div>{t('form1.address')}</div>
                            </Col>
                            <Col xs={24} sm={19} md={20} lg={20} xl={21} xxl={22}>
                                <Input.TextArea style={{borderWidth: 0, borderBottomWidth: 1}} rows={4}
                                                autoSize={{minRows: 1, maxRows: 5}}
                                                onChange={e => setAdress(e.target.value)}
                                />
                            </Col>
                        </Row>
                    </Form.Item>

                    {/*postcode*/}
                    <Form.Item>
                        <Row>
                            <Col xs={24} sm={5} md={4} lg={4} xl={3} xxl={2}>
                                <div>{t('form1.postCode')}</div>
                            </Col>
                            <Col xs={24} sm={19} md={20} lg={20} xl={21} xxl={22}>
                                <Input style={{width: 100, borderWidth: 0, borderBottomWidth: 1}} placeholder="xxxxxx"
                                       onChange={(e) => onPostcode(e)}
                                       maxLength={6}
                                       value={postcode}/>
                            </Col>
                        </Row>
                    </Form.Item>

                    {/*Email*/}
                    <Form.Item>
                        <Row>
                            <Col xs={24} sm={5} md={4} lg={4} xl={3} xxl={2}>
                                <div>{t('form1.email')}</div>
                            </Col>
                            <Col xs={24} sm={19} md={20} lg={20} xl={21} xxl={22}>
                                <Input style={{borderWidth: 0, borderBottomWidth: 1}}
                                       placeholder="name@email.com"
                                       onChange={e => setEmail(e.target.value)}
                                />
                            </Col>
                        </Row>
                    </Form.Item>
                    <Form.Item>
                        <Checkbox onChange={() => {
                        }}>
                            <div>By providing your information, you acknowledge that you have read, understood and
                                agreed to
                                our <a href="https://www.touchngo.com.my/policies/terms-conditions">Terms &
                                    Conditions</a> and <a
                                    href="https://www.touchngo.com.my/policies/privacy-policy">PDPA</a>.
                            </div>
                        </Checkbox>
                    </Form.Item>
                </Form>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <Button shape="round" size="large" block
                            style={{background: '#0553d3'}}
                            onClick={() => {
                                onConfirm()
                            }}
                            type="primary">{t('form1.btConfirm')}</Button></div>
            </Card>
        </div>
    )
}
export default Form1
