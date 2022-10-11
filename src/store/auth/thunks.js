import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, singInWithGoogle } from "../../firebase/providers";
import { checkingCredentials, login, logout } from ".";
import { clearNoteLogout } from "../journal/journalSlice";



export const checkingAuthentication = () => {
    return async ( dispatch ) => {
        dispatch(checkingCredentials());
    }
}


export const startGoogleSignIn = () => {
    return async ( dispatch ) => {
        dispatch(checkingCredentials());
        const result = await singInWithGoogle();
        if ( !result.ok ) return dispatch( logout({errorMessage:result.errorMessage}) );
        dispatch( login(result) );
    }
}

export const startCreatingUserWithEmailPassword = ({email,password,displayName}) => {
    return async ( dispatch ) => {
        console.log('Hola',email);
        dispatch(checkingCredentials());
        const { ok, photoURL, uid, errorMessage}  = await registerUserWithEmailPassword({email,password,displayName});
        
        if ( !ok ) return dispatch( logout({errorMessage}) );

        dispatch( login({uid, displayName, email, photoURL}) );
    }
}

export const startLoginWithEmailPassword = ({email,password}) => {
    return async ( dispatch ) => {
        dispatch(checkingCredentials());
        const result  = await loginWithEmailPassword({email,password});

        if ( !result.ok ) return dispatch( logout({errorMessage: result.errorMessage}) );
        dispatch( login( result) );
    }
}

export const startLogout = () => {
    return async ( dispatch ) => {
        await logoutFirebase();
        dispatch( logout() );
        dispatch( clearNoteLogout() );
    }
}
