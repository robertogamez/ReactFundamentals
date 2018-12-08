import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AuthorQuiz from './AuthorQuiz';
import * as serviceWorker from './serviceWorker';
import { shuffle, sample } from 'underscore';

import Sum from './Sum';
import Clicker from './Clicker';
import ConditionalDisplay from './Examples/ConditionalDisplay';

const authors = [
    {
        name: 'Robert G',
        imageUrl: 'images/authors/marktwain.jpg',
        imageSource: 'Wikimedia Commons',
        books: [
            'The adventures of Huckleberry Finn',
            'Book 2',
            'Book 3'
        ]
    }
];

const state = {
    turnData: getTurnData(authors)
};

function getTurnData(authors){
    const allBooks = authors.reduce(function(p, c, i){
        return p.concat(c.books);
    }, []);

    const fourRandomBooks = shuffle(allBooks).slice(0, 4);
    const answer = sample(fourRandomBooks);

    return {
        books: fourRandomBooks,
        author: authors.find((author) => author.books.find((title) => title === answer))
    };
}

// const props = {
//     a: 4,
//     b: 2
// };

// const state = {
//     showSum: true
// };

// ReactDOM.render(
//     <ConditionalDisplay isVisible={state.showSum}>
//         <h1>Conditional Display</h1>
//     </ConditionalDisplay>,
//     document.getElementById('root')
// )

// ReactDOM.render(<Clicker handleClick={(letter) => { console.log(`${letter} clicked`) }} />,
//     document.getElementById('root'));

// ReactDOM.render(<Sum {...props} />,
//     document.getElementById('root'));

ReactDOM.render(<AuthorQuiz {...state} />,
     document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
