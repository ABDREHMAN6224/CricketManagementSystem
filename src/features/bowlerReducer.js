import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { customFetch } from "../customeFetch";
const initialState = {
    allBowlers: [],
    filteredBowlers: [],
    currentBowler: {},
    isError: false,
    isLoading: false,
    errorMessage: "",
    currentBowlerPerformances: [],
    filters: {
        search: "",
        team: "all",
        status: "all",
        sort: "wickets-high-low",
        sort2: "all",
        country:'all'
    }

}
export const getBowlerPerformances = createAsyncThunk("bowler/getBowlerPerformances", async (data, thunkAPI) => {
    try {
        const response = await customFetch.get(`scorecard/innings/${data}`);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue({ error: error.message })
    }
}
)
export const getAllBowlers = createAsyncThunk("bowler/getAllBowlers", async (data, thunkAPI) => {
    try {
        const response = await customFetch.get("bowler/all");
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue({ error: error.message })
    }
})
export const getBowlerById = createAsyncThunk("bowler/getBowlerById", async (data, thunkAPI) => {
    try {
        const response = await customFetch.get(`bowler/bowler/${data}`);
        thunkAPI.dispatch(getBowlerPerformances(data));
        return await response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue({ error: error.message })
    }
})
const bowlerSlice = createSlice({
    name: "bowler",
    initialState,
    reducers: {
        updateSearch: (state, action) => {
            state.filters.search = action.payload.toLowerCase();
        },
        updateTeam: (state, action) => {
            state.filters.team = action.payload.toLowerCase();
        },
        updateStatus: (state, action) => {
            state.filters.status = action.payload.toLowerCase();
        },
        updateSort: (state, action) => {
            state.filters.sort = action.payload;
        },
        updateSort2: (state, action) => {
            state.filters.sort2 = action.payload;
        },
        updateCountry: (state, action) => {
            state.filters.country = action.payload.toLowerCase();
        }
        ,
        removeCurrentBowler: (state, action) => {
            state.currentBowler = {};
        },
        setBowlerPicture: (state, action) => {
            const { id, picture } = action.payload;
            state.allBowlers = state.allBowlers.map((bowler) => {
                if (bowler.playerid === id) {
                    return { ...bowler, playerpicpath: picture };
                }
                else {
                    return bowler;
                }
            });
            state.filteredBowlers = state.allBowlers;
        },
        updateBowler: (state, action) => {
                const { id, hand, name, totalOdi, totalT20, totalTest, status, bowlingRank,bowlingType } = action.payload;
                state.allBowlers = state.allBowlers.map((bowler) => {
                    if (bowler.playerid === id) {
                        return { ...bowler, bowlhand: hand, playername: name, totalOdi, totalt20i: totalT20, totaltest: totalTest, playerstatus: status, bowlingrank: bowlingRank,bowltype:bowlingType };
                    }
                    else {
                        return bowler;
                    }
                });
                state.filteredBowlers = state.allBowlers;
        },        
        deleteBowler: (state, action) => {
            const { id } = action.payload;
            state.allBowlers = state.allBowlers.filter((bowler) => bowler.playerid !== id);
            state.filteredBowlers = state.allBowlers;
        },
        resetBowlerFilters: (state, action) => {
            state.filters.search = "";
            state.filters.team = "all";
            state.filters.status = "all";
            state.filters.sort = "wickets-high-low";
            state.filters.sort2 = "all";
            state.filters.country = "all";
        },
        updateFilteredBowlers: (state, action) => {
            const filters = state.filters;
            let filteredBowlers = state.allBowlers;
            if (filters.search !== "") {
                filteredBowlers = filteredBowlers.filter(bowler => bowler.playername.toLowerCase().startsWith(filters.search));
            }
            if (filters.team !== "all") {
                filteredBowlers = filteredBowlers.filter(bowler => bowler.teamname.toLowerCase() === filters.team);
            }
            if (filters.status !== "all") {
                filteredBowlers = filteredBowlers.filter(bowler => bowler.playerstatus.toLowerCase() === filters.status);
            }
            if (filters.sort === "wickets-high-low") {
                filteredBowlers = filteredBowlers.sort((a, b) => b.nowickets - a.nowickets);
            }
            if (filters.sort === "wickets-low-high") {
                filteredBowlers = filteredBowlers.sort((a, b) => a.nowickets - b.nowickets);
            }
            if (filters.sort === "bowling-avg-high-low") {
                filteredBowlers = filteredBowlers.sort((a, b) => {
                    //calculte bowling average by using oversbowled and runsconceded
                    const aAvg = (a.oversbowled==0?a.runsconceded:a.runsconceded/a.oversbowled);
                    const bAvg = (b.oversbowled==0?b.runsconceded:b.runsconceded/b.oversbowled);
                    return bAvg - aAvg;
                });
            }
            if (filters.sort === "bowling-avg-low-high") {
                filteredBowlers = filteredBowlers.sort((a, b) => {
                    //calculte bowling average by using oversbowled and runsconceded
                    const aAvg = (a.oversbowled==0?a.runsconceded:a.runsconceded/a.oversbowled);
                    const bAvg = (b.oversbowled==0?b.runsconceded:b.runsconceded/b.oversbowled);
                    return aAvg - bAvg;
                
                });
            }
            if (filters.sort === "Medium") {
                filteredBowlers = filteredBowlers.filter(bowler => bowler.bowltype === "Medium");
            }
            if (filters.sort === "Fast") {
                filteredBowlers = filteredBowlers.filter(bowler => bowler.bowltype === "Fast");
            }
            if (filters.sort === "Off-Spin") {
                filteredBowlers = filteredBowlers.filter(bowler => bowler.bowltype === "Off-Spin");
            }
            if (filters.sort === "Leg-Spin") {
                filteredBowlers = filteredBowlers.filter(bowler => bowler.bowltype === "Leg-Spin");
            }
            if (filters.sort === "icc-ranking-high-low") {
                filteredBowlers = filteredBowlers.sort((a, b) => a.bowlingrank - b.bowlingrank);
            }
            if (filters.sort === "icc-ranking-low-high") {
                filteredBowlers = filteredBowlers.sort((a, b) => b.bowlingrank - a.bowlingrank);
            }
            if (filters.sort2 === "left-arm") {
                filteredBowlers = filteredBowlers.filter(bowler => bowler.bowlhand === "Left");
            }
            if (filters.sort2 === "right-arm") {
                filteredBowlers = filteredBowlers.filter(bowler => bowler.bowlhand === "Right");
            }
            if (filters.country !== "all") {
                filteredBowlers = filteredBowlers.filter(bowler => bowler.country.toLowerCase() === filters.country);
            }
            state.filteredBowlers = filteredBowlers;
        }

    },
    extraReducers: (builder) => {
        builder.addCase(getAllBowlers.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(getAllBowlers.fulfilled, (state, action) => {
            state.isLoading = false;
            state.allBowlers = action.payload;
            state.filteredBowlers = action.payload;
        })
        builder.addCase(getAllBowlers.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.errorMessage = action.payload.error;
        })
        builder.addCase(getBowlerById.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(getBowlerById.fulfilled, (state, action) => {
            state.isLoading = false;
            state.currentBowler = action.payload;
        })
        builder.addCase(getBowlerById.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.errorMessage = action.payload.error;
        })
        builder.addCase(getBowlerPerformances.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(getBowlerPerformances.fulfilled, (state, action) => {
            state.isLoading = false;
            state.currentBowlerPerformances = action.payload;
        })
        builder.addCase(getBowlerPerformances.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.errorMessage = action.payload.error;
        })
    }
})

export const { updateSearch,setBowlerPicture,updateCountry, updateTeam,deleteBowler,updateBowler,removeCurrentBowler, updateStatus, updateSort2, updateSort, resetBowlerFilters, updateFilteredBowlers } = bowlerSlice.actions;
export default bowlerSlice.reducer;