import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { rootReducer } from "./rootReducer";


const store = (process.env.NODE_ENV === 'development')?
configureStore({reducer: rootReducer, middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)})
:configureStore({reducer: rootReducer})

export default store;