import { atomWithStorage } from 'jotai/utils'

export const myDataAtom = atomWithStorage('myData', {
    name: 'John Doe',
    photoURL: '',
});

export const authTokenAtom = atomWithStorage('authToken', '');

export const userIdAtom = atomWithStorage('userId', '');