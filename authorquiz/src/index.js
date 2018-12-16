import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AuthorQuiz from './AuthorQuiz';
import AddAuthorForm from './AddAuthorForm';
import * as serviceWorker from './serviceWorker';
import { shuffle, sample } from 'underscore';
import { BrowserRouter, Route, withRouter } from 'react-router-dom';

import Sum from './Sum';
import Clicker from './Clicker';
import ConditionalDisplay from './Examples/ConditionalDisplay';

const authors = [
  {
    name: 'Mark Twain',
    imageUrl: 'images/authors/marktwain.jpg',
    imageSource: 'Wikimedia Commons',
    books: ['The Adventures of Huckleberry Finn']
  },
  {
    name: 'Joseph Conrad',
    imageUrl: 'images/authors/josephconrad.png',
    imageSource: 'Wikimedia Commons',
    books: ['Heart of Darkness']
  },
  {
    name: 'J.K. Rowling',
    imageUrl: 'images/authors/jkrowling.jpg',
    imageSource: 'Wikimedia Commons',
    imageAttribution: 'Daniel Ogren',
    books: ['Harry Potter and the Sorcerers Stone']
  },
  {
    name: 'Stephen King',
    imageUrl: 'images/authors/stephenking.jpg',
    imageSource: 'Wikimedia Commons',
    imageAttribution: 'Pinguino',
    books: ['The Shining', 'IT']
  },
  {
    name: 'Charles Dickens',
    imageUrl: 'images/authors/charlesdickens.jpg',
    imageSource: 'Wikimedia Commons',
    books: ['David Copperfield', 'A Tale of Two Cities']
  },
  {
    name: 'William Shakespeare',
    imageUrl: 'images/authors/williamshakespeare.jpg',
    imageSource: 'Wikimedia Commons',
    books: ['Hamlet', 'Macbeth', 'Romeo and Juliet']
  }
];

let state = resetState();

function getTurnData(authors) {
  const allBooks = authors.reduce(function (p, c, i) {
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

function onAnswerSelected(answer) {
  const isCorrect = state.turnData.author.books.some((book) => book === answer);
  state.highlight = isCorrect ? 'correct' : 'wrong';

  render();
}

function resetState(){
  return {
    turnData: getTurnData(authors),
    highlight: ''
  };
}

function App() {
  return <AuthorQuiz {...state} 
      onAnswerSelected={onAnswerSelected}
      onContinue={() => {
        state = resetState();
        render();
      }} />;
}

const AuthorWrapper = withRouter(({ history }) => {
    return <AddAuthorForm onAddAuthor={(author) => {
      authors.push(author);
      history.push('/');
    }} />;
  }
);

function render() {
  ReactDOM.render(
    <BrowserRouter>
      <React.Fragment>
        <Route exact path='/' component={App} />
        <Route path='/add' component={AuthorWrapper} />
      </React.Fragment>
    </BrowserRouter>,
    document.getElementById('root'));
}

render();
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
