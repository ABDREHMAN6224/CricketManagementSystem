import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { customFetch } from "../customeFetch";

const initialState= {
        allLocations: [],
        filteredLocations: [],
        currentLocation: {},
        isError: false,
        isLoading: false,
        errorMessage: ""
    }
export const getAllLocations = createAsyncThunk("location/getAllLocations", async (data, thunkAPI) => {
    try {
        const response = await customFetch.get("location/");
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue({ error: error.message })
    }
})
export const createLocation = createAsyncThunk("location/createLocation", async (data, thunkAPI) => {
    try {
        const response = await customFetch.post("location/", data,{
            headers: {
                Authorization: `Bearer ${thunkAPI.getState().auth.user?.token}`,
            },
        });
        thunkAPI.dispatch(getAllLocations());
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue({ error: error.message })
    }
})
export const updateLocation = createAsyncThunk("location/updateLocation", async (data, thunkAPI) => {
    try {
        const response = await customFetch.put(`location/${data.locationId}`, data,{
            headers: {
                Authorization: `Bearer ${thunkAPI.getState().auth.user?.token}`,
            },
        });
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue({ error: error.message })
    }
})
export const deleteLocation = createAsyncThunk("location/deleteLocation", async (data, thunkAPI) => {
    try {
        const response = await customFetch.delete(`location/${data}`,{
            headers: {
                Authorization: `Bearer ${thunkAPI.getState().auth.user?.token}`,
            },
        });
        thunkAPI.dispatch(getAllLocations());
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue({ error: error.message })
    }
})
const locationSlice = createSlice({
    name: "location",
    initialState,
    reducers: {
        setAllLocations: (state, action) => {
            state.allLocations = action.payload;
            state.filteredLocations = action.payload;
        },
        setCurrentLocation: (state, action) => {
            state.currentLocation = action.payload;
        },
        setFilteredLocations: (state, action) => {
            state.filteredLocations = action.payload;
        },
        setError: (state, action) => {
            state.isError = action.payload.isError;
            state.errorMessage = action.payload.errorMessage;
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
    },
    extraReducers:(builder)=>{
        builder.addCase(getAllLocations.pending,(state,action)=>{
            state.isLoading=true;
        })
        builder.addCase(getAllLocations.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.allLocations=action.payload;
            state.filteredLocations=action.payload;
        })
        builder.addCase(getAllLocations.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.errorMessage=action.payload.error;
        })
        builder.addCase(createLocation.pending,(state,action)=>{
            state.isLoading=true;
        })
        builder.addCase(createLocation.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.allLocations=action.payload;
            state.filteredLocations=action.payload;
        })
        builder.addCase(createLocation.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.errorMessage=action.payload.error;
        })
        builder.addCase(updateLocation.pending,(state,action)=>{
            state.isLoading=true;
        })
        builder.addCase(updateLocation.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.allLocations=action.payload;
            state.filteredLocations=action.payload;
        })
        builder.addCase(updateLocation.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.errorMessage=action.payload.error;
        })
        builder.addCase(deleteLocation.pending,(state,action)=>{
            state.isLoading=true;
        })
        builder.addCase(deleteLocation.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.allLocations=action.payload;
            state.filteredLocations=action.payload;
        })
        builder.addCase(deleteLocation.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.errorMessage=action.payload.error;
        })
    }
})
export const { setAllLocations, setCurrentLocation, setFilteredLocations, setError, setLoading } = locationSlice.actions;
export default locationSlice.reducer;