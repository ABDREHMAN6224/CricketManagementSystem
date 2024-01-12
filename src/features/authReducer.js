import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { customFetch } from "../customeFetch";

const initialState = {
    records:{
        players:0,
        teams:0,
        matches:0,
        tournaments:0,
        stadiums:0,
        umpires:0,
        captains:0,
        coaches:0,
        keepers:0,
        countries:0
    },
    user:localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")):null,
    isUserError:false,
    isUserLoading:false,
    isBError:false,
    isBLoading:false,
    users:[],
    topPlayers:[],
    topTeams:[],
    allUserLoading:false,
    allUserError:false,
    errorMessage:""
}
export const getTopPlayers = createAsyncThunk("auth/getTopPlayers", async (_,thunkAPI) => {
    try {
        const response = await customFetch.get("rank/getTopPlayers",{
            headers: {
                Authorization: `Bearer ${thunkAPI.getState().auth.user?.token}`,
            },
        });
        const data = response.data;
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message);
    }
})
export const getTopTeams = createAsyncThunk("auth/getTopTeams", async (_,thunkAPI) => {
    try {
        const response = await customFetch.get("rank/getTopTeams",{
            headers: {
                Authorization: `Bearer ${thunkAPI.getState().auth.user?.token}`,
            },
        });
        const data = response.data;
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message);
    }
})
export const getNumberOfRecords = createAsyncThunk("auth/getNumberOfRecords", async () => {
    const response = await customFetch.get("auth/lengths");
    const data = response.data;
    return data;
})
export const registerUser = createAsyncThunk("auth/registerUser", async (user,thunkAPI) => {
    const response = await customFetch.post("auth/register",user,{
        headers: {
            Authorization: `Bearer ${thunkAPI.getState().auth.user?.token}`,
        },
    });
    thunkAPI.dispatch(getAllUsers());
    const data = response.data;
    return data;
})
export const loginUser = createAsyncThunk("auth/loginUser", async (user) => {
    const response = await customFetch.post("auth/login",user);
    const data = response.data;
    return data;
})
export const getAllUsers = createAsyncThunk("auth/getAllUsers", async (_,thunkAPI) => {
    const response = await customFetch.get("auth/all",{
        headers: {
            Authorization: `Bearer ${thunkAPI.getState().auth.user?.token}`,
        },
    });
    const data = response.data;
    return data;
})
export const deleteUser = createAsyncThunk("auth/deleteUser", async (id,thunkAPI) => {
    const response = await customFetch.delete(`auth/delete/${id}`,{
        headers: {
            Authorization: `Bearer ${thunkAPI.getState().auth.user?.token}`,
        },
    });
    thunkAPI.dispatch(getAllUsers());
    const data = response.data;
    return data;
})
export const getUser = createAsyncThunk("auth/getUser", async (id,thunkAPI) => {
    try {
        const response = await customFetch.get(`auth/user/${id}`,{
            headers: {
                Authorization: `Bearer ${thunkAPI.getState().auth.user?.token}`,
            },
        });
        const data = response.data;
        return data;
    } catch (error) {
        thunkAPI.dispatch(logoutUser());
    }
})
export const updatePic = createAsyncThunk("auth/updatePic", async (user,thunkAPI) => {
    try {
        
        const response = await customFetch.put(`auth/user/${user.username}`,user,{
            headers: {
                Authorization: `Bearer ${thunkAPI.getState().auth.user?.token}`,
            },
        });
        const data = response.data;
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message);

    }
})
export const backUpDb = createAsyncThunk("auth/backUpDb", async (d,thunkAPI) => {
    try {
        const response = await customFetch.post(`auth/backup`,d,{
            headers: {
                Authorization: `Bearer ${thunkAPI.getState().auth.user?.token}`,
                    'Content-Type': 'application/json',
                },
        });
        const blob = new Blob([response.data], { type: 'application/sql' });
        //download blob file


        // Create a link element and trigger the download
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'backup_file.sql'; // Specify the desired file name
        link.click();

        // Cleanup
        URL.revokeObjectURL(link.href);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message);
    }
})
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        logoutUser:(state)=>{
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            state.user = null;
        },
        deleteUserFromState:(state,action)=>{
            state.users = state.users.filter(user=>user.username!=action.payload);
        },
    },
    extraReducers:(builder)=>{
        builder.addCase(getNumberOfRecords.fulfilled, (state, action) => {
            state.records = action.payload;
        })
        builder.addCase(getNumberOfRecords.rejected, (state, action) => {
            state.errorMessage = action.payload;
        })
        builder.addCase(registerUser.pending, (state, action) => {
            state.isUserLoading = true;
        })
        builder.addCase(registerUser.fulfilled, (state, action) => {
            state.isUserLoading = false;
            state.isUserError = false;
        })
        builder.addCase(registerUser.rejected, (state, action) => {
            state.isUserLoading = false;
            state.isUserError = true;
            state.errorMessage = action.payload;
        })
        builder.addCase(loginUser.pending, (state, action) => {
            state.isUserLoading = true;
        })
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.isUserLoading = false;
            state.isUserError = false;
            state.user = action.payload;
            localStorage.setItem("user",JSON.stringify(action.payload));
            localStorage.setItem("token",action.payload.token);
        })
        builder.addCase(loginUser.rejected, (state, action) => {
            state.isUserLoading = false;
            state.isUserError = true;
            state.errorMessage = action.payload;
        })
        builder.addCase(getAllUsers.pending, (state, action) => {
            state.allUserLoading = true;
        })
        builder.addCase(getAllUsers.fulfilled, (state, action) => {
            state.allUserLoading = false;
            state.allUserError = false;
            state.users = action.payload;
        })
        builder.addCase(getAllUsers.rejected, (state, action) => {
            state.allUserLoading = false;
            state.allUserError = true;
            state.errorMessage = action.payload;
        })
        builder.addCase(deleteUser.pending, (state, action) => {
            state.allUserLoading = true;
        })
        builder.addCase(deleteUser.fulfilled, (state, action) => {
            state.allUserLoading = false;
            state.allUserError = false;
        })
        builder.addCase(deleteUser.rejected, (state, action) => {
            state.allUserLoading = false;
            state.allUserError = true;
            state.errorMessage = action.payload;
        })
        builder.addCase(getTopPlayers.pending, (state, action) => {
            state.isUserLoading = true;
        }
        )
        builder.addCase(getTopPlayers.fulfilled, (state, action) => {
            state.isUserLoading = false;
            state.isUserError = false;
            state.topPlayers = action.payload;
        })
        builder.addCase(getTopPlayers.rejected, (state, action) => {
            state.isUserLoading = false;
            state.isUserError = true;
            state.errorMessage = action.payload;
        })
        builder.addCase(getTopTeams.pending, (state, action) => {
            state.isUserLoading = true;
        }
        )
        builder.addCase(getTopTeams.fulfilled, (state, action) => {
            state.isUserLoading = false;
            state.isUserError = false;
            state.topTeams = action.payload;
        })
        builder.addCase(getTopTeams.rejected, (state, action) => {
            state.isUserLoading = false;
            state.isUserError = true;
            state.errorMessage = action.payload;
        })
        builder.addCase(updatePic.fulfilled, (state, action) => {
            state.isUserLoading = false;
            state.isUserError = false;
            state.user = action.payload;
            localStorage.setItem("user",JSON.stringify(action.payload));
        })
        builder.addCase(backUpDb.pending, (state, action) => {
            state.isBLoading = true;
        })
        builder.addCase(backUpDb.fulfilled, (state, action) => {
            state.isBLoading = false;
            state.isBError = false;
            state.errorMessage=""
        })
        builder.addCase(backUpDb.rejected, (state, action) => {
            state.isBLoading = false;
            state.isBError = true;
            state.errorMessage = action.payload;
        })
    }
})

export const {logoutUser,deleteUserFromState} = authSlice.actions;
export default authSlice.reducer;