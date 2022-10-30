import {Card, Form, Input, Radio, Select} from "antd";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {apiListSurveyLib} from "../api/Api";
import {saveSurveysEdit, saveSurveysLib} from "../store/surveySlice";
import QuestionRow from "./QuestionRow";

const QuestionBox = () => {
    const surveysLib = useSelector((state: any) => state.surveySlice.surveysLib)
    const dispatch = useDispatch()

    useEffect(() => {
        loadAllData()
    }, [])

    const loadAllData = () => {
        apiListSurveyLib().then((res: any) => {
            if (res.code === 0) {
                dispatch(saveSurveysLib(res.data.surveyList))
                let arr: any = []
                res.data.surveyList.map((item: any) => {
                    let r = {
                        questionId: item.questionId,
                        answer: true
                    }
                    arr.push(r)
                })
                dispatch(saveSurveysEdit(arr))
            }
        })
    }

    return (
        <div style={{marginTop: 20}}>
            <Card>
                {surveysLib && surveysLib.length > 0 ?
                    surveysLib.map((item: any, index: any) => (
                        <QuestionRow item={item} key={index}></QuestionRow>)) : null}
            </Card>
        </div>
    )
}
export default QuestionBox
