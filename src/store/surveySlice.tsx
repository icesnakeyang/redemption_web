import {createSlice} from "@reduxjs/toolkit";

export const surveySlice = createSlice({
        name: "surveySlice",
        initialState: {
            surveysLib: [],
            surveysEdit: []
        },
        reducers: {
            saveSurveysLib: (state: any, action: any) => {
                state.surveysLib = action.payload
            },
            saveSurveysEdit: (state: any, action: any) => {
                state.surveysEdit = action.payload
            },
            clearSurvey: (state: any) => {
                state.surveysLib = []
                state.surveysEdit = []
            }
        },
    })
;

export const {saveSurveysLib, saveSurveysEdit, clearSurvey} = surveySlice.actions;
export default surveySlice.reducer;
