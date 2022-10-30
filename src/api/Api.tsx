import {Get, Post} from "./ApiBase";

const host = "http://localhost:8004/redemption_api";
// const host = "http://181.215.246.126:8004/redemption_api";

export const apiSaveForm1 = (params: any) => {
    return Post(`${host}/form1/saveForm1`, params);
};

export const apiGetPhoneVerifyCode = (params: any) => {
    return Post(`${host}/sms/getPhoneVerifyCode`, params);
};

export const apiVerifySMSCode = (params: any) => {
    return Post(`${host}/sms/verifySMSCode`, params);
};

export const apiTest1 = () => {
    return Get(`${host}/form1/test1`);
};


export const apiListSurveyLib = () => {
    return Get(`${host}/form1/listSurveyLib`);
};
