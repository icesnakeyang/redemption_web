import {Card, Form, Input, Radio, Select} from "antd";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {apiListSurveyLib} from "../api/Api";
import {clearSurvey, saveSurveysEdit, saveSurveysLib} from "../store/surveySlice";
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
                    console.log(item)
                    if (item.answerType === 'TEXT') {
                        let r = {
                            questionId: item.questionId,
                            answer: '',
                            answerType: item.answerType
                        }
                        arr.push(r)
                    } else {
                        let r = {
                            questionId: item.questionId,
                            answer: true,
                            answerType: item.answerType
                        }
                        arr.push(r)
                    }
                })
                dispatch(saveSurveysEdit(arr))
            } else {
                dispatch(clearSurvey())
            }
        }).catch(() => {
            dispatch(clearSurvey())
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
