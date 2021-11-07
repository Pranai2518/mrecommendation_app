import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const getMovie = createAsyncThunk('movie/getMovie', async ({ uid, mid }) => {
    var data
    await axios.get(`http://localhost:4500/user/${uid}/movie/${mid}`)
        .then(res => data = res.data)
    return data
})

const initialState = {
    id: '',
    details: [],
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
            state.id = action.payload
        }
    },
    extraReducers(builder) {
        builder
            .addCase(getMovie.fulfilled, (state, action) => {
                state.details = action.payload
                state.status = 'succeeded'
            })
    }
})

export const { setOpen, setMovieId } = movie.actions
export default movie.reducer