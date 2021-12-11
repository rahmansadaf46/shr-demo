import React, {Suspense, lazy} from 'react';
import ReactDOM from 'react-dom';
import Spinner from './views/spinner/Spinner';
import './assets/scss/style.scss';
// setup fake backend
import { configureFakeBackend } from './jwt/_helpers';
configureFakeBackend();
//const App = lazy(() =>(import('./app')));
const App = lazy(() =>new Promise(resolve => {
	setTimeout(() => resolve (import("./app")), 0)}));
ReactDOM.render( 
	<Suspense fallback={<Spinner />}><App /></Suspense> , document.getElementById('root')
);