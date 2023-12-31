import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { customFetch } from "../customeFetch";

const initialState = {
    allWicketKeepers: [],
    currentWicketKeeper: {},
    filteredWicketKeepers: [],
    isError: false,
    isLoading: false,
    errorMessage: "",
    filters: {
        search: "",
        team: "all",
        sort: "all",
        status: "all"
    }
}
export const getAllWicketKeepers = createAsyncThunk("wicketKeeper/getAllWicketKeepers", async (data, thunkAPI) => {
    try {
        const response = await customFetch.get("wicketkeeper/all");
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue({ error: error.message })
    }
})
export const createWicketKeeper = createAsyncThunk("wicketKeeper/createWicketKeeper", async (data, thunkAPI) => {
    try {
        const response = await customFetch.post("wicketkeeper/createKeeper", data,{
            headers: {
                Authorization: `Bearer ${thunkAPI.getState().auth.user?.token}`,
            },
        });
        thunkAPI.dispatch(getAllWicketKeepers());
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue({ error: error.message })
    }
}
)
export const updateWicketKeeper = createAsyncThunk("wicketKeeper/updateWicketKeeper", async (data, thunkAPI) => {
    try {
        const response = await customFetch.put(`wicketkeeper/update/${data.playerid}`, data,{
            headers: {
                Authorization: `Bearer ${thunkAPI.getState().auth.user?.token}`,
            },
        });
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue({ error: error.message })
    }
}
)
export const deleteWicketKeeper = createAsyncThunk("wicketKeeper/deleteWicketKeeper", async (data, thunkAPI) => {
    try {
        const response = await customFetch.delete(`wicketkeeper/keeper/${data}`,{
            headers: {
                Authorization: `Bearer ${thunkAPI.getState().auth.user?.token}`,
            },
        });
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue({ error: error.message })
    }
}
)
export const getWicketKeeperById = createAsyncThunk("wicketKeeper/getWicketKeeperById", async (data, thunkAPI) => {
    try {
        const response = await customFetch.get(`wicketkeeper/single/${data}`);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue({ error: error.message })
    }
}
)
const wicketKeeperSlice = createSlice({
    name: "wicketKeeper",
    initialState,
    reducers: {
        updateSearch: (state, action) => {
            state.filters.search = action.payload.toLowerCase();
        },
        updateTeam: (state, action) => {
            state.filters.team = action.payload;
        },
        updateSort: (state, action) => {
            state.filters.sort = action.payload;
        },
        updateStatus: (state, action) => {
            state.filters.status = action.payload;
        },
        resetFilters: (state, action) => {
            state.filters = {
                search: "",
                team: "all",
                sort: "all",
                status: "all"
            }
        },
        updateFilteredWicketKeepers: (state, action) => {
            let filteredWicketKeepers = state.allWicketKeepers;
            if (state.filters.search) {
                filteredWicketKeepers = filteredWicketKeepers.filter((wicketKeeper) => wicketKeeper.playername.toLowerCase().startsWith(state.filters.search));
            }
            if (state.filters.team !== "all") {
                filteredWicketKeepers = filteredWicketKeepers.filter((wicketKeeper) => wicketKeeper.teamname == state.filters.team);
            }
            if (state.filters.sort == "stumps-desc") {
                filteredWicketKeepers = filteredWicketKeepers.sort((a, b) => b.totalstumps - a.totalstumps);
            }
            if (state.filters.sort == "stumps-asc") {
                filteredWicketKeepers = filteredWicketKeepers.sort((a, b) => a.totalstumps - b.totalstumps);
            }
            if (state.filters.sort == "catches-desc") {
                filteredWicketKeepers = filteredWicketKeepers.sort((a, b) => b.totalcatches - a.totalcatches);
            }
            if (state.filters.sort == "catches-asc") {
                filteredWicketKeepers = filteredWicketKeepers.sort((a, b) => a.totalcatches - b.totalcatches);
            }
            if (state.filters.status !== "all") {
                filteredWicketKeepers = filteredWicketKeepers.filter((wicketKeeper) => wicketKeeper.playerstatus == state.filters.status);
            }
            state.filteredWicketKeepers = filteredWicketKeepers;
        },
        setCurrentWicketKeeper: (state, action) => {
            const playerid=action.payload;
            state.currentWicketKeeper = state.allWicketKeepers.find((wicketKeeper) => wicketKeeper.playerid == playerid);
        },
        deleteCurrentWicketKeeper: (state, action) => {
            const playerid=action.payload;
            state.currentWicketKeeper = {};
            state.allWicketKeepers = state.allWicketKeepers.filter((wicketKeeper) => wicketKeeper.playerid != playerid);
            state.filteredWicketKeepers=state.allWicketKeepers;
        },
        updateCurrentWicketKeeper: (state, action) => {
            const {playerid,catches,stumps,playername,playerpicpath}=action.payload;
            state.allWicketKeepers = state.allWicketKeepers.map((wicketKeeper) => {
                if (wicketKeeper.playerid == playerid) {
                    wicketKeeper.totalcatches = catches;
                    wicketKeeper.totalstumps = stumps;
                    wicketKeeper.playername=playername;
                    wicketKeeper.playerpicpath=playerpicpath;
                }
                return wicketKeeper;
            })
            state.filteredWicketKeepers=state.allWicketKeepers;
        }

    },
    extraReducers: (builder) => {
        builder.addCase(getAllWicketKeepers.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(getAllWicketKeepers.fulfilled, (state, action) => {
            state.isLoading = false;
            state.allWicketKeepers = action.payload;
            state.filteredWicketKeepers = action.payload;
        })
        builder.addCase(getAllWicketKeepers.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.errorMessage = action.payload.error;
        })
        builder.addCase(createWicketKeeper.pending, (state, action) => {
            state.isLoading = true;
        }
        )
        builder.addCase(createWicketKeeper.fulfilled, (state, action) => {
            state.isLoading = false;
        })
        builder.addCase(createWicketKeeper.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.errorMessage = action.payload.error;
        })
        builder.addCase(updateWicketKeeper.fulfilled, (state, action) => {
            state.isLoading = false;
        })
        builder.addCase(updateWicketKeeper.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.errorMessage = action.payload.error;
        })
        builder.addCase(deleteWicketKeeper.fulfilled, (state, action) => {
            state.isLoading = false;
        })
        builder.addCase(deleteWicketKeeper.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.errorMessage = action.payload.error;
        }
        )
        builder.addCase(getWicketKeeperById.pending, (state, action) => {
            state.isLoading = true;
        }
        )
        builder.addCase(getWicketKeeperById.fulfilled, (state, action) => {
            state.isLoading = false;
            state.currentWicketKeeper = action.payload;
        })
        builder.addCase(getWicketKeeperById.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.errorMessage = action.payload.error;
        }
        )

    }
})
export const { updateSearch, updateTeam, updateSort, updateStatus, resetFilters, updateFilteredWicketKeepers,setCurrentWicketKeeper,deleteCurrentWicketKeeper,updateCurrentWicketKeeper } = wicketKeeperSlice.actions;
export default wicketKeeperSlice.reducer;