import {Button, Card, Checkbox, Col, Form, Input, message, Row, Select} from "antd";
import {useTranslation} from "react-i18next";
import React, {useEffect, useState} from "react";
import {apiSaveUser, apiGetPhoneVerifyCode, apiVerifySMSCode, apiTest1} from '../api/Api'
import {CheckCircleFilled, CloseCircleOutlined} from '@ant-design/icons';
import ErrorMsg1 from "./ErrorMsg1";

const {Option} = Select;
let timer: any = null;

const Form1 = () => {
    const {t} = useTranslation();
    const [icNumber1, setIcNumber1] = useState('')
    const [icNumber2, setIcNumber2] = useState('')
    const [icNumber3, setIcNumber3] = useState('')
    const [icNumberErr, setIcNumberErr] = useState(false)
    const [phoneF1, setPhoneF1] = useState('010')
    const [phoneF2, setPhoneF2] = useState('')
    const [phoneErr, setPhoneErr] = useState(false)
    const [address, setAdress] = useState('')
    const [postcode, setPostcode] = useState('')
    const [email, setEmail] = useState('')
    const [userName, setUserName] = useState('')
    const [userNameErr, setUserNameErr] = useState(false)
    const [smsCode, setSMSCode] = useState('')
    const [smsBox, setSMSBox] = useState(false)
    const [smsTime, setSMSTime] = useState(10)
    const [errName, setErrName] = useState(false)
    const [errIc, setErrIc] = useState(false)
    const [errPhone, setErrPhone] = useState(false)
    const [errAddress, setErrAddress] = useState(false)
    const [errPostcode, setErrPostcode] = useState(false)
    const [errEmail, setErrEmail] = useState(false)
    const [sendSMSButtonStatus, setSendSMSButtonStatus] = useState('CAN_SEND')
    const [SMSStatus, setSMSStatus] = useState('SEND_OK')
    const [saving, setSaving] = useState(false)
    const [agree1, setAgree1] = useState(false)

    useEffect(() => {
        timer && clearInterval(timer)
        return () => {
            timer && clearInterval(timer)
        };
    }, []);

    useEffect(() => {
        if (SMSStatus === 'SUCCESS') {
            return
        }
        if (smsTime === 10) {
            timer = setInterval(() =>
                setSMSTime(item => --item), 1000)
        } else {
            if (smsTime === 0) {
                clearInterval(timer)
                setSendSMSButtonStatus('CAN_SEND')
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

    const onPhone2 = (e: any) => {
        console.log(phoneF1)
        const code = e.target.value
        if (phoneF1 === '011') {
        } else {
            if (code.length > 7) {
                return
            }
        }
        const reg = /^([0]|[1-9][0-9]*)$/
        if (reg.test(code) || code === '') {
            setPhoneF2(code)
        }
    }

    const onSMSCode = (e: any) => {
        const code = e.target.value
        const reg = /^([0]|[1-9][0-9]*)$/
        if (reg.test(code) || code === '') {
            setSMSCode(code)
        }
    }

    const onSendSms = () => {
        if (!phoneF2 || !phoneF1) {
            message.error("Please input phone number")
            return
        }
        if (phoneF2.length < 8) {
            message.error("Please send a validate phone number")
            return
        }
        let params = {
            phone: phoneF1 + phoneF2
        }
        setSendSMSButtonStatus('SENDING')
        apiGetPhoneVerifyCode(params).then((res: any) => {
            if (res.code === 0) {
                message.success('send verify code success')
                setSendSMSButtonStatus('COUNTING')
                setSMSStatus('SEND_OK')
            } else {
                message.error(t('syserr.' + res.code))
                setSendSMSButtonStatus('CAN_SEND')
                setSMSStatus('SEND_FAIL')
            }
        }).catch(() => {
            message.error(t('syserr.10001'))
            setSendSMSButtonStatus('CAN_SEND')
            setSMSStatus('SEND_FAIL')
        })
    }

    const onVerifySMSCode = () => {
        if (!smsCode) {
            message.error("Please input verify code")
            return
        }
        let params = {
            phone: phoneF1 + phoneF2,
            code: smsCode
        }
        setSMSStatus('VERIFYING')
        apiVerifySMSCode(params).then((res: any) => {
            if (res.code === 0) {
                message.success('verify success')
                setSMSStatus('VERIFY_OK')
            } else {
                message.error(t('syserr.' + res.code))
                setSMSStatus('VERIFY_FAIL')
            }
        }).catch(() => {
            message.error(t('syserr.10001'))
            setSMSStatus('VERIFY_FAIL')
        })
    }

    const onConfirm = () => {
        if (!userName) {
            message.error(t('form1.tipErrNoUsername'))
            console.log(userNameErr)
            setUserNameErr(true)
            console.log(userNameErr)
            return
        } else {
            setUserNameErr(false)
        }
        if (!icNumber2 || !icNumber1 || !icNumber3) {
            setIcNumberErr(true)
            message.error(t('form1.tipErrNoIcNumber'))
            return;
        } else {
            setIcNumberErr(false)
        }
        if (SMSStatus !== 'VERIFY_OK') {
            setPhoneErr(true)
            message.error(t('form1.tipErrPhoneVerify'))
            return;
        }
        if (!agree1) {
            message.error("You must agree the understood agreement")
            return
        }


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
                               onBlur={() => {
                                   if (!userName) {
                                       setUserNameErr(true)
                                   } else {
                                       setUserNameErr(false)
                                   }
                               }}
                        />
                        {userNameErr ? <ErrorMsg1 errMessage={t('form1.tipErrNoUsername')}/> :
                            null}
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
                        {icNumberErr ?
                            <ErrorMsg1 errMessage={t('form1.tipErrNoIcNumber')}/> : null}
                    </Form.Item>

                    {/*phone*/}
                    <Form.Item>
                        <div>
                            <Select
                                bordered={false}
                                defaultValue="010"
                                style={{width: 90, background: '#fafafa'}}
                                onChange={(e) => {
                                    console.log(e)
                                    setPhoneF2('')
                                    setPhoneF1(e)
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
                            <Input style={{marginLeft: 5, width: 100, borderWidth: 0, borderBottomWidth: 1}}
                                   onChange={(e) => onPhone2(e)}
                                   placeholder="xxxxxxxx"
                                   maxLength={8}
                                   value={phoneF2}/>

                            {SMSStatus === 'VERIFY_OK' ?
                                <CheckCircleFilled
                                    style={{color: 'green', fontSize: '20px', marginLeft: 10}}/> :
                                sendSMSButtonStatus === 'CAN_SEND' ?
                                    <Button type="primary" style={{background: "#0553d3"}}
                                            onClick={() => {
                                                onSendSms()
                                            }}>Send code</Button> :
                                    sendSMSButtonStatus === 'SENDING' ?
                                        <Button disabled>Sending...</Button> :
                                        sendSMSButtonStatus === 'COUNTING' ?
                                            <Button disabled>{smsTime}...</Button> :
                                            null
                            }
                        </div>
                        <div>
                            {
                                SMSStatus === 'SEND_OK' ?
                                    <div style={{display: 'flex', marginTop: 10}}>
                                        <Input
                                            style={{width: 80}}
                                            placeholder="Input verify code"
                                            maxLength={6}
                                            value={smsCode}
                                            onChange={(e) => onSMSCode(e)}/>
                                        <Button type="primary"
                                                style={{background: "#0553d3"}} onClick={() => {
                                            onVerifySMSCode()
                                        }
                                        }>Verify</Button>
                                    </div>
                                    :
                                    SMSStatus === 'VERIFYING' ?
                                        <div style={{
                                            display: 'flex',
                                            marginTop: 10
                                        }}>
                                            <Input style={{width: 100}} placeholder="Verify code"/>
                                            <Button type="default" loading>Verifying</Button>
                                        </div>
                                        :
                                        SMSStatus === 'VERIFY_FAIL' ?
                                            <div style={{}}>
                                                <div style={{display: 'flex', marginTop: 10}}>
                                                    <Input
                                                        style={{width: 100}}
                                                        placeholder="Verify code"
                                                        maxLength={6}
                                                        value={smsCode}
                                                        onChange={(e) => onSMSCode(e)}/>
                                                    <Button type="primary"
                                                            style={{background: "#0553d3"}}
                                                            onClick={onVerifySMSCode}>Verify</Button>
                                                </div>
                                                <ErrorMsg1 errMessage="Verify code error"/>
                                            </div>

                                            :
                                            null
                            }
                        </div>
                        {phoneErr ? <ErrorMsg1 errMessage={t('form1.tipErrPhoneVerify')}/> : null}
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
                            setAgree1(!agree1)
                        }} checked={agree1}>
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
                    {saving ?
                        <Button style={{background: '#0553d3'}} shape="round" size="large" block type="primary"
                                loading>Saving</Button>
                        : <Button shape="round" size="large" block
                                  style={{background: '#0553d3'}}
                                  onClick={() => {
                                      onConfirm()
                                  }}
                                  type="primary">{t('form1.btConfirm')}</Button>}
                </div>
            </Card>

            <Card>
                <Button type='primary' onClick={onTest}>test</Button>
            </Card>
        </div>
    )
}
export default Form1
