import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPosts = createAsyncThunk("posts/fetch", async () => {
  const res = await axios.get("http://localhost:3000/posts");
  return res.data;
});

export const createPost = createAsyncThunk("posts/create", async (newPost) => {
  const res = await axios.post("http://localhost:3000/posts", newPost);
  return res.data;
});
export const updatePost = createAsyncThunk("posts/update", async ({updates,id}) => {
  const res = await axios.patch(`http://localhost:3000/posts/${id}` , updates);
  return res.data; 
});

export const deletePost = createAsyncThunk("posts/delete", async (id) => {
  await axios.delete(`http://localhost:3000/posts/${id}`);
  return id; //id of deleted items
});

const crud = createSlice({
    name : "crud" , 
    initialState : {
       posts:[],
       formState: {  
           display:false, //for displaying post form
           type:null , //(post / patch) for specifying is this form meant to create new post  or edit existing post
           postID:null // specify the post id if you are editing existing post
       }, 

       //CRUD Status
       fetchStatus :"idle" ,
       createStatus:"idle" ,
       updateStatus:"idle" ,
       deleteStatus:"idle" , 

       errorMessage: null ,
    }, 
    reducers:{
        displayForm:(state , {payload})=>{
            state.formState.display = payload.display //show or hide form
            state.formState.type = payload.type // post or patch
            state.formState.postID = payload.postID //we will pass ID if we are editing else null
        },
    },
    extraReducers: (builder) => {
        // fetch builder
        builder.addCase(fetchPosts.fulfilled, (state, {payload}) => {
            state.fetchStatus = "fulfilled";
            state.errorMessage = null
            state.posts = payload;
        })

        //create builder
        builder.addCase(createPost.fulfilled, (state, {payload}) => {
            state.createStatus = "fulfilled";
            state.errorMessage = null
            state.posts = [...state.posts , payload]
        })

        //update builder
        builder.addCase(updatePost.fulfilled, (state, {payload}) => {
            state.updateStatus = "fulfilled";
            state.errorMessage = null
            state.posts = state.posts.map(post => post.id === payload.id ? payload : post);
        })

        //delete builder
        builder.addCase(deletePost.fulfilled, (state, {payload}) => {
            state.deleteStatus = "fulfilled";
            state.errorMessage = null
            const updated = state.posts.filter(post => post.id !== payload)
            state.posts = updated
        })
        builder.addMatcher(
            (action) => action.type.endsWith("/pending"),
            (state , {type}) => {
            state.errorMessage = null;
            if (type.startsWith("posts/fetch")) state.fetchStatus = "loading";
            if (type.startsWith("posts/create")) state.createStatus = "loading";
            if (type.startsWith("posts/update")) state.updateStatus = "loading";
            if (type.startsWith("posts/delete")) state.deleteStatus = "loading";
            }
        )
        .addMatcher(
            (action) => action.type.endsWith("/rejected"),
            (state, { error , type }) => {
            state.errorMessage = error.message;
            if (type.startsWith("posts/fetch")) state.fetchStatus = "failed";
            if (type.startsWith("posts/create")) state.createStatus = "failed";
            if (type.startsWith("posts/update")) state.updateStatus = "failed";
            if (type.startsWith("posts/delete")) state.deleteStatus = "failed";
            }
        );
     }
})
export default crud.reducer;
export const { displayForm} = crud.actions
