import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { customFetch } from "../customeFetch";
const initialState = {
    allRounders: [],
    currentAllRounder: {},
    filteredAllRounders: [],
    isError: false,
    isLoading: false,
    errorMessage: "",
    allRounderPerformance: [],
    filters: {
        search: "",
        team: "all",
        status: "all",
        sort: "icc-ranking-high-low",
        sort2: "all",
        sort3: "all",
        country: 'all'

    }
}
export const getAllRounderPerformance = createAsyncThunk("allRounder/getAllRounderPerformance", async (data, thunkAPI) => {
    try {
        const response = await customFetch.get(`scorecard/innings/${data}`);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue({ error: error.message })
    }
})
export const getAllRounders = createAsyncThunk("allRounder/getAllRounders", async (data, thunkAPI) => {
    try {
        const response = await customFetch.get("allRounder/all");
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue({ error: error.message })
    }
})
export const getAllRounderById = createAsyncThunk("allRounder/getAllRounderById", async (data, thunkAPI) => {
    try {
        const response = await customFetch.get(`allRounder/allrounder/${data}`);
        thunkAPI.dispatch(getAllRounderPerformance(data));
        return await response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue({ error: error.message })
    }
})
const allRounderSlice = createSlice({
    name: "allRounder",
    initialState,
    reducers: {
        updateAllRounderOnSearch: (state, action) => {
            state.filters.search = action.payload.toLowerCase();
        },
        updateAllRounderOnTeam: (state, action) => {
            state.filters.team = action.payload.toLowerCase();
        },
        updateAllRounderOnStatus: (state, action) => {
            state.filters.status = action.payload.toLowerCase();
        },
        updateAllRounderOnSort: (state, action) => {
            state.filters.sort = action.payload;
        },
        updateAllRounderOnSort2: (state, action) => {
            state.filters.sort2 = action.payload;
        },
        updateAllRounderOnSort3: (state, action) => {
            state.filters.sort3 = action.payload;
        },
        updateAllRounderOnCountry: (state, action) => {
            state.filters.country = action.payload.toLowerCase();
        },
        resetAllRounderFilters: (state, action) => {
            state.filters.search = "";
            state.filters.team = "all";
            state.filters.status = "all";
            state.filters.sort = "icc-ranking-high-low";
            state.filters.sort2 = "all";
            state.filters.sort3 = "all";
            state.filters.country = 'all';
        },
        updateFilteredAllRounders: (state, action) => {
            const filters = state.filters;
            let filteredAllRounders = state.allRounders;
            if (filters.search !== "") {
                filteredAllRounders = filteredAllRounders.filter(allRounder => allRounder.playername.toLowerCase().startsWith(filters.search));
            }
            if (filters.team !== "all") {
                filteredAllRounders = filteredAllRounders.filter(allRounder => allRounder.teamname.toLowerCase() === filters.team);
            }
            if (filters.status !== "all") {
                filteredAllRounders = filteredAllRounders.filter(allRounder => allRounder.playerstatus.toLowerCase() === filters.status);
            }
            if (filters.sort === "icc-ranking-high-low") {
                filteredAllRounders.sort((a, b) => a.allrounderrank - b.allrounderrank);
            }
            if (filters.sort === "icc-ranking-low-high") {
                filteredAllRounders.sort((a, b) => b.allrounderrank - a.allrounderrank);
            }
            if (filters.sort === "batting-avg-high-low") {
                filteredAllRounders.sort((a, b) =>{
                    let aAvg = a.runs / (a.totalinningsbatted === 0 ? 1 : a.totalinningsbatted);
                    let bAvg = b.runs / (b.totalinningsbatted === 0 ? 1 : b.totalinningsbatted);
                    return bAvg - aAvg;
                });
            }
            if (filters.sort === "batting-avg-low-high") {
                filteredAllRounders.sort((a, b) =>{
                    let aAvg = a.runs / (a.totalinningsbatted === 0 ? 1 : a.totalinningsbatted);
                    let bAvg = b.runs / (b.totalinningsbatted === 0 ? 1 : b.totalinningsbatted);
                    return aAvg - bAvg;
                
                });
            }
            if (filters.sort === "bowling-avg-low-high") {
                filteredAllRounders.sort((a, b) =>{
                    const aAvg = (a.oversbowled == 0 ? a.runsconceded : a.runsconceded / a.oversbowled);
                    const bAvg = (b.oversbowled == 0 ? b.runsconceded : b.runsconceded / b.oversbowled);
                    return aAvg - bAvg;
                });
            }
            if (filters.sort === "bowling-avg-high-low") {
                filteredAllRounders.sort((a, b) =>{
                    const aAvg = (a.oversbowled == 0 ? a.runsconceded : a.runsconceded / a.oversbowled);
                    const bAvg = (b.oversbowled == 0 ? b.runsconceded : b.runsconceded / b.oversbowled);
                    return bAvg - aAvg;
                }
            );
            }
            if (filters.sort === "strike-rate-high-low") {
                filteredAllRounders.sort((a, b) => {
                    let aStrikeRate = a.noruns / (a.ballsfaced === 0 ? 1 : a.ballsfaced);
                    let bStrikeRate = b.noruns / (b.ballsfaced === 0 ? 1 : b.ballsfaced);
                    return bStrikeRate - aStrikeRate;
                
                });
            }
            if (filters.sort === "strike-rate-low-high") {
                filteredAllRounders.sort((a, b) => {
                    let aStrikeRate = a.noruns / (a.ballsfaced === 0 ? 1 : a.ballsfaced);
                    let bStrikeRate = b.noruns / (b.ballsfaced === 0 ? 1 : b.ballsfaced);
                    return aStrikeRate - bStrikeRate;
                
                });
            }
            if (filters.sort3 === "Medium") {
                filteredAllRounders = filteredAllRounders.filter(allRounder => allRounder.bowltype === "Medium");
            }
            if (filters.sort3 === "Fast") {
                filteredAllRounders = filteredAllRounders.filter(allRounder => allRounder.bowltype === "Fast");
            }
            if (filters.sort3 === "Off-Spin") {
                filteredAllRounders = filteredAllRounders.filter(allRounder => allRounder.bowltype === "Off-Spin");
            }
            if (filters.sort3 === "Leg-Spin") {
                filteredAllRounders = filteredAllRounders.filter(allRounder => allRounder.bowltype === "Leg-Spin");
            }
            if (filters.sort2 === "left-hand") {
                filteredAllRounders = filteredAllRounders.filter(allRounder => allRounder.bathand.toLowerCase() === "left");
            }
            if (filters.sort2 === "right-hand") {
                filteredAllRounders = filteredAllRounders.filter(allRounder => allRounder.bathand.toLowerCase() === "right");
            }
            if (filters.sort2 === "left-arm") {
                filteredAllRounders = filteredAllRounders.filter(allRounder => allRounder.bowlhand.toLowerCase() === "left");
            }
            if (filters.sort2 === "right-arm") {
                filteredAllRounders = filteredAllRounders.filter(allRounder => allRounder.bowlhand.toLowerCase() === "right");
            }
            if (filters.country !== "all") {
                filteredAllRounders = filteredAllRounders.filter(allRounder => allRounder.country.toLowerCase() === filters.country);
            }
            state.filteredAllRounders = filteredAllRounders;
        },
        removeCurrentAllRounder: (state, action) => {
            state.currentAllRounder = {};
        },
        setAllrounderPicture: (state, action) => {
            const { id, picture } = action.payload;
            state.allRounders = state.allRounders.map((player) => {
                if (player.playerid === id) {
                    return { ...player, playerpicpath: picture };
                }
                else {
                    return player;
                }
            });
            state.filteredAllRounders = state.allRounders;
        },
        updateAllRounder: (state, action) => {
            const { id, bowlhand,bathand, name, totalOdi, totalT20, totalTest, status, allRounderRank, bowlingType } = action.payload;
            state.allRounders = state.allRounders.map((player) => {
                if (player.playerid === id) {
                    return { ...player, bathand,bowlhand, playername: name, totalOdi, totalt20i: totalT20, totaltest: totalTest, playerstatus: status, allrounderrank: allRounderRank, bowltype: bowlingType };
                }
                else {
                    return player;
                }
            });
            state.filteredAllRounders = state.allRounders;
        },
        deleteAllRounder: (state, action) => {
            const { id } = action.payload;
            state.allRounders = state.allRounders.filter((player) => player.playerid !== id);
            state.filteredAllRounders = state.allRounders;
        },

    },
    extraReducers: (builder) => {
        builder.addCase(getAllRounders.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(getAllRounders.fulfilled, (state, action) => {
            state.isLoading = false;
            state.allRounders = action.payload;
            state.filteredAllRounders = action.payload;
        })
        builder.addCase(getAllRounders.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.errorMessage = action.payload.error;
        })
        builder.addCase(getAllRounderById.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(getAllRounderById.fulfilled, (state, action) => {
            state.isLoading = false;
            state.currentAllRounder = action.payload;
        })
        builder.addCase(getAllRounderById.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.errorMessage = action.payload.error;
        })
        builder.addCase(getAllRounderPerformance.pending, (state, action) => {
            state.isLoading = true;
        }
        )
        builder.addCase(getAllRounderPerformance.fulfilled, (state, action) => {
            state.isLoading = false;
            state.allRounderPerformance = action.payload;
        })
    }
})

export const { updateAllRounderOnSearch,updateAllRounderOnCountry,deleteAllRounder,updateAllRounder,setAllrounderPicture,removeCurrentAllRounder, updateAllRounderOnTeam, updateAllRounderOnStatus, updateAllRounderOnSort, updateAllRounderOnSort2, updateAllRounderOnSort3, resetAllRounderFilters, updateFilteredAllRounders } = allRounderSlice.actions;
export default allRounderSlice.reducer;