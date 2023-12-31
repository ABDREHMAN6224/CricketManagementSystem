import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { customFetch } from "../customeFetch";
const initialState = {
    allUmpires: [],
    currentUmpire: {},
    filteredUmpires: [],
    isError: false,
    isLoading: false,
    errorMessage: "",
    singleUmpireLoading: false,
    filters: {
        search: "",
        country: "all",
        sort: "all"
    }
}
export const getAllUmpires = createAsyncThunk("umpire/getAllUmpires", async (data, thunkAPI) => {
    try {
        const response = await customFetch.get("umpire/all");
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue({ error: error.message })
    }
})
export const createUmpire = createAsyncThunk("umpire/createUmpire", async (data, thunkAPI) => {
    try {
        const response = await customFetch.post("umpire/createUmpire", data,{
            headers: {
                Authorization: `Bearer ${thunkAPI.getState().auth.user?.token}`,
            },
        });
        thunkAPI.dispatch(getAllUmpires());
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue({ error: error.message })
    }
}
)
export const updateUmpire = createAsyncThunk("umpire/updateUmpire", async (data, thunkAPI) => {
    try {
        const response = await customFetch.put(`umpire/${data.umpireid}`, data,{
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
export const deleteUmpire = createAsyncThunk("umpire/deleteUmpire", async (data, thunkAPI) => {
    try {
        const response = await customFetch.delete(`umpire/${data}`,{
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
const umpireSlice = createSlice({
    name: "umpire",
    initialState,
    reducers: {},
    reducers: {
        updateSearch: (state, action) => {
            state.filters.search = action.payload.toLowerCase();
        },
        updateCountryFilter: (state, action) => {
            state.filters.country = action.payload;
        },
        updateSortFilter: (state, action) => {
            state.filters.sort = action.payload;
        },
        resetFilters: (state, action) => {
            state.filters = {
                search: "",
                country: "all",
                sort: "all"
            };
        },
        updateFilteredUmpires: (state, action) => {
            let filteredUmpires = state.allUmpires;
            if (state.filters.country !== "all") {
                filteredUmpires = filteredUmpires.filter((umpire) => umpire.country === state.filters.country);
            }
            if (state.filters.search !== "") {
                filteredUmpires = filteredUmpires.filter((umpire) => umpire.umpirename.toLowerCase().startsWith(state.filters.search));
            }
            if (state.filters.sort == "nomatches-desc") {
                filteredUmpires.sort((a, b) => b.nomatches - a.nomatches);
            }
            if (state.filters.sort == "nomatches-asc") {
                filteredUmpires.sort((a, b) => a.nomatches - b.nomatches);
            }
            state.filteredUmpires = filteredUmpires;
        },
        setCurrentUmpire: (state, action) => { 
            const umpireid  = action.payload;
            const currentUmpire = state.allUmpires.find((umpire) => umpire.umpireid == umpireid);
            state.currentUmpire = currentUmpire;
        },
        deleteCurrentUmpire: (state, action) => {
            const umpireid = action.payload;
            const filteredUmpires = state.allUmpires.filter((umpire) => umpire.umpireid != umpireid);
            state.allUmpires = filteredUmpires;
            state.filteredUmpires = filteredUmpires;
        },
        updateCurrentUmpire: (state, action) => {
            const { umpireid, umpirename, countryid,country,umpirepicpath } = action.payload;
            state.allUmpires = state.allUmpires.map((umpire) => {
                if (umpire.umpireid == umpireid) {
                    return { ...umpire, umpirename, countryid, country,umpirepicpath:umpirepicpath }
                }
                else {
                    return umpire;
                }
            })
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllUmpires.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(getAllUmpires.fulfilled, (state, action) => {
            state.isLoading = false;
            state.allUmpires = action.payload;
            state.filteredUmpires = action.payload;
        })
        builder.addCase(getAllUmpires.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.errorMessage = action.payload.error;
        })
        builder.addCase(createUmpire.pending, (state, action) => {
            state.isLoading = true;
        }
        )
        builder.addCase(createUmpire.fulfilled, (state, action) => {
            state.isLoading = false;
            state.allUmpires.push(action.payload);
            state.filteredUmpires.push(action.payload);
        }
        )
        builder.addCase(createUmpire.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.errorMessage = action.payload.error;
        }
        )
        builder.addCase(updateUmpire.fulfilled, (state, action) => {
            state.isLoading = false;
        }
        )
        builder.addCase(updateUmpire.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.errorMessage = action.payload.error;
        }
        )
        builder.addCase(deleteUmpire.fulfilled, (state, action) => {
            state.isLoading = false;
        }
        )
    }
})
export const { updateSearch, updateCountryFilter,deleteCurrentUmpire,updateCurrentUmpire, updateSortFilter,setCurrentUmpire, resetFilters, updateFilteredUmpires } = umpireSlice.actions;
export default umpireSlice.reducer;