import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const getMovie = createAsyncThunk('movie/getMovie', async ({ uid, mid }) => {
    var data
    await axios.get(`http://localhost:4500/user/${uid}/movie/${mid}`)
        .then(res => data = res.data)
    return data
})

export const getRecomendations = createAsyncThunk('movie/contentBased', async ({ id }) => {
    var data
    await axios.get(`${process.env.NEXT_PUBLIC_SERVER}/recommend?method=cb&id=${id}`)
        .then(res => data = res.data)
    return data
})

const initialState = {
    details: {},
    more: {},
    recommends: [],
    open: false,
    status: 'idle'
}

const movie = createSlice({
    name: 'movie',
    initialState,
    reducers: {
        setOpen: (state, action) => {
            state.open = action.payload
        },
        setMovieId: (state, action) => {

            state.details = action.payload
        }
    },
    extraReducers(builder) {
        builder
            .addCase(getMovie.fulfilled, (state, action) => {
                state.more = action.payload
                state.status = 'succeeded'
            })
            .addCase(getRecomendations.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(getRecomendations.fulfilled, (state, action) => {
                state.recommends = action.payload.recommends
                state.status = 'succeeded'
            })
    }
})

export const { setOpen, setMovieId } = movie.actions
export default movie.reducer