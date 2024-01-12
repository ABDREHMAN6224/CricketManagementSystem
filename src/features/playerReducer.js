import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { customFetch } from "../customeFetch";

const initialState = {
    isError: false,
    isLoading: false,
    errorMessage: "",
    playerUpdate: false,
    playersWithNoTeams: [],
    allPlayers: [],
}
export const getAllPlayers = createAsyncThunk("player/getAllPlayers", async (data, thunkAPI) => {
    try {
        const response = await customFetch.get("player/all");
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue({ error: error.message })
    }
});
export const deletePlayer = createAsyncThunk("player/deletePlayer", async (data, thunkAPI) => {
    try {
        const response = await customFetch.post(`player/player/${data.playerid}`,data,{
            headers: {
                Authorization: `Bearer ${thunkAPI.getState().auth.user?.token}`,
            },
        });
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue({ error: error.message })
    }
});
export const addPlayer = createAsyncThunk("player/addPlayer", async (data, thunkAPI) => {
    try {
        const response = await customFetch.post("player/createPlayer", data,{
            headers: {
                Authorization: `Bearer ${thunkAPI.getState().auth.user?.token}`,
            },
        });
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue({ error: error.message })
    }
});
export const updateNumberOfMatches = createAsyncThunk("player/updateNumberOfMatches", async (data, thunkAPI) => {
    try {
        const response = await customFetch.put(`player/updateNoOfmatches/${data.id}`, data,{
            headers: {
                Authorization: `Bearer ${thunkAPI.getState().auth.user?.token}`,
            },
        });
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue({ error: error.message })
    }
});
export const updateStats = createAsyncThunk("player/updateStats", async (data, thunkAPI) => {
    try {
        const response = await customFetch.put(`player/updateStats/${data}`,{},{
            headers: {
                Authorization: `Bearer ${thunkAPI.getState().auth.user?.token}`,
            },
        });
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue({ error: error.message })
    }
});
export const updatePlayerPicture = createAsyncThunk("player/updatePlayerPicture", async (data, thunkAPI) => {
    try {
        const response = await customFetch.put(`player/updateProfile/${data.id}`, data,{
            headers: {
                Authorization: `Bearer ${thunkAPI.getState().auth.user?.token}`,
            },
        });
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue({ error: error.message })
    }
});
export const updatePlayerRank = createAsyncThunk("player/updatePlayerRank", async (data, thunkAPI) => {
    try {
        const response = await customFetch.put(`rank/updatePlayerRank/${data.id}`, data,{
            headers: {
                Authorization: `Bearer ${thunkAPI.getState().auth.user?.token}`,
            },
        });
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue({ error: error.message })
    }
});
export const getPlayersWithNoTeam = createAsyncThunk("player/getPlayersWithNoTeam", async (data, thunkAPI) => {
    try {
        const response = await customFetch.get("player/playerWithNoTeam");
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue({ error: error.message })
    }
});
export const addInnings = createAsyncThunk("player/addInnings", async (data, thunkAPI) => {
    try {
        const response = await customFetch.post(`scorecard/add/${data.match_id}/${data.player_id}`, data,{
            headers: {
                Authorization: `Bearer ${thunkAPI.getState().auth.user?.token}`,
            },
        });
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue({ error: error.message })
    }
});
const playerSlice = createSlice({
    name: "player",
    initialState,
    reducers:{
        removeError: (state, action) => {
            state.isError = false;
            state.errorMessage = "";
        }
    },
    extraReducers: (builder) => {
        builder.addCase(deletePlayer.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(deletePlayer.fulfilled, (state, action) => {
            state.isLoading = false;
        })
        builder.addCase(deletePlayer.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.errorMessage = action.payload.error;
        })
        builder.addCase(addPlayer.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(addPlayer.fulfilled, (state, action) => {
            state.isLoading = false;
        })
        builder.addCase(addPlayer.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.errorMessage = action.payload.error;
        })
        builder.addCase(updateNumberOfMatches.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(updateNumberOfMatches.fulfilled, (state, action) => {
            state.isLoading = false;
        })
        builder.addCase(updateNumberOfMatches.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.errorMessage = action.payload.error;
        })
        builder.addCase(updateStats.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(updateStats.fulfilled, (state, action) => {
            state.isLoading = false;
            state.playerUpdate = true;
        })
        builder.addCase(updateStats.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.errorMessage = action.payload.error;
            state.playerUpdate = false;
        })
        builder.addCase(updatePlayerPicture.fulfilled, (state, action) => {
            state.isLoading = false;
            state.playerUpdate = true;
        })
        builder.addCase(updatePlayerPicture.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.errorMessage = action.payload.error;
            state.playerUpdate = false;
        })
        builder.addCase(updatePlayerRank.fulfilled, (state, action) => {
            state.isLoading = false;
            state.playerUpdate = true;
        })
        builder.addCase(updatePlayerRank.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.errorMessage = action.payload.error;
            state.playerUpdate = false;
        })
        builder.addCase(getPlayersWithNoTeam.fulfilled, (state, action) => {
            state.isLoading = false;
            state.playersWithNoTeams = action.payload;
        })
        builder.addCase(getPlayersWithNoTeam.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.errorMessage = action.payload.error;
        })
        builder.addCase(getAllPlayers.fulfilled, (state, action) => {
            state.isLoading = false;
            state.allPlayers = action.payload;
        })  
        builder.addCase(getAllPlayers.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.errorMessage = action.payload.error;
        })

    }

})
export const {removeError} = playerSlice.actions;

export default playerSlice.reducer;