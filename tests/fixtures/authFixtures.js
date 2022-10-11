

export const initialState = {
        status: 'checking', // checking not-authenticated - authenticated
        uid: null,
        email: null,
        displayName: null,
        photoURL: null,
        errorMessage: null

}
export const authenticatedState = {
        status: 'authenticated', // checking not-authenticated - authenticated
        uid: 'abc',
        email: 'abc@gmail.com',
        displayName: 'abc User',
        photoURL: 'https://abc.jpg',
        errorMessage: null
}

export const notAuthenticatedState = {
    status: 'not-authenticated', // checking not-authenticated - authenticated
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null
}

export const demoUser = {
    uid: 'abc',
    email: 'abc@gmail.com',
    displayName: 'abc User',
    photoURL: 'https://abc.jpg',
    // errorMessage: null

}