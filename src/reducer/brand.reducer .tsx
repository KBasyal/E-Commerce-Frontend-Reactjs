import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../config/axios.config";

// Async thunk to get brand details
export const getBrandDetail = createAsyncThunk(
    "brand/getBrandDetail",
    async (id, thunkAPI) => {
        try {
            const response:any = await axiosInstance.get("/brand/" + id, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('accessToken')
                }
            });
            return response.result;
        } catch (exception) {
            throw exception;
        }
    }
);

// Initial state
const initialState = {
    listAll: [],
    brandDetail: null
};

// Slice
const BrandSlice = createSlice({
    name: "brand",
    initialState,
    reducers: {
        helloWorld: (state, action) => {
            state.listAll = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getBrandDetail.fulfilled, (state, action) => {
            state.brandDetail = action.payload;
        });
        builder.addCase(getBrandDetail.rejected, (state, action) => {
            state.brandDetail = null;
        });
    }
});

export const { helloWorld } = BrandSlice.actions;
export default BrandSlice.reducer;
