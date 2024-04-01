import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios";
import { toast } from 'react-toastify';

const baseUrl = "http://localhost:3000/"
// const baseUrl = "https://todo-list-app-backend-ra0j.onrender.com/"

// Fetch Show
export const fetchShowTodoData = createAsyncThunk("fetchShowTodoData", async (_, { rejectWithValue }) => {
    try {
        const headers = {
            'Content-Type': 'application/json',
            'authToken': localStorage.getItem('token'),
          };
        const response = await axios.get(`${baseUrl}api/todo/todoListShow`, { headers });
        return response.data;
        
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

// Fetch Add
export const fetchAddTodoData = createAsyncThunk("fetchAddTodoData", async ({ text, completed }, { rejectWithValue }) => {
    try {
        const headers = {
            'Content-Type': 'application/json',
            'authToken': localStorage.getItem('token'),
          };
        const response = await axios.post(`${baseUrl}api/todo/addTodo`, { text, completed }, {headers});
        if (response.status === 200) {
            return response.data;
        }   

    } catch (error) {
        return rejectWithValue(error.message);
    }
});

// Fetch Delete
export const fetchDeleteTodoData = createAsyncThunk("fetchDeleteTodoData", async ({ id }, { rejectWithValue }) => {
    try {
        const headers = {
            'Content-Type': 'application/json',
            'authToken': localStorage.getItem('token'),
          };
        const response = await axios.delete(`${baseUrl}api/todo/deleteTodo/${id}`, {headers});
        if (response.status === 200) {
            return id;
        }

    } catch (error) {
        return rejectWithValue(error.message);
    }
});

// Fetch Edit
export const fetchEditTodoData = createAsyncThunk("fetchEditTodoData", async ({ id, completed }, { rejectWithValue }) => {
    try {
        const headers = {
            'Content-Type': 'application/json',
            'authToken': localStorage.getItem('token'),
          };
        const response = await axios.put(`${baseUrl}api/todo/editTodo`, { id, completed }, {headers});
        if (response.status === 200) {
            return { id, completed };
        }

    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const storeTodosSlice = createSlice({
    name: 'storeTodos',
    initialState: {
        todos: [],
        todoType: 1,
    },

    reducers: {
        showTodoType: (state, action) => {
            state.todoType = action.payload
        },

        fetchTodo: (state, action) => {
            state.todos = action.payload.map(todo => {
                return { id: todo._id, text: todo.text, completed: todo.completed, user: todo.user }
            })
        },

        addTodo: (state, action) => {
            const { _id, text, completed, user } = action.payload
            state.todos.push({ id: _id , text, completed, user })
        },

        deleteTodo: (state, action) => {
            const indexToDelete = state.todos.findIndex(todo => todo.id === action.payload)
            state.todos.splice(indexToDelete, 1);
        },

        editTodo: (state, action) => {
            const { id, completed } = action.payload
            const todoToEdit = state.todos.find(todo => todo.id === id);
            if (todoToEdit) {
                todoToEdit.completed = !completed;
            }
        },
    },

    extraReducers: (builder) => {
        builder
            // Show Extra Reducer
            .addCase(fetchShowTodoData.fulfilled, (state, action) => {
                storeTodosSlice.caseReducers.fetchTodo(state, action)
            })
            .addCase(fetchShowTodoData.rejected, (state, action) => {
                toast.error(action.payload)
            })

            // Add Extra Reducer
            .addCase(fetchAddTodoData.fulfilled, (state, action) => {
                storeTodosSlice.caseReducers.addTodo(state, action)
            })
            .addCase(fetchAddTodoData.rejected, (state, action) => {
                toast.error(action.payload)
            })
            
            // Delete Extra Reducer
            .addCase(fetchDeleteTodoData.fulfilled, (state, action) => {
                storeTodosSlice.caseReducers.deleteTodo(state, action)
            })
            .addCase(fetchDeleteTodoData.rejected, (state, action) => {
                toast.error(action.payload)
            })
            
            // Edit Extra Reducer
            .addCase(fetchEditTodoData.fulfilled, (state, action) => {
                storeTodosSlice.caseReducers.editTodo(state, action)
            })
            .addCase(fetchEditTodoData.rejected, (state, action) => {
                toast.error(action.payload)
            })
    },
})


export const { showTodoType } = storeTodosSlice.actions
export default storeTodosSlice.reducer
