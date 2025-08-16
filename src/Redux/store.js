import { configureStore } from "@reduxjs/toolkit";
import crudReducer from "./Slices/CRUD"
export const store = configureStore ({
    reducer:crudReducer
})