import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { customFetch } from "../customeFetch";
const initialState={
    allCountries:[],
    isError:false,
    isLoading:false,
    errorMessage:"",    
}
export const getAllCountries=createAsyncThunk("country/getAllCountries",async(data,thunkAPI)=>{
    try{
        const response=await customFetch.get("country/all");
        return response.data;
    }catch(error){
        return thunkAPI.rejectWithValue({error:error.message})
    }
})
export const createCountry=createAsyncThunk("country/createCountry",async(data,thunkAPI)=>{
    try{
        const response=await customFetch.post("country/createCountry",data,{
            headers: {
                Authorization: `Bearer ${thunkAPI.getState().auth.user?.token}`,
            },
        });
        thunkAPI.dispatch(getAllCountries());
        return response.data;
    }catch(error){
        return thunkAPI.rejectWithValue({error:error.message})
    }
})
export const updateCountry=createAsyncThunk("country/updateCountry",async(data,thunkAPI)=>{
    try{
        const response=await customFetch.put(`country/${data.countryid}`,data,{
            headers: {
                Authorization: `Bearer ${thunkAPI.getState().auth.user?.token}`,
            },
        });
        return response.data;
    }catch(error){
        return thunkAPI.rejectWithValue({error:error.message})
    }
})
export const deleteCountry=createAsyncThunk("country/deleteCountry",async(data,thunkAPI)=>{
    try{
        const response=await customFetch.delete(`country/${data}`,{
            headers: {
                Authorization: `Bearer ${thunkAPI.getState().auth.user?.token}`,
            },
        
        });
        return response.data;
    }catch(error){
        return thunkAPI.rejectWithValue({error:error.message})
    }
})
const countrySlice = createSlice({
    name:"country",
    initialState,
    reducers:{
        updateCurrentCountry:(state,action)=>{
            const {countryid,country}=action.payload;
            state.allCountries=state.allCountries.map((c)=>{
                if(c.countryid===countryid){
                    return {...c,country}
                }
                else{
                    return country;
                }
            })

        },
        deleteCurrentCountry:(state,action)=>{
            const {countryid}=action.payload;
            state.allCountries=state.allCountries.filter((c)=>c.countryid!==countryid);
        }

    },
    extraReducers:(builder)=>{
        builder.addCase(getAllCountries.pending,(state,action)=>{
            state.isLoading=true;
        })
        builder.addCase(getAllCountries.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.allCountries=action.payload;
        })
        builder.addCase(getAllCountries.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.errorMessage=action.payload.error;
        })
        builder.addCase(createCountry.pending,(state,action)=>{
            state.isLoading=true;
        })
        builder.addCase(createCountry.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.allCountries.push(action.payload);
        })
        builder.addCase(createCountry.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.errorMessage=action.payload.error;
        })
        builder.addCase(updateCountry.pending,(state,action)=>{
            state.isLoading=true;
        })
        builder.addCase(updateCountry.fulfilled,(state,action)=>{
            state.isLoading=false;
        })
        builder.addCase(updateCountry.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.errorMessage=action.payload.error;
        })
        builder.addCase(deleteCountry.pending,(state,action)=>{
            state.isLoading=true;
        })
        builder.addCase(deleteCountry.fulfilled,(state,action)=>{
            state.isLoading=false;
        })
        builder.addCase(deleteCountry.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.errorMessage=action.payload.error;
        })
    }

});
export const {updateCurrentCountry,deleteCurrentCountry}=countrySlice.actions;
export default countrySlice.reducer;