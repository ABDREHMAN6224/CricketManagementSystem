import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { customFetch } from "../customeFetch";
import dayjs from "dayjs";

const initialState = {
    allTournaments: [],
    currentTournament: {},
    filteredTournaments: [],
    isError: false,
    isLoading: false,
    errorMessage: "",
    singleTournamentLoading: false,
    currentTournamentMatches: [],
    filters: {
        tournament: "all",
        year: "all",
        winningTeam: "all",
    }
}

export const getAllTournaments = createAsyncThunk("tournament/getAllTournaments", async (data, thunkAPI) => {
    try {
        const response = await customFetch.get("tournament/all");
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue({ error: error.message })
    }
})
export const getTournamentMatches = createAsyncThunk("tournament/getTournamentMatches", async (data, thunkAPI) => {
    try {
        const response = await customFetch.get(`tournament/matches/${data}`);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue({ error: error.message })
    }
})
export const createTournament = createAsyncThunk("tournament/createTournament", async (data, thunkAPI) => {
    try {
        const response = await customFetch.post("tournament/create", data,{
            headers: {
                Authorization: `Bearer ${thunkAPI.getState().auth.user?.token}`,
            },
        });
        thunkAPI.dispatch(getAllTournaments());
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue({ error: error.message })
    }
})
export const updateTournament = createAsyncThunk("tournament/updateTournament", async (data, thunkAPI) => {
    try {
        const response = await customFetch.put(`tournament/${data.tournamentId}`, data,{
            headers: {
                Authorization: `Bearer ${thunkAPI.getState().auth.user?.token}`,
            },
        });
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue({ error: error.message })
    }
})
export const deleteTournament = createAsyncThunk("tournament/deleteTournament", async (data, thunkAPI) => {
    try {
        const response = await customFetch.delete(`tournament/${data}`,{
            headers: {
                Authorization: `Bearer ${thunkAPI.getState().auth.user?.token}`,
            },
        });
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue({ error: error.message })
    }
})
export const getTournamentById = createAsyncThunk("tournament/getTournamentById", async (data, thunkAPI) => {
    try {
        const response = await customFetch.get(`tournament/${data}`);
        thunkAPI.dispatch(getTournamentMatches(data));
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue({ error: error.message })
    }
})

const tournamentSlice = createSlice({
    name: "tournament",
    initialState,
    reducers: {
        updateCurrentTournamet: (state, action) => {
            const { tournamentId, name, startdate, enddate, teamname,teampicpath,winning_team,winningpic} = action.payload;
            state.allTournaments = state.allTournaments.map((tournament) => {
                if (tournament.tournamentid == tournamentId) {
                    return { ...tournament, name, startdate, enddate, teamname,teampicpath,winning_team,tournamentlogo:winningpic };
                }
                return tournament;
            })
        },
        updateWinningTeamFilter: (state, action) => {
            state.filters.winningTeam = action.payload;
        },
        updateTournamentFilter: (state, action) => {
            state.filters.tournament = action.payload;
        },
        updateYearFilter: (state, action) => {
            state.filters.year = action.payload;
        },
        resetTournamentFilters: (state, action) => {
            state.filters = {
                tournament: "all",
                year: "all",
                winningTeam: "all",
            }
        },
        updateFilteredTournaments: (state, action) => {
            let filteredTournaments = state.allTournaments;
            if (state.filters.tournament !== "all") {
                filteredTournaments = filteredTournaments.filter((tournament) => tournament.name == state.filters.tournament)
            }
            if (state.filters.year !== "all") {
                filteredTournaments = filteredTournaments.filter((tournament) => dayjs(tournament.enddate).format('YYYY') == state.filters.year)
            }
            if (state.filters.winningTeam !== "all") {
                filteredTournaments = filteredTournaments.filter((tournament) => tournament.teamname === state.filters.winningTeam)
            }
            state.filteredTournaments = filteredTournaments;
        },
        removeCurrentTournament: (state, action) => {
            state.currentTournament = {};
        },
        deleteCurrentTournament: (state, action) => {
            state.allTournaments = state.allTournaments.filter((tournament) => tournament.tournamentid !== action.payload);
            state.filteredTournaments=state.allTournaments;
        },
        setTournamentWinningPic: (state, action) => {
            const { tournamentId, pic } = action.payload;
            state.allTournaments = state.allTournaments.map((tournament) => {
                if (tournament.tournamentId === tournamentId) {
                    tournament.tournamentlogo = pic;
                }
                return tournament;
            })
            state.filteredTournaments=state.allTournaments;
        }


    },
    extraReducers: (builder) => {
        builder.addCase(getAllTournaments.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
        })
        builder.addCase(getAllTournaments.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.allTournaments = action.payload;
            state.filteredTournaments = action.payload;
        })
        builder.addCase(getAllTournaments.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.errorMessage = action.payload.error;
        })
        builder.addCase(getTournamentMatches.pending, (state, action) => {
            state.singleTournamentLoading = true;
            state.isError = false;
        })
        builder.addCase(getTournamentMatches.fulfilled, (state, action) => {
            state.singleTournamentLoading = false;
            state.isError = false;
            state.currentTournamentMatches = action.payload;
        })
        builder.addCase(getTournamentMatches.rejected, (state, action) => {
            state.singleTournamentLoading = false;
            state.isError = true;
            state.errorMessage = action.payload.error;
        })
        builder.addCase(createTournament.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
        })
        builder.addCase(createTournament.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
        })
        builder.addCase(createTournament.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.errorMessage = action.payload.error;
        })
        builder.addCase(updateTournament.pending, (state, action) => {
            state.isError = false;
        })
        builder.addCase(updateTournament.fulfilled, (state, action) => {
            state.isError = false;
        })
        builder.addCase(updateTournament.rejected, (state, action) => {
            state.isError = true;
            state.errorMessage = action.payload.error;
        })
        builder.addCase(deleteTournament.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
        })
        builder.addCase(deleteTournament.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
        })
        builder.addCase(deleteTournament.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.errorMessage = action.payload.error;
        })
        builder.addCase(getTournamentById.pending, (state, action) => {
            state.singleTournamentLoading = true;
            state.isError = false;
        }
        )
        builder.addCase(getTournamentById.fulfilled, (state, action) => {
            state.singleTournamentLoading = false;
            state.isError = false;
            state.currentTournament = action.payload;
        })
        builder.addCase(getTournamentById.rejected, (state, action) => {
            state.singleTournamentLoading = false;
            state.isError = true;
            state.errorMessage = action.payload.error;
        })
    }

})

export const { updateWinningTeamFilter,setTournamentWinningPic,removeCurrentTournament,updateCurrentTournamet,deleteCurrentTournament,updateTournamentFilter, updateYearFilter, resetTournamentFilters, updateFilteredTournaments } = tournamentSlice.actions;
export default tournamentSlice.reducer;