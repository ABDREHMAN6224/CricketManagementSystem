import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { customFetch } from "../customeFetch";
const initialState = {
    allTeams: [],
    currentTeam: {},
    currentTeam2: {},
    filteredTeams: [],
    isError: false,
    isLoading: false,
    errorMessage: "",
    currentTeamPlayers: [],
    Team2Players:[],
    TeamMatches:[],
    //squads
    currentTeamPlayersSquad: [],
    currentTeam2Players: [],
    tournamentWins: [],
    teamLoading: false,
    currentId: "",
    filters: {
        search: '',
        sort1: 'no-of-wins-high-low',
        sort2: 'icc-t20-ranking-low-high',
        team: 'all'
    }
}
export const getTeamMatches = createAsyncThunk("team/getTeamMatches", async (data, thunkAPI) => {
    try {
        const response = await customFetch.get(`team/teamMatches/${data}`);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue({ error: error.message })
    }
})

export const getWonTournameents = createAsyncThunk("team/getWonTournameents", async (data, thunkAPI) => {
    try {
        const response = await customFetch.get(`team/tournamentWon/${data}`);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue({ error: error.message })
    }
})
export const getAllTeams = createAsyncThunk("team/getAllTeams", async (data, thunkAPI) => {
    try {
        const response = await customFetch.get("team/all");
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue({ error: error.message })
    }
})
export const getTeamPlayers = createAsyncThunk("team/getTeamPlayers", async (data, thunkAPI) => {
    try {
        const response = await customFetch.get(`team/getTeamPlayers/${data}`);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue({ error: error.message })
    }
})
export const getTeamTwoPlayers = createAsyncThunk("team/getTeamTwoPlayers", async (data, thunkAPI) => {
    try {
        const response = await customFetch.get(`team/getTeamPlayers/${data}`);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue({ error: error.message })
    }
})
export const getTeam2Players = createAsyncThunk("team/getTeam2Players", async (data, thunkAPI) => {
    try {
        const response = await customFetch.get(`team/teamSquad/${data}`);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue({ error: error.message })
    }
})
export const getTeamPlayersSquad = createAsyncThunk("team/getTeamPlayersSquad", async (data, thunkAPI) => {
    try {
        const response = await customFetch.get(`team/teamSquad/${data}`);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue({ error: error.message })
    }
})
export const createTeam = createAsyncThunk("team/createTeam", async (data, thunkAPI) => {
    try {
        const response = await customFetch.post("team/createTeam", data,{
            headers: {
                Authorization: `Bearer ${thunkAPI.getState().auth.user?.token}`,
            },
        });
        thunkAPI.dispatch(getAllTeams());
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue({ error: error.message })
    }
})
export const appointCoach = createAsyncThunk("team/appointCoach", async (data, thunkAPI) => {
    try {
        const response = await customFetch.post(`team/appointCoach/${data.teamId}`, data,{
            headers: {
                Authorization: `Bearer ${thunkAPI.getState().auth.user?.token}`,
            },
        });
        thunkAPI.dispatch(getTeamById(data.teamId));
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue({ error: error.message })
    }
})
export const appointCaptain = createAsyncThunk("team/appointCaptain", async (data, thunkAPI) => {
    try {
        const response = await customFetch.post(`team/appointCaptain/${data.teamId}`, data,{
            headers: {
                Authorization: `Bearer ${thunkAPI.getState().auth.user?.token}`,
            },
        });
        thunkAPI.dispatch(getTeamById(data.teamId));
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue({ error: error.message })
    }
})
export const appointWicketKeeper = createAsyncThunk("team/appointWicketKeeper", async (data, thunkAPI) => {
    try {
        const response = await customFetch.post(`team/appointWicketKeeper/${data.teamId}`, data,{
            headers: {
                Authorization: `Bearer ${thunkAPI.getState().auth.user?.token}`,
            },
        });
        thunkAPI.dispatch(getTeamById(data.teamId));
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue({ error: error.message })
    }
})
export const deleteTeam = createAsyncThunk("team/deleteTeam", async (data, thunkAPI) => {
    try {
        const response = await customFetch.delete(`team/team/${data}`,{
            headers: {
                Authorization: `Bearer ${thunkAPI.getState().auth.user?.token}`,
            },
        });
        thunkAPI.dispatch(getAllTeams());
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue({ error: error.message })
    }
})
export const getTeamById = createAsyncThunk("team/getTeamById", async (data, thunkAPI) => {
    try {
        const response = await customFetch.get(`team/team/${data}`);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue({ error: error.message })
    }
})
export const getTeam2ById = createAsyncThunk("team/getTeam2ById", async (data, thunkAPI) => {
    try {
        const response = await customFetch.get(`team/team/${data}`);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue({ error: error.message })
    }
})
export const updateTeam = createAsyncThunk("team/updateTeam", async (data, thunkAPI) => {
    try {
        const response = await customFetch.put(`team/updateTeam/${data.teamId}`, data,{
            headers: {
                Authorization: `Bearer ${thunkAPI.getState().auth.user?.token}`,
            },
        });
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue({ error: error.message })
    }
})
export const updateTeamRank = createAsyncThunk("team/updateTeamRank", async (data, thunkAPI) => {
    try {
        await customFetch.put(`rank/updateTeamRank/${data.teamId}`, data,{
            headers: {
                Authorization: `Bearer ${thunkAPI.getState().auth.user?.token}`,
            },
        });
    }
    catch (error) {
        return thunkAPI.rejectWithValue({ error: error.message })
    }
})
export const updatePlayerTeam = createAsyncThunk("team/updatePlayerTeam", async (data, thunkAPI) => {
    try {
        await customFetch.post(`team/updatePlayerTeam/${data.teamId}/${data.playerId}`,{
            headers: {
                Authorization: `Bearer ${thunkAPI.getState().auth.user?.token}`,
            },
        });
    }
    catch (error) {
        return thunkAPI.rejectWithValue({ error: error.message })
    }
})
export const teamSlice = createSlice({
    name: "team",
    initialState,
    reducers: {
        updateSearch: (state, action) => {
            state.filters.search = action.payload.toLowerCase();
        },
        updateSort1: (state, action) => {
            state.filters.sort1 = action.payload;
        },
        updateSort2: (state, action) => {
            state.filters.sort2 = action.payload;
        },
        updateTeamSearch: (state, action) => {
            state.filters.team = action.payload;
        },
        resetTeamFilters: (state, action) => {
            state.filters.search = "";
            state.filters.sort1 = "no-of-wins-high-low";
            state.filters.sort2 = "icc-t20-ranking-low-high";
            state.filters.team = 'all';
        },
        updateFilteredTeams: (state, action) => {
            state.filteredTeams = state.allTeams;
            if (state.filters.team !== 'all') {
                state.filteredTeams = state.filteredTeams.filter((team) => team.teamname.toLowerCase().includes(state.filters.team.toLowerCase()));
            }
            if (state.filters.search !== '') {
                state.filteredTeams = state.filteredTeams.filter((team) => team.teamname.toLowerCase().startsWith(state.filters.search.toLowerCase()));
            }
            if (state.filters.sort1 === 'no-of-wins-high-low') {
                state.filteredTeams.sort((a, b) => b.totalwins - a.totalwins);
            }
            if (state.filters.sort1 === 'no-of-wins-low-high') {
                state.filteredTeams.sort((a, b) => a.totalwins - b.totalwins);
            }
            if (state.filters.sort1 === 'no-of-losses-high-low') {
                state.filteredTeams.sort((a, b) => b.totallosses - a.totallosses);
            }
            if (state.filters.sort1 === 'no-of-losses-low-high') {
                state.filteredTeams.sort((a, b) => a.totallosses - b.totallosses);
            }
            if (state.filters.sort1 === 'no-of-draws-high-low') {
                state.filteredTeams.sort((a, b) => b.draws - a.draws);
            }
            if (state.filters.sort1 === 'no-of-draws-low-high') {
                state.filteredTeams.sort((a, b) => a.draws - b.draws);
            }
            if (state.filters.sort2 === 'icc-t20-ranking-low-high') {
                state.filteredTeams.sort((a, b) => b.t20irank - a.t20irank);
            }
            if (state.filters.sort2 === 'icc-t20-ranking-high-low') {
                state.filteredTeams.sort((a, b) => a.t20irank - b.t20irank);
            }
            if (state.filters.sort2 === 'icc-odi-ranking-low-high') {
                state.filteredTeams.sort((a, b) => b.odirank - a.odirank);
            }
            if (state.filters.sort2 === 'icc-odi-ranking-high-low') {
                state.filteredTeams.sort((a, b) => a.odirank - b.odirank);
            }
            if (state.filters.sort2 === 'icc-test-ranking-low-high') {
                state.filteredTeams.sort((a, b) => b.testrank - a.testrank);
            }
            if (state.filters.sort2 === 'icc-test-ranking-high-low') {
                state.filteredTeams.sort((a, b) => a.testrank - b.testrank);
            }
        },
        removeCurrentTeam: (state, action) => {
            state.currentTeam = {};
            state.currentId="";
        },
        updateCurrentTeamRank: (state, action) => {
            const { teamId, t20irank, odirank, testrank } = action.payload;
            state.allTeams = state.allTeams.map((team) => {
                if (team.teamid === teamId) {
                    return { ...team, t20irank: t20irank, odirank: odirank, testrank: testrank };
                }
                else {
                    return team;
                }
            });
            //set other ranks i.e decrease rank of team already present at that rank
            //if team is t20
            if (t20irank > 0) {
                state.allTeams = state.allTeams.map((team) => {
                    if (team.teamid !== teamId && team.t20irank >= t20irank) {
                        return { ...team, t20irank: team.t20irank + 1 };
                    }
                    else {
                        return team;
                    }
                });
            }
            //if team is odi
            if (odirank > 0) {
                state.allTeams = state.allTeams.map((team) => {
                    if (team.teamid !== teamId && team.odirank >= odirank) {
                        return { ...team, odirank: team.odirank + 1 };
                    }
                    else {
                        return team;
                    }
                }
                );
            }
            //if team is test
            if (testrank > 0) {
                state.allTeams = state.allTeams.map((team) => {
                    if (team.teamid !== teamId && team.testrank >= testrank) {
                        return { ...team, testrank: team.testrank + 1 };
                    }
                    else {
                        return team;
                    }
                }
                );
            }
            state.filteredTeams = state.allTeams;

        },
        setTeamPicture: (state, action) => {
            const { id, picture } = action.payload;
            state.allTeams = state.allTeams.map((team) => {
                if (team.teamid === id) {
                    return { ...team, teampicpath: picture };
                }
                else {
                    return team;
                }
            });
            state.filteredTeams = state.allTeams;
        },
        updateCurrentTeam: (state, action) => {

            const {id,teamName,captainName,coachName,t20rank,odirank,testrank}=action.payload;
            state.allTeams = state.allTeams.map((team) => {
                if (team.teamid === id) {
                    return { ...team, teamname: teamName, captain: captainName, coachname: coachName, t20irank: t20rank, odirank: odirank, testrank: testrank };
                }
                else {
                    return team;
                }
            });
            state.filteredTeams = state.allTeams;
        },
        deleteCurrentTeam: (state, action) => {
            const { id } = action.payload;
            state.allTeams = state.allTeams.filter((team) => team.teamid !== id);
            state.filteredTeams = state.allTeams;
        },



    },
    extraReducers: (builder) => {
        builder.addCase(getAllTeams.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(getAllTeams.fulfilled, (state, action) => {
            state.isLoading = false;
            state.allTeams = action.payload;
            state.isError = false;
            state.filteredTeams = action.payload;
        })
        builder.addCase(getAllTeams.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.errorMessage = action.payload.error;
        })
        builder.addCase(getTeamPlayers.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(getTeamPlayers.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.currentTeamPlayers = action.payload;
        })
        builder.addCase(getTeamPlayers.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.errorMessage = action.payload.error;
        })
        builder.addCase(createTeam.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(createTeam.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.currentId = action.payload[0].teamid;
        })
        builder.addCase(createTeam.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.errorMessage = action.payload.error;
        })
        builder.addCase(appointCoach.pending, (state, action) => {
            state.teamLoading = true;
        })
        builder.addCase(appointCoach.fulfilled, (state, action) => {
            state.teamLoading = false;
            state.isError = false;

        })
        builder.addCase(appointCoach.rejected, (state, action) => {
            state.teamLoading = false;
            state.isLoading = false;
            state.isError = true;
            state.errorMessage = action.payload.error;
        })
        builder.addCase(appointCaptain.pending, (state, action) => {
            state.teamLoading = true;
        })
        builder.addCase(appointCaptain.fulfilled, (state, action) => {
            state.teamLoading = false;
            state.isLoading = false;
            state.isError = false;

        })
        builder.addCase(appointCaptain.rejected, (state, action) => {
            state.teamLoading = false;
            state.isError = true;
            state.errorMessage = action.payload.error;
        })
        builder.addCase(deleteTeam.pending, (state, action) => {
            state.teamLoading = true;
        })
       
        builder.addCase(deleteTeam.rejected, (state, action) => {
            state.teamLoading = false;
            state.isError = true;
            state.errorMessage = action.payload.error;
        })
        builder.addCase(getTeamById.pending, (state, action) => {
            state.teamLoading = true;
        })
        builder.addCase(getTeamById.fulfilled, (state, action) => {
            state.teamLoading = false;
            state.isError = false;
            state.isLoading = false;
            state.currentTeam = action.payload;
        })
        builder.addCase(getTeamById.rejected, (state, action) => {
            state.teamLoading = false;
            state.isError = true;
            state.errorMessage = action.payload.error;
        })
        builder.addCase(updateTeam.fulfilled, (state, action) => {
            state.teamLoading = false;
            state.isError = false;
            state.isLoading = false;
        })
        builder.addCase(updateTeam.rejected, (state, action) => {
            state.teamLoading = false;
            state.isError = true;
            state.errorMessage = action.payload.error;
        })
        builder.addCase(getWonTournameents.pending, (state, action) => {
            state.teamLoading = true;
        })
        builder.addCase(getWonTournameents.fulfilled, (state, action) => {
            state.teamLoading = false;
            state.tournamentWins = action.payload;
            state.isError = false;
            state.isLoading = false;

        })
        builder.addCase(getWonTournameents.rejected, (state, action) => {
            state.teamLoading = false;
            state.isError = true;
            state.errorMessage = action.payload.error;
        })
        builder.addCase(appointWicketKeeper.pending, (state, action) => {
            state.teamLoading = true;
        })
        builder.addCase(appointWicketKeeper.fulfilled, (state, action) => {
            state.teamLoading = false;
            state.isError = false;
            state.isLoading = false;
        })
        builder.addCase(appointWicketKeeper.rejected, (state, action) => {
            state.teamLoading = false;
            state.isError = true;
            state.errorMessage = action.payload.error;
        })
        builder.addCase(updateTeamRank.fulfilled, (state, action) => {
            state.teamLoading = false;
            state.isError = false;
            state.isLoading = false;
        })
        builder.addCase(updateTeamRank.rejected, (state, action) => {
            state.teamLoading = false;
            state.isError = true;
            state.errorMessage = action.payload.error;

        })
        builder.addCase(getTeam2Players.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(getTeam2Players.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isLoading = false;
            state.currentTeam2Players = action.payload;
        })
        builder.addCase(getTeam2Players.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.errorMessage = action.payload.error;
        })
        builder.addCase(getTeamPlayersSquad.pending, (state, action) => {
            state.isLoading = true;
        }
        )
        builder.addCase(getTeamPlayersSquad.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.currentTeamPlayersSquad = action.payload;
        })
        builder.addCase(getTeamPlayersSquad.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.errorMessage = action.payload.error;
        })
        builder.addCase(getTeamTwoPlayers.pending, (state, action) => {
            state.isLoading = true;
        }
        )
        builder.addCase(getTeamTwoPlayers.fulfilled, (state, action) => {
            state.isError = false;
            state.isLoading = false;
                        state.Team2Players = action.payload;
        })
        builder.addCase(getTeamTwoPlayers.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.errorMessage = action.payload.error;
        })
        builder.addCase(getTeam2ById.pending, (state, action) => {
            state.teamLoading = true;
        })
        builder.addCase(getTeam2ById.fulfilled, (state, action) => {
            state.teamLoading = false;
            state.isError = false;
            state.isLoading = false;
            state.currentTeam2 = action.payload;
        })
        builder.addCase(getTeam2ById.rejected, (state, action) => {
            state.teamLoading = false;
            state.isError = true;
            state.errorMessage = action.payload.error;
        })
        builder.addCase(updatePlayerTeam.fulfilled, (state, action) => {
            state.teamLoading = false;
            state.isError = false;
            state.isLoading = false;
        })
        builder.addCase(updatePlayerTeam.rejected, (state, action) => {
            state.teamLoading = false;
            state.isError = true;
            state.errorMessage = action.payload.error;
        })
        builder.addCase(getTeamMatches.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(getTeamMatches.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.TeamMatches = action.payload;
        })
        builder.addCase(getTeamMatches.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.errorMessage = action.payload.error;
        })

    }
})

export const { updateSearch,setTeamPicture,updateCurrentTeamRank,removeCurrentTeam,deleteCurrentTeam,updateCurrentTeam, updateSort1, updateSort2, updateTeamSearch, resetTeamFilters, updateFilteredTeams } = teamSlice.actions;
export default teamSlice.reducer;