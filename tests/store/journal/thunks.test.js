import { collection, deleteDoc, doc, getDocs, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../../src/firebase/config";
import { loadNotes } from "../../../src/helpers";
import { addNewEmptyNode, savingNewNote, setActiveNote, setNotes, startLoadingNotes, startNewNote, startSaveNote, updateNote } from "../../../src/store/journal";


jest.mock("../../../src/helpers");

describe('test in Jornal Thuns', () => { 
    const dispatch = jest.fn();
    const getState = jest.fn();
    const uid = 'abc';
    const note =   {
        body: '',
        title: '',
        id: 'abc123',
        date: 123456
    }

    beforeEach( () => jest.clearAllMocks() );
    test('should create one note void', async() => { 
        getState.mockReturnValue({ auth: { uid: uid } });

        await startNewNote()( dispatch, getState );

        expect(dispatch).toHaveBeenCalledWith( savingNewNote() );
        expect(dispatch).toHaveBeenCalledWith( addNewEmptyNode({
            body: '',
            title: '',
            id: expect.any( String ),
            date: expect.any( Number )
        }) );
        expect(dispatch).toHaveBeenCalledWith( setActiveNote({
            body: '',
            title: '',
            id: expect.any( String ),
            date: expect.any( Number )
        }) );

        // Borrar de Firebase
        const collectionRef = collection( FirebaseDB, `${uid}/journal/notes` );
        const docs = await getDocs(collectionRef);
        const deletePromises = [];
        docs.forEach( doc => deletePromises.push(deleteDoc(doc.ref) ) );
        await Promise.all( deletePromises );
     });

     test('startLoadingNotes should load the notes', async() => { 
        getState.mockReturnValue({ auth: { uid: uid } });
        await loadNotes.mockResolvedValue([
            note
        ])
        await startLoadingNotes()( dispatch, getState );
      
        expect( dispatch ).toHaveBeenCalledWith(savingNewNote());
        expect( dispatch ).toHaveBeenCalledWith( setNotes([
                {
                    body: '',
                    title: '',
                    id: expect.any( String ),
                    date: expect.any( Number )
                }
            ])
        );
    });

    test('startSaveNote should update one note in firebase',  async() => { 
        getState.mockReturnValue({ auth: { uid: uid }, journal: { active:  note } });
        await startSaveNote()(dispatch,getState);

        const noteToFireStore = {...note };
        delete noteToFireStore.id;

        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}` );
        await setDoc( docRef, noteToFireStore, { merge: true} )
        
        dispatch(updateNote(note))
     })
})