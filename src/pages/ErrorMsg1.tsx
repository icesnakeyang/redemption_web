import {CloseCircleOutlined} from "@ant-design/icons";
import React from "react";

const ErrorMsg1 = (data: any) => {
    const {errMessage} = data
    return (<div>
        <div style={{marginTop: 0}}>
            <CloseCircleOutlined
                style={{fontSize: 12, color: 'red'}}/>
            <span
                style={{marginLeft: 5, color: 'red', fontSize: 12}}>{errMessage}</span>
        </div>
    </div>)
}
export default ErrorMsg1
