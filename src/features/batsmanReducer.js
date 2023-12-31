import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { customFetch } from "../customeFetch";
const initialState = {
    allBatsman: [],
    filteredBatsman: [],
    currentBatsman: {},
    isError: false,
    isLoading: false,
    errorMessage: "",
    currentBatsmanInnings: [],
    currentInnings: {},
    filters: {
        search: "",
        team: "all",
        status: "all",
        sort: "batting-avg-high-low",
        sort2: "all",
        country:'all'
    }
}

export const getAllBatsman = createAsyncThunk("batsman/getAllBatsman", async (data, thunkAPI) => {
    try {

        const response = await customFetch.get("batsman/all");
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue({ error: error.message })
    }
})
export const getBatsmanInnings = createAsyncThunk("batsman/getBatsmanInnings", async (data, thunkAPI) => {
    try {
        const response = await customFetch.get(`scorecard/innings/${data}`);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue({ error: error.message })
    }
})
export const getBatsmanById = createAsyncThunk("batsman/getBatsmanById", async (data, thunkAPI) => {
    try {
        const response = await customFetch.get(`batsman/batsman/${data}`);
        thunkAPI.dispatch(getBatsmanInnings(data));
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue({ error: error.message })
    }
})
const batsmanSlice = createSlice({
    name: "batsman",
    initialState,
    reducers: {
        updateBatsmanOnSearch: (state, action) => {
            state.filters.search = action.payload.toLowerCase();
        },
        updateBatsmanOnTeam: (state, action) => {
            state.filters.team = action.payload.toLowerCase();
        },
        updateBatsmanOnCountry: (state, action) => {
            state.filters.country = action.payload.toLowerCase();
        },
        updateBatsamnOnStatus: (state, action) => {
            state.filters.status = action.payload.toLowerCase();
        },
        updateBatsmanOnSort: (state, action) => {
            state.filters.sort = action.payload;
        },
        updateBatsmanOnSort2: (state, action) => {
            state.filters.sort2 = action.payload;
        },
        resetfilters: (state, action) => {
            state.filters.search = "";
            state.filters.team = "all";
            state.filters.status = "all";
            state.filters.sort = "batting-avg-high-low";
            state.filters.sort2 = "all";
            state.filters.country = "all";

        },
        updateBatsman: (state, action) => {
            const { id, hand, name, totalOdi, totalT20, totalTest, status, battingRank } = action.payload;
            state.allBatsman = state.allBatsman.map((batsman) => {
                if (batsman.playerid === id) {
                    return { ...batsman, bathand: hand, playername: name, totalOdi, totalt20i: totalT20, totaltest: totalTest, playerstatus: status, battingrank: battingRank };
                }
                else {
                    return batsman;
                }
            });
            

            state.filteredBatsman = state.allBatsman;
        },
        removeCurrentBtsman: (state, action) => {
            state.currentBatsman = {};
        },
        deleteBatsman: (state, action) => {
            const { id } = action.payload;
            state.allBatsman = state.allBatsman.filter((batsman) => batsman.playerid !== id);
            state.filteredBatsman = state.allBatsman;
        },
        setBatsmanPicture: (state, action) => {
            const { id, picture } = action.payload;
            state.allBatsman = state.allBatsman.map((batsman) => {
                if (batsman.playerid === id) {
                    return { ...batsman, playerpicpath:picture };
                }
                else {
                    return batsman;
                }
            }
            )
            state.filteredBatsman = state.allBatsman;
        },
        updateFilteredBatsmans: (state, action) => {
            const filters = state.filters;
            let filteredBatsman = state.allBatsman;
            if (filters.search !== "") {
                filteredBatsman = filteredBatsman.filter((batsman) => batsman.playername.toLowerCase().startsWith(filters.search.toLowerCase()));
            }
            if (filters.team !== "all") {
                filteredBatsman = filteredBatsman.filter((batsman) => batsman.teamname.toLowerCase() == filters.team);
            }
            if (filters.status !== "all") {
                filteredBatsman = filteredBatsman.filter((batsman) => batsman.playerstatus.toLowerCase() == filters.status);
            }
            if (filters.sort === "batting-avg-high-low") {

                filteredBatsman = filteredBatsman.sort((a, b) => {
                    //calculate averages by dividing runs by innings
                    let aAvg = a.runs / (a.totalinningsbatted === 0 ? 1 : a.totalinningsbatted);
                    let bAvg = b.runs / (b.totalinningsbatted === 0 ? 1 : b.totalinningsbatted);
                    return bAvg - aAvg;
                });
            }
            if (filters.sort === "batting-avg-low-high") {
                filteredBatsman = filteredBatsman.sort((a, b) =>{
                    let aAvg = a.runs / (a.totalinningsbatted === 0 ? 1 : a.totalinningsbatted);
                    let bAvg = b.runs / (b.totalinningsbatted === 0 ? 1 : b.totalinningsbatted);
                    return aAvg - bAvg;
                });
            }
            if (filters.sort === "strike-rate-high-low") {
                filteredBatsman = filteredBatsman.sort((a, b) =>{
                    //calculate strike rate by dividing runs by balls faced
                    let aStrikeRate = a.noruns / (a.ballsfaced === 0 ? 1 : a.ballsfaced);
                    let bStrikeRate = b.noruns / (b.ballsfaced === 0 ? 1 : b.ballsfaced);
                    return bStrikeRate - aStrikeRate;
                });
            }
            if (filters.sort === "strike-rate-low-high") {
                filteredBatsman = filteredBatsman.sort((a, b) =>{
                    let aStrikeRate = a.noruns / (a.ballsfaced === 0 ? 1 : a.ballsfaced);
                    let bStrikeRate = b.noruns / (b.ballsfaced === 0 ? 1 : b.ballsfaced);
                    return aStrikeRate - bStrikeRate;
                
                });
            }
            if (filters.sort === "icc-ranking-high-low") {
                filteredBatsman = filteredBatsman.sort((a, b) => a.battingrank - b.battingrank);
            }
            if (filters.sort === "icc-ranking-low-high") {
                filteredBatsman = filteredBatsman.sort((a, b) => b.battingrank - a.battingrank);
            }
            if (filters.sort2 === "left-hand") {
                filteredBatsman = filteredBatsman.filter((batsman) => batsman.bathand === "Left");
            }
            if (filters.sort2 === "right-hand") {
                filteredBatsman = filteredBatsman.filter((batsman) => batsman.bathand === "Right");
            }
            if (filters.country !== "all") {
                filteredBatsman = filteredBatsman.filter((batsman) => batsman.country.toLowerCase() == filters.country);
            }
            state.filteredBatsman = filteredBatsman;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllBatsman.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(getAllBatsman.fulfilled, (state, action) => {
            state.isLoading = false;
            state.allBatsman = action.payload;
            state.filteredBatsman = action.payload;
        })
        builder.addCase(getAllBatsman.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.errorMessage = action.payload.error;
        })
        builder.addCase(getBatsmanById.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(getBatsmanById.fulfilled, (state, action) => {
            state.isLoading = false;
            state.currentBatsman = action.payload;
        })
        builder.addCase(getBatsmanById.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.errorMessage = action.payload.error;
        })
        builder.addCase(getBatsmanInnings.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(getBatsmanInnings.fulfilled, (state, action) => {
            state.isLoading = false;
            state.currentBatsmanInnings = action.payload;
        })
        builder.addCase(getBatsmanInnings.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.errorMessage = action.payload.error;
        })
    }
})
export const { updateBatsmanOnSearch,setBatsmanPicture,updateBatsmanOnCountry, deleteBatsman, removeCurrentBtsman, updateBatsman, updateBatsmanOnSort2, updateBatsmanOnTeam, updateBatsamnOnStatus, updateBatsmanOnSort, resetfilters, updateFilteredBatsmans } = batsmanSlice.actions;

export default batsmanSlice.reducer;