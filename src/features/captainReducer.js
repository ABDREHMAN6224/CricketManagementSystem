import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { customFetch } from "../customeFetch";

const initialState = {
    allCaptains: [],
    currentCaptain: {},
    filteredCaptains: [],
    isError: false,
    isLoading: false,
    captainLoading: false,
    filters: {
        search: "",
        matches: "all",
        stats: "all",
        team: "all",
        country: "all"
    },
    errorMessage: "",

}

export const getAllCaptains = createAsyncThunk("captain/getAllCaptains", async (data, thunkAPI) => {
    try {
        const response = await customFetch.get("captain/all");
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue({ error: error.message })
    }
})
export const createCaptain = createAsyncThunk("captain/createCaptain", async (data, thunkAPI) => {
    try {
        const response = await customFetch.post("captain/createCaptain", data,{
            headers: {
                Authorization: `Bearer ${thunkAPI.getState().auth.user?.token}`,
            },
        });
        thunkAPI.dispatch(getAllCaptains());
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue({ error: error.message })
    }
})
export const updateCaptain = createAsyncThunk("captain/updateCaptain", async (data, thunkAPI) => {
    try {
        const response = await customFetch.put(`captain/updateCaptain/${data.playerid}`, data,
        {
            headers: {
                Authorization: `Bearer ${thunkAPI.getState().auth.user?.token}`,
            },
        });
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue({ error: error.message })
    }
})
export const deleteCaptain = createAsyncThunk("captain/deleteCaptain", async (data, thunkAPI) => {
    try {
        const response = await customFetch.delete(`captain/captain/${data}`,{
            headers: {
                Authorization: `Bearer ${thunkAPI.getState().auth.user?.token}`,
            },
        });
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue({ error: error.message })
    }
})
export const getCaptainById = createAsyncThunk("captain/getCaptainById", async (data, thunkAPI) => {
    try {
        const response = await customFetch.get(`captain/captain/${data}`);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue({ error: error.message })
    }
})

const captainSlice = createSlice({
    name: "captain",
    initialState,
    reducers: {
        updateSearch: (state, action) => {
            state.filters.search = action.payload.toLowerCase();
        },
        updateMatches: (state, action) => {
            state.filters.matches = action.payload;
        },
        updateStats: (state, action) => {
            state.filters.stats = action.payload;
        },
        updateTeam: (state, action) => {
            state.filters.team = action.payload;
        },
        updateCountry: (state, action) => {
            state.filters.country = action.payload;
        },

        resetFilters: (state, action) => {
            state.filters = {
                search: "",
                matches: "all",
                stats: "all",
                team: "all",
                country: "all"
            }
        },
        updateFilteredCaptains: (state, action) => {
            let filteredCaptains = state.allCaptains;
            if (state.filters.search) {
                filteredCaptains = filteredCaptains.filter(captain => captain.playername.toLowerCase().startsWith(state.filters.search));
            }

            if (state.filters.matches == "nomatches-desc") {
                filteredCaptains = filteredCaptains.sort((a, b) => b.matchesascaptain - a.matchesascaptain);
            }
            if (state.filters.matches == "nomatches-asc") {
                filteredCaptains = filteredCaptains.sort((a, b) => a.matchesascaptain - b.matchesascaptain);
            }
            if (state.filters.stats == "wins-desc") {
                filteredCaptains = filteredCaptains.sort((a, b) => b.totalwins - a.totalwins);
            }
            if (state.filters.stats == "wins-asc") {
                filteredCaptains = filteredCaptains.sort((a, b) => a.totalwins - b.totalwins);
            }
            if (state.filters.stats == "losses-desc") {
                filteredCaptains = filteredCaptains.sort((a, b) => b.totallosses - a.totallosses);
            }
            if (state.filters.stats == "losses-asc") {
                filteredCaptains = filteredCaptains.sort((a, b) => a.totallosses - b.totallosses);
            }
            if (state.filters.stats == "ties-desc") {
                filteredCaptains = filteredCaptains.sort((a, b) => b.draws - a.draws);
            }
            if (state.filters.stats == "ties-asc") {
                filteredCaptains = filteredCaptains.sort((a, b) => a.draws - b.draws);
            }
            if (state.filters.team != "all") {
                filteredCaptains = filteredCaptains.filter(captain => captain.teamname == state.filters.team);
            }
            if (state.filters.country != "all") {
                filteredCaptains = filteredCaptains.filter(captain => captain.country?.toLowerCase() == state.filters.country.toLowerCase());
            }
            state.filteredCaptains = filteredCaptains;

        },
        removeCurrentCaptain: (state, action) => {
            state.currentCaptain = {};
        },
        deleteCurrentCaptain: (state, action) => {
            state.allCaptains = state.allCaptains.filter(captain => captain.playerid != action.payload);
        },
        setCaptainPicture: (state, action) => {
            const { playerid, picture } = action.payload;
            state.allCaptains = state.allCaptains.map(captain => {
                if (captain.playerid == playerid) {
                    captain.playerpicpath = picture;
                }
                return captain;
            })
            state.filteredCaptains=state.allCaptains;
        },
        updateCurrentCaptain: (state, action) => {
            const { playerid, playername, playerpicpath,matchesascaptain,totalwins } = action.payload;
            state.allCaptains = state.allCaptains.map(captain => {
                if (captain.playerid == playerid) {
                    captain.playername = playername;
                    captain.playerpicpath = playerpicpath;
                    captain.matchesascaptain=matchesascaptain;
                    captain.totalwins=totalwins;
                }
                return captain;
            })

            state.filteredCaptains=state.allCaptains;
        }

    },
    extraReducers: (builder) => {
        builder.addCase(getAllCaptains.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(getAllCaptains.fulfilled, (state, action) => {
            state.isLoading = false;
            state.allCaptains = action.payload;
            state.filteredCaptains = action.payload;
        })
        builder.addCase(getAllCaptains.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.errorMessage = action.payload.error;
        })
        builder.addCase(createCaptain.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(createCaptain.fulfilled, (state, action) => {
            state.isLoading = false;
            state.allCaptains = action.payload;
        })
        builder.addCase(createCaptain.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.errorMessage = action.payload.error;
        })
        builder.addCase(updateCaptain.fulfilled, (state, action) => {
            state.isLoading = false;
        })
        builder.addCase(updateCaptain.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.errorMessage = action.payload.error;
        })
        builder.addCase(deleteCaptain.fulfilled, (state, action) => {
            state.isLoading = false;
        })
        builder.addCase(deleteCaptain.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.errorMessage = action.payload.error;
        })
        builder.addCase(getCaptainById.pending, (state, action) => {
            state.captainLoading = true;
        })
        builder.addCase(getCaptainById.fulfilled, (state, action) => {
            state.captainLoading = false;
            state.currentCaptain = action.payload;
        })
        builder.addCase(getCaptainById.rejected, (state, action) => {
            state.captainLoading = false;
            state.isError = true;
            state.errorMessage = action.payload.error;
        })
    }

})

export const { updateSearch, updateMatches,updateCountry,removeCurrentCaptain,deleteCurrentCaptain,updateCurrentCaptain, updateStats, updateTeam, resetFilters, updateFilteredCaptains } = captainSlice.actions;
export default captainSlice.reducer;