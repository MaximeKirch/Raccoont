import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user.reducer'
import usersReducer from './users.reducer'
import postReducer from './posts.reducer'
import errorReducer from './errors.reducer'
import allPostsReducer from './allPosts.reducer'
import trendingReducer from './trendings.reducer'

export default configureStore( {
    reducer : {
        user: userReducer,
        users : usersReducer,
        posts : postReducer,
        errors : errorReducer,
        allPosts : allPostsReducer,
        trending : trendingReducer
    }
})
