import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();


export const singInWithGoogle = async ( ) => {

    try {
        const result = await signInWithPopup (FirebaseAuth, googleProvider);
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        const { displayName, email, photoURL, uid} = result.user;
        return {
            ok: true,
            // User Info
            displayName, email, photoURL, uid
        }
    } catch (error) {
            console.log('error',error);
            
            return {
                ok: false,
                // User Info
                errorMessage: error.message
            }
    }
}

export const registerUserWithEmailPassword = async ({ email, password, displayName }) => {

    try {
        
        const resp = await createUserWithEmailAndPassword(FirebaseAuth,email,password);
        const { photoURL, uid} = resp.user;
        
        return {
            ok: true,
            // User Info
            displayName, photoURL, uid
        }
    } catch (error) {
            console.log('error',error);
            
            return {
                ok: false,
                // User Info
                errorMessage: error.message
            }
    }
}
export const loginWithEmailPassword = async ({ email, password }) => {

    try {
        
        const resp = await signInWithEmailAndPassword(FirebaseAuth,email,password);
        console.log(resp);
        const { displayName, photoURL, uid} = resp.user;
        
        return {
            ok: true,
            // User Info
            displayName, photoURL, uid
        }
    } catch (error) {
            console.log('error',error);
            
            return {
                ok: false,
                // User Info
                errorMessage: error.message
            }
    }
}
export const logoutFirebase = async () => {
    return await FirebaseAuth.signOut();
}