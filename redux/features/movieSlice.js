import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const getMovieInfo = createAsyncThunk('movie/getMovieInfo', async ({ uid, mid }) => {
    var data
    await axios.get(`${process.env.NEXT_PUBLIC_DATA_SERVER}/user/${uid}/movie/${mid}`)
        .then(res => data = res.data)
    // console.log(data[0])
    return data[0]
})

export const getRecomendations = createAsyncThunk('movie/contentBased', async ({ id }) => {
    var data
    await axios.get(`${process.env.NEXT_PUBLIC_SERVER}/recommend?method=cb&id=${id}`)
        .then(res => data = res.data)
    return data
})

const initialState = {
    details: {},
    more: {
        status: 'idle'
    },
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
            .addCase(getMovieInfo.pending, (state) => {

                state.more.status = 'loading'
            })
            .addCase(getMovieInfo.fulfilled, (state, action) => {
                console.log('ingetinfo--')
                console.log(action.payload)
                const info = action.payload ? action.payload : { liked: 0, watched: false, myList: false }
                state.more = { ...info, status: 'succeeded' }
            })
            .addCase(getRecomendations.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getRecomendations.fulfilled, (state, action) => {
                state.recommends = action.payload.recommends
                state.status = 'succeeded'
            })
        // .addCase(getMovieInfo.fulfilled, (state, action) => {
        //     state.
        // })
    }
})

export const { setOpen, setMovieId } = movie.actions
export default movie.reducer