import { authSlice, checkingCredentials, login, logout } from "../../../src/store/auth/authSlice"
import { authenticatedState, demoUser, initialState, notAuthenticatedState } from "../../fixtures/authFixtures"

describe('test in authSlice', () => { 
    test('should return the initialState and named "auth"', () => { 
        const state = authSlice.reducer( initialState, {});
        // expect( authSlice.getInitialState() ).toEqual(initialState);
        expect( authSlice.name ).toBe('auth');
        expect( state ).toEqual(initialState);
     });

     test('should to do the authentication ', () => {
         const state = authSlice.reducer( initialState, login( demoUser ) );
         expect(state).toEqual({
            ...demoUser, 
            errorMessage: null,
            status: 'authenticated', 
        });
     });

     test('should to do the logout without args ', () => {
         const state = authSlice.reducer( authenticatedState, logout() );
         expect(state).toEqual({...notAuthenticatedState, errorMessage: undefined,});
     });

     test('should to do the logout with args ', () => {
         const errorMessage = 'Credentials incorrect'
         const state = authSlice.reducer( authenticatedState, logout({errorMessage}) );
         expect(state).toEqual({...notAuthenticatedState, errorMessage});
     });
     
     test('should will change the state.status to "checking"  ', () => {
         const state = authSlice.reducer( initialState, checkingCredentials() );
         expect(state.status).toBe('checking');
     });

 });