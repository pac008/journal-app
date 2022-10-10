import { singInWithGoogle } from "../../../src/firebase/providers";
import { checkingCredentials, login, logout } from "../../../src/store/auth";
import { checkingAuthentication, startGoogleSignIn } from "../../../src/store/auth/thunks";
import { demoUser } from "../../fixtures/authFixtures";


jest.mock('../../../src/firebase/providers')

describe('test  in AuthThunks', () => { 

    beforeEach( () => jest.clearAllMocks() );

    test('should call the checkingCredentials', async () => {
        const dispatch = jest.fn();
        await checkingAuthentication()( dispatch )
        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
    });

    test('startGoogleSignIn should call checkingCredential and login - success', async () => {
        const loginData = { ok: true, ...demoUser };
        await singInWithGoogle.mockResolvedValue( loginData );
        
        const dispatch = jest.fn();
        //Thunk
        await startGoogleSignIn()( dispatch )

        
        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( login(loginData) );
    });
    test('startGoogleSignIn should call checkingCredential and logout - Error', async () => {
        const loginData = { ok: false, errorMessage: 'Error in google' };
        await singInWithGoogle.mockResolvedValue( loginData );
        
        const dispatch = jest.fn();
        //Thunk
        await startGoogleSignIn()( dispatch )

        
        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( logout({errorMessage:loginData.errorMessage}) );
    });

 });