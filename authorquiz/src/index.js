import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AuthorQuiz from './AuthorQuiz';
import * as serviceWorker from './serviceWorker';

import Sum from './Sum';
import Clicker from './Clicker';

const props = {
    a: 4,
    b: 2
};

ReactDOM.render(<Clicker handleClick={(letter) => { console.log(`${letter} clicked`) }} />,
    document.getElementById('root'));

// ReactDOM.render(<Sum {...props} />,
//     document.getElementById('root'));

// ReactDOM.render(<AuthorQuiz />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
