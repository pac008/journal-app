import { loginWithEmailPassword, singInWithGoogle, logoutFirebase } from "../../../src/firebase/providers";
import { checkingCredentials, login, logout } from "../../../src/store/auth";
import { checkingAuthentication, startGoogleSignIn, startLoginWithEmailPassword, startLogout } from "../../../src/store/auth/thunks";
import { clearNoteLogout } from "../../../src/store/journal/journalSlice";
import { demoUser } from "../../fixtures/authFixtures";


jest.mock('../../../src/firebase/providers')

describe('test  in AuthThunks', () => { 
    const dispatch = jest.fn();
    beforeEach( () => jest.clearAllMocks() );

    test('should call the checkingCredentials', async () => {
        await checkingAuthentication()( dispatch )
        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
    });

    test('startGoogleSignIn should call checkingCredential and login - success', async () => {
        const loginData = { ok: true, ...demoUser };
        await singInWithGoogle.mockResolvedValue( loginData );
        
        //Thunk
        await startGoogleSignIn()( dispatch )

        
        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( login(loginData) );
    });
    test('startGoogleSignIn should call checkingCredential and logout - Error', async () => {
        const loginData = { ok: false, errorMessage: 'Error in google' };
        await singInWithGoogle.mockResolvedValue( loginData );
        
        //Thunk
        await startGoogleSignIn()( dispatch )

        
        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( logout({errorMessage:loginData.errorMessage}) );
    });

    test('startLoginWithEmailPassword should call checkingCredential and login - Success', async () => {
        const loginData = { ok: true, ...demoUser};
        const formData = { email: demoUser.email, password: '123456'}
        await loginWithEmailPassword.mockResolvedValue( loginData );        
        //Thunk
        await startLoginWithEmailPassword(formData)( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
          expect( dispatch ).toHaveBeenCalledWith( login(loginData) );
    });

    
    test('startLogout should call logoutFireabe and Logout - Success', async () => {
        
        await startLogout()( dispatch );

        expect( logoutFirebase ).toHaveBeenCalled();
        expect( dispatch ).toHaveBeenCalledWith( clearNoteLogout() );
        
    });


 });