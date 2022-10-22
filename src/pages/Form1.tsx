import {Button, Card, Checkbox, Col, Form, Input, message, Row, Select} from "antd";
import {useTranslation} from "react-i18next";
import React, {useEffect, useState} from "react";
import {apiSaveUser, apiGetPhoneVerifyCode, apiVerifySMSCode, apiTest1} from '../api/Api'
import Icon, {CheckCircleFilled} from '@ant-design/icons';

const {Option} = Select;
let timer: any = null;

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
    const [userName, setUserName] = useState('')
    const [smsCode, setSMSCode] = useState('')
    const [smsBox, setSMSBox] = useState(false)
    const [smsSending1, setSMSSending1] = useState(false)
    const [smsSending2, setSMSSending2] = useState(false)
    const [smsTime, setSMSTime] = useState(10)
    const [smsStatus, setSmsStatus] = useState(false)
    const [errName, setErrName] = useState(false)
    const [errIc, setErrIc] = useState(false)
    const [errPhone, setErrPhone] = useState(false)
    const [errAddress, setErrAddress] = useState(false)
    const [errPostcode, setErrPostcode] = useState(false)
    const [errEmail, setErrEmail] = useState(false)
    const [sendSMSStatus, setSendSMSStatus] = useState('CAN_SEND')
    const [verifyStatus, setVerifyStatus] = useState('HIDE')

    useEffect(() => {
        timer && clearInterval(timer)
        return () => {
            timer && clearInterval(timer)
        };
    }, []);

    useEffect(() => {
        if (sendSMSStatus === 'SUCCESS') {
            return
        }
        if (smsTime === 10) {
            timer = setInterval(() =>
                setSMSTime(item => --item), 1000)
        } else {
            if (smsTime === 0) {
                clearInterval(timer)
                setSendSMSStatus('CAN_SEND')
                setSMSSending2(false)
            }
        }
    }, [smsTime])

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

    const onSendSms = () => {
        let params = {
            phone: phoneF2
        }
        setSendSMSStatus('SENDING')
        setTimeout(() => {
            setSendSMSStatus('COUNTING')
            setVerifyStatus('CAN_VERIFY')
        }, 1000)
        apiGetPhoneVerifyCode(params).then((res: any) => {
            if (res.code === 0) {
                message.success('send verify code success')
            } else {
                message.error(t('syserr.' + res.code))

            }
        }).catch(() => {
            message.error(t('syserr.10001'))

        })
    }

    const onVerifySMSCode = () => {
        let params = {
            phone: phoneF2,
            code: smsCode
        }
        setTimeout(() => {
            setSendSMSStatus('SUCCESS')
            setVerifyStatus('HIDE')
        }, 1000)
        // apiVerifySMSCode(params).then((res: any) => {
        //     if (res.code === 0) {
        //         message.success('verify success')
        //         setSmsStatus(true)
        //     } else {
        //         message.error(t('syserr.' + res.code))
        //     }
        // }).catch(() => {
        //     message.error(t('syserr.10001'))
        // })
    }

    const onConfirm = () => {
        let params = {
            userName,
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
        apiSaveUser(params).then((res: any) => {
            if (res.code === 0) {
                message.success(t('form1.tipSaveSuccess'));
            } else {
                message.error(t('syserr.' + res.code))
            }
        }).catch(() => {
            message.error(t('syserr.10001'))
        })
    }

    const onTest = () => {
        apiTest1().then((res: any) => {
            console.log(res)
        })
    }

    return (<div style={{background: '#f5f4f8', padding: 20}}>
            <div style={{display: "flex", justifyContent: 'center'}}>{t('common.tip1')}</div>
            <Card style={{background: '#fefefe', borderWidth: 1, borderColor: '#e6e7eb', borderRadius: 5}}>
                <Form>
                    {/*name*/}
                    <Form.Item>
                        <div>{t('form1.name')}</div>
                        <Input style={{borderWidth: 0, borderBottomWidth: 1}}
                               onChange={e => setUserName(e.target.value)}
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
                                            <Option value="014">014</Option>
                                            <Option value="015">015</Option>
                                            <Option value="016">016</Option>
                                            <Option value="017">017</Option>
                                            <Option value="018">018</Option>
                                            <Option value="019">019</Option>
                                        </Select>
                                    </Col>
                                    <Col style={{marginLeft: 5}}>
                                        <Input style={{width: 105, borderWidth: 0, borderBottomWidth: 1}}
                                               onChange={(e) => setPhoneF2(e.target.value)}
                                               placeholder="xxxxxxxx"
                                               maxLength={8}
                                               value={phoneF2}/>
                                    </Col>
                                    <Col>
                                        {sendSMSStatus === 'SUCCESS' ?
                                            <CheckCircleFilled
                                                style={{color: 'green', fontSize: '20px', marginLeft: 10}}/> :
                                            sendSMSStatus === 'CAN_SEND' ?
                                                <Button type="primary" style={{background: "#0553d3"}}
                                                        onClick={() => {
                                                            onSendSms()
                                                        }}>Send code</Button> :
                                                sendSMSStatus === 'SENDING' ?
                                                    <Button disabled>Sending...</Button> :
                                                    sendSMSStatus === 'COUNTING' ?
                                                        <Button disabled>{smsTime}...</Button> :
                                                        null
                                        }
                                    </Col>
                                    {
                                        verifyStatus === 'HIDE' ?
                                            null :
                                            verifyStatus === 'CAN_VERIFY' ?
                                                <Col>
                                                    <div style={{marginLeft: 10, display: 'flex', marginTop: 10}}>
                                                        <Input placeholder="Input verify code"
                                                               onChange={(e) => setSMSCode(e.target.value)}/>
                                                        <Button type="primary"
                                                                style={{background: "#0553d3"}} onClick={() => {
                                                            onVerifySMSCode()
                                                        }
                                                        }>Verify</Button>
                                                    </div>
                                                </Col> : null
                                    }
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
                                <Input style={{width: 100, borderWidth: 0, borderBottomWidth: 1}}
                                       placeholder="xxxxxx"
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

            <Card>
                <Button type='primary' onClick={onTest}>test</Button>
            </Card>
        </div>
    )
}
export default Form1
