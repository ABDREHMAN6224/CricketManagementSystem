import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { customFetch } from "../customeFetch";
const initialState = {
    allCoaches: [],
    currentCoach: {},
    filteredCoaches: [],
    isError: false,
    isLoading: false,
    errorMessage: "",
    filters: {
        search: "",
        team: "all"
    }
}
export const getAllCoaches = createAsyncThunk("coach/getAllCoaches", async (data, thunkAPI) => {
    try {
        const response = await customFetch.get("coach/all");
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue({ error: error.message })
    }
})
export const deleteCoach = createAsyncThunk("coach/deleteCoach", async (data, thunkAPI) => {
    try {
        const response = await customFetch.delete(`coach/coach/${data}`,{
            headers: {
                Authorization: `Bearer ${thunkAPI.getState().auth.user?.token}`,
            },
        });
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue({ error: error.message })
    }
})
export const updateCoach = createAsyncThunk("coach/updateCoach", async (data, thunkAPI) => {
    try {
        const response = await customFetch.put(`coach/coach/${data.coachid}`, data,{
            headers: {
                Authorization: `Bearer ${thunkAPI.getState().auth.user?.token}`,
            },
        });
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue({ error: error.message })
    }
})
export const createCoach = createAsyncThunk("coach/createCoach", async (data, thunkAPI) => {
    try {
        const response = await customFetch.post(`coach/coach`, data,{
            headers: {
                Authorization: `Bearer ${thunkAPI.getState().auth.user?.token}`,
            },
        });
        thunkAPI.dispatch(getAllCoaches());
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue({ error: error.message })
    }
})
const coachSlice = createSlice({
    name: "coach",
    initialState,
    reducers: {
        updateSearch: (state, action) => {
            state.filters.search = action.payload.toLowerCase();
        },
        updateTeam: (state, action) => {
            state.filters.team = action.payload;
        },
        resetFilters: (state, action) => {
            state.filters = {
                search: "",
                team: "all"
            }
        },
        updateFilteredCoaches: (state, action) => {
            let filteredCoaches = state.allCoaches;
            if (state.filters.search) {
                filteredCoaches = filteredCoaches.filter(coach => {
                    return coach.coachname.toLowerCase().startsWith(state.filters.search)
                })
            }
            if (state.filters.team !== "all") {
                filteredCoaches = filteredCoaches.filter(coach => {
                    return coach.teamname === state.filters.team
                })
            }
            state.filteredCoaches = filteredCoaches;
        },
        setCurrentCoach: (state, action) => {
            const coachid = action.payload;
            const currentCoach = state.allCoaches.find((coach) => coach.coachid == coachid);
            state.currentCoach = currentCoach;
        },
        deleteCurrentCoach: (state, action) => {
            const coachid = action.payload;
            const filteredCoaches = state.allCoaches.filter((coach) => coach.coachid != coachid);
            state.allCoaches = filteredCoaches;
            state.filteredCoaches = filteredCoaches;
        },
        updateCurrentCoach: (state, action) => {
            const {coachid,name,picture}=action.payload;
            state.allCoaches=state.allCoaches.map((coach)=>{
                if(coach.coachid==coachid){
                    coach.coachname=name;
                    coach.picture=picture;
                }
                return coach;
            })
            state.filteredCoaches=state.allCoaches
        }
        

    },
    extraReducers: (builder) => {
        builder.addCase(getAllCoaches.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(getAllCoaches.fulfilled, (state, action) => {
            state.isLoading = false;
            state.allCoaches = action.payload;
            state.filteredCoaches = action.payload;
        })
        builder.addCase(getAllCoaches.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.errorMessage = action.payload.error;
        })
        builder.addCase(deleteCoach.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(deleteCoach.fulfilled, (state, action) => {
            state.isLoading = false;
        })
        builder.addCase(deleteCoach.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.errorMessage = action.payload.error;
        })
        builder.addCase(updateCoach.fulfilled, (state, action) => {
            state.isLoading = false;
        })
        builder.addCase(updateCoach.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.errorMessage = action.payload.error;
        })
    }

})
export const { updateSearch, updateTeam, resetFilters,setCurrentCoach,deleteCurrentCoach,updateCurrentCoach, updateFilteredCoaches } = coachSlice.actions;
export default coachSlice.reducer;