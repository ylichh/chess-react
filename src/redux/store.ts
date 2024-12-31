import { configureStore } from '@reduxjs/toolkit'
import estadoPartidaReducer from'./slices/partida'

export const store=configureStore({
  reducer: {
    estadoPartida: estadoPartidaReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store