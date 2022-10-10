import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
   name: 'journal',
   initialState: {
        isSaving: false,
        messageSaved: '',
        notes: [],
        // active: {
        //     id: 'abc',
        //     title: '',
        //     body: '',
        //     date: 123,
        //     imageUrls: [], // https://foto1.jpg, https://foto2.jpg, etc
        // }
   },
reducers: {
    savingNewNote: (state) => {
        state.isSaving = true;
    },
    addNewEmptyNode: (state, action) => {
        state.notes.push(action.payload);
        state.isSaving = false;
    },
    setActiveNote: (state, action) => {
        state.active = action.payload;
        state.messageSaved = '';
    },
    setNotes: (state, action) => {
        state.notes = action.payload;
        state.isSaving = false;
    },
    setSaving: (state, action) => {
        state.isSaving = true;
        state.messageSaved = '';
    },
    updateNote: (state, action) => {
        state.isSaving = false;
        state.notes = state.notes.map( note => note.id === action.payload.id 
                                                    ? action.payload 
                                                    : note
                                     )
        state.messageSaved = `${action.payload.title}, Updated correctly`
    },
    setPhotosToActiveNote: (state, action) => {
        state.active.imageUrls = [ ...state.active.imageUrls, ...action.payload ];
        state.isSaving = false;

    },
    clearNoteLogout: (state) => {
        state.isSaving = false;
        state.messageSaved = '';
        state.notes = [];
        state.active = null;
    },
    deleteNoteById: (state, action) => {
        state.isSaving = false;
        state.messageSaved = 'Deleted Correctly';
        state.notes = state.notes.filter(note => note.id !== action.payload);
        state.active = null;
    },
}
});


// Action creators are generated for each case reducer function
export const {  
                addNewEmptyNode,
                clearNoteLogout,
                deleteNoteById,
                savingNewNote,
                setActiveNote,
                setNotes,
                setPhotosToActiveNote,
                setSaving,
                updateNote,
                                } = journalSlice.actions;