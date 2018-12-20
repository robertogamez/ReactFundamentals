import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

let model = {
    running: false,
    time: 0
};

let view = (model) => {
    let minutes = Math.floor(model.time / 60);
    let seconds = model.time - (minutes * 60);
    let secondsFormatted = `${seconds < 10 ? '0' : ''}${seconds}`;
    let handler = (event) => {
        container.dispatch(model.running ? intents.STOP : intents.START);
    }

    return <div>
        <p>{minutes}:{secondsFormatted}</p>
        <button onClick={handler}>{model.running ? 'Stop' : 'Start'}</button>
    </div>
}

let intents = {
    TICK: 'TICK',
    START: 'START',
    STOP: 'STOP',
    RESET: 'RESET'
};

const update = (model = { running: false, time: 0 }, intent) => {
    const updates = {
        'TICK': (model) => Object.assign(model, {
            time: model.time + (model.running ? 1 : 0)
        }),
        'STOP': (model) => Object.assign(model, {running: false}),
        'START': (model) => Object.assign(model, {running: true})
    };

    return (updates[intent] || (() => model))(model);
}

const createStore = (reducer) => {
    let internalState;
    let handlers = [];

    return {
        dispatch: (intent) => {
            internalState = reducer(internalState, intent);
            handlers.forEach(h => {
                h();
            });
        },
        subscribe: (handler) => {
            handlers.push(handler);
        },
        getState: () => internalState
    }
}

let container = createStore(update);

const render = () => {
    ReactDOM.render(view(container.getState()), document.getElementById('root'));
}

container.subscribe(render);

setInterval(() => {
    container.dispatch(intents.TICK);
}, 1000);

serviceWorker.unregister();
