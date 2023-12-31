import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { customFetch } from "../customeFetch";
const initialState={
    allMatches:[],
    filteredMatches:[],
    currentMatch:{},
    isError:false,
    isLoading:false,
    errorMessage:"",
    currentMatchScoreCard:[],
    team1ScoreCard:[],
    team2ScoreCard:[],
    matchLoading:false,
    createdMatch:{},
    filters:{
        team1:"all",
        team2:"all",
        tournament:"all",
        stadiums:"all",
        team:"all",
        status:"all"
    }
}
export const getAllMatches=createAsyncThunk("match/getAllMatches",async(data,thunkAPI)=>{
    try {
        const response=await customFetch.get("match/all");
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue({error:error.message})
    }
})
export const getMatchScoreCard=createAsyncThunk("match/getMatchScoreCard",async(data,thunkAPI)=>{
    try {
        const response=await customFetch.get(`scorecard/match/${data}`);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue({error:error.message})
    }
})
export const getMatchById=createAsyncThunk("match/getMatchById",async(data,thunkAPI)=>{
    try {
        const response=await customFetch.get(`match/match/${data}`);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue({error:error.message})
    }
})
export const createMatch=createAsyncThunk("match/createMatch",async(data,thunkAPI)=>{
    try {
        const response=await customFetch.post("match/createMatch",data,{
            headers: {
                Authorization: `Bearer ${thunkAPI.getState().auth.user?.token}`,
            },
        
        });
        thunkAPI.dispatch(getAllMatches());
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue({error:error.message})
    }
})
export const updateMatch=createAsyncThunk("match/updateMatch",async(data,thunkAPI)=>{
    try {
        const response=await customFetch.put(`match/updateMatch/${data.matchid}`,data,{
            headers: {
                Authorization: `Bearer ${thunkAPI.getState().auth.user?.token}`,
            },
        });
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue({error:error.message})
    }
})
export const deleteMatch=createAsyncThunk("match/deleteMatch",async(data,thunkAPI)=>{
    try {
        const response=await customFetch.delete(`match/deleteMatch/${data}`,{
            headers: {
                Authorization: `Bearer ${thunkAPI.getState().auth.user?.token}`,
            },
        
        });
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue({error:error.message})
    }
})
const matchSlice=createSlice({
    name:"match",
    initialState,
    reducers:{
        updateTeam1Filter:(state,action)=>{
            state.filters.team1=action.payload;
        },
        updateTeam2Filter:(state,action)=>{
            state.filters.team2=action.payload;
        },
        updateTournamentFilter:(state,action)=>{
            state.filters.tournament=action.payload;
        },
        updateStadiumFilter:(state,action)=>{
            state.filters.stadiums=action.payload;
        },
        updateTeamFilter:(state,action)=>{
            state.filters.team=action.payload;
        },
        updateStatusFilter:(state,action)=>{
            state.filters.status=action.payload;
        },
        resetMatchFilters:(state,action)=>{
            state.filters={
                team1:"all",
                team2:"all",
                tournament:"all",
                stadiums:"all",
                team:"all",
                status:"all"
            }   
        },
        removeCreatedMatch:(state,action)=>{
            state.createdMatch={};
        },
        removeError:(state,action)=>{
            state.isError=false;
        },
        updateFilteredMatches:(state,action)=>{
            let filteredMatches=state.allMatches;
            if(state.filters.team2!=="all"){
                filteredMatches=filteredMatches.filter((item)=>item.team2===state.filters.team2 || item.team1===state.filters.team2);
            }
            if(state.filters.tournament!=="all"){
                filteredMatches=filteredMatches.filter((item)=>item.tournamentname===state.filters.tournament);
            }
            if(state.filters.stadiums!=="all"){
                filteredMatches = filteredMatches.filter((item) => item.location.toLowerCase() === state.filters.stadiums.toLowerCase());
            }
            if(state.filters.team!=="all"){
                filteredMatches=filteredMatches.filter((item)=>item.team1===state.filters.team||item.team2===state.filters.team);
            }
            if(state.filters.status=="Won"){
                filteredMatches=filteredMatches.filter((item)=>item.winner===state.filters.team);
            }
            if(state.filters.status=="Lost"){
                filteredMatches=filteredMatches.filter((item)=>item.winner!==state.filters.team);
            }
            state.filteredMatches=filteredMatches;
        },
        removeCurrentMatch:(state,action)=>{
            state.currentMatch={};
        },
        deleteCurrentMatch:(state,action)=>{
            state.allMatches=state.allMatches.filter((item)=>item.matchid!==action.payload);
            state.filteredMatches=state.allMatches;
        },
        updateCurrentMatch:(state,action)=>{
            const { matchid, matchLocation, matchTournament, matchWinner, matchUmpire, matchUmpireId, winnerId, tournamentId, winningteampic }=action.payload;
            state.allMatches=state.allMatches.map((item)=>{
                if(item.matchid===matchid){
                    return {...item,winnerpic:winningteampic,location:matchLocation,tournamentname:matchTournament,winner:matchWinner,umpireid:matchUmpireId,umpire:matchUmpire,winnerteam:winnerId,tournamentid:tournamentId}
                }
                return item;
            })
        },


    },
    extraReducers:(builder)=>{
        builder.addCase(getAllMatches.pending,(state,action)=>{
            state.isLoading=true;
        })
        builder.addCase(getAllMatches.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.allMatches=action.payload;
            state.filteredMatches=action.payload;
        })
        builder.addCase(getAllMatches.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.errorMessage=action.payload.error;
        })
        builder.addCase(getMatchScoreCard.pending,(state,action)=>{
            state.matchLoading=true;
        })
        builder.addCase(getMatchScoreCard.fulfilled,(state,action)=>{
            state.matchLoading=false;
            state.currentMatchScoreCard=action.payload;
            state.team1ScoreCard=action.payload.filter((item)=>(item.teamid===state.currentMatch.team1id||item.teamid===state.currentMatch.team1id));
            state.team2ScoreCard=action.payload.filter((item)=>item.teamid===state.currentMatch.team2id||item.teamid===state.currentMatch.team2id);
        })
        builder.addCase(getMatchScoreCard.rejected,(state,action)=>{
            state.matchLoading=false;
            state.isError=true;
            state.errorMessage=action.payload.error;
        })
        builder.addCase(createMatch.pending,(state,action)=>{
            state.isLoading=true;
            localStorage.removeItem("matchid");
        })
        builder.addCase(createMatch.fulfilled,(state,action)=>{
            state.isLoading=false;
            localStorage.setItem("matchid",action.payload.matchid);
            state.createdMatch=action.payload;
        })
        builder.addCase(createMatch.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.errorMessage=action.payload.error;
        })
        builder.addCase(updateMatch.fulfilled,(state,action)=>{
            state.matchLoading=false;
        })
        builder.addCase(updateMatch.rejected,(state,action)=>{
            state.matchLoading=false;
            state.isError=true;
            state.errorMessage=action.payload.error;
        })
        builder.addCase(deleteMatch.pending,(state,action)=>{
            state.matchLoading=true;
        })
        builder.addCase(deleteMatch.fulfilled,(state,action)=>{
            state.matchLoading=false;
        })
        builder.addCase(deleteMatch.rejected,(state,action)=>{
            state.matchLoading=false;
            state.isError=true;
            state.errorMessage=action.payload.error;
        })
        builder.addCase(getMatchById.pending,(state,action)=>{
            state.matchLoading=true;
        })
        builder.addCase(getMatchById.fulfilled,(state,action)=>{
            state.matchLoading=false;
            state.currentMatch=action.payload;
        })
        builder.addCase(getMatchById.rejected,(state,action)=>{
            state.matchLoading=false;
            state.isError=true;
            state.errorMessage=action.payload.error;
        })
    }
})

export const {updateTeam1Filter,removeError,updateStatusFilter,removeCreatedMatch,removeCurrentMatch,deleteCurrentMatch,updateCurrentMatch,resetMatchFilters,updateTeam2Filter,updateTournamentFilter,updateStadiumFilter,updateTeamFilter,updateFilteredMatches}=matchSlice.actions;
export default matchSlice.reducer;