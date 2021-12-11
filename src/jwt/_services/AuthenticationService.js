import { BehaviorSubject } from 'rxjs';


import { HandleResponse } from '../_helpers';
const BASE_URL = process.env.REACT_APP_API_URL;
const CurrentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

export const AuthenticationService = {
    login,
    logout,
    currentUser: CurrentUserSubject.asObservable(),
    get currentUserValue() { return CurrentUserSubject.value }
};

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch(BASE_URL + "/auth/login", requestOptions)
        .then(HandleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
            CurrentUserSubject.next(user);

            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    CurrentUserSubject.next(null);
}
