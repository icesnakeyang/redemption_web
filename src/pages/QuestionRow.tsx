import {Form, Input, Radio} from "antd";
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {saveSurveysEdit} from "../store/surveySlice";

const {TextArea} = Input;

const QuestionRow = (data: any) => {
    const {item} = data
    const surveysEdit = useSelector((state: any) => state.surveySlice.surveysEdit)
    const surveysLib = useSelector((state: any) => state.surveySlice.surveysLib)
    const dispatch = useDispatch()
    const [answer, setAnswer] = useState(true)
    const [textAnswer, setTextAnswer] = useState('')

    const onChangeAnswer = (answer: any) => {
        let ques: any = [];
        console.log(surveysEdit)
        if (surveysEdit && surveysEdit.length > 0) {
            surveysEdit.map((q: any) => {
                console.log(q.questionId)
                console.log(item.questionId)
                let row = {
                    answer: q.answer,
                    questionId: q.questionId
                }
                if (q.questionId === item.questionId) {
                    row.answer = answer
                }
                ques.push(row);
            });
        }
        console.log(ques)
        // dispatch(saveSurveys(ques));
        dispatch(saveSurveysEdit(ques))
    }

    return (
        <div style={{marginTop: 20}}>
            <div>
                {item.qtitle}
            </div>
            <div>
                {item.qcontent}
            </div>
            <div style={{}}>
                {item.answerType === 'BOOLEAN' ?
                    <Radio.Group onChange={(e) => {
                        console.log(e.target.value)
                        setAnswer(e.target.value)
                        onChangeAnswer(e.target.value)
                        // dispatch(saveQuestion1(e.target.value))
                    }} value={answer}>
                        <Radio value={true}>Yes</Radio>
                        <Radio value={false}>No</Radio>
                    </Radio.Group>
                    :
                    item.answerType === 'TEXT' ?
                        <Form>
                            <Form.Item>
                                <TextArea
                                    showCount
                                    maxLength={256}
                                    style={{height: 120, resize: 'none'}}
                                    onChange={(e) => {
                                        onChangeAnswer(e.target.value)
                                        setTextAnswer(e.target.value)
                                        // dispatch(saveQuestion3(e.target.value))
                                    }}
                                    value={textAnswer}
                                />
                            </Form.Item>
                        </Form> : null}
            </div>
        </div>
    )
}
export default QuestionRow
