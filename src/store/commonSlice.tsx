import {createSlice} from "@reduxjs/toolkit";

export const commonSlice = createSlice({
        name: "commonSlice",
        initialState: {
            freshCount: 0,
        },
        reducers: {
            doFresh: (state: any) => {
                state.freshCount += 1;
            },
            clearFresh: (state: any) => {
                state.freshCount = 0
            }
        },
    })
;

export const {doFresh, clearFresh} = commonSlice.actions;
export default commonSlice.reducer;
