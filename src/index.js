import React from 'react'
import ReactDOM from 'react-dom'
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bootstrap-css-only/css/bootstrap.min.css'
import 'mdbreact/dist/css/mdb.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import * as $ from 'jquery'
import {BrowserRouter} from 'react-router-dom'

global.$ = $
global.showPage = (slector) => {
    $($($(slector)[0].parentNode.children)).hide()
    $(slector).show()
};

ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
