import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
    score: number[] | any;
}

const initialState: InitialState = {
    score: []
}

const scoreSlice = createSlice({
    name: 'scores',
    initialState,
    reducers: {
        pushScore: (state, action: PayloadAction<number[]>) => {
            state.score[action.payload[0]] = action.payload[1];
        }
    }
});

export const { pushScore } = scoreSlice.actions;
export default scoreSlice.reducer;