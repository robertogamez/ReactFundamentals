import React from 'react';
import ReactDOM from 'react-dom';
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';
import './index.css';
import * as serviceWorker from './serviceWorker';

let model = {
    running: false,
    time: 0
};

function mapStateToProps(state) {
    return state;
}

function mapDispatchToProps(dispatch) {
    return {
        onStart: () => {
            dispatch({type: 'START'});
        },
        onStop: () => {
            dispatch({type: 'STOP'});
        }
    };
}

let StopWatch = ReactRedux
    .connect(mapStateToProps, mapDispatchToProps)((props) => {
        let minutes = Math.floor(props.time / 60);
        let seconds = props.time - (minutes * 60);
        let secondsFormatted = `${seconds < 10 ? '0' : ''}${seconds}`;

        return <div>
            <p>{minutes}:{secondsFormatted}</p>
            <button onClick={props.running ? props.onStop : props.onStart}>
                {props.running ? 'Stop' : 'Start'}
            </button>
        </div>
    });

let intents = {
    TICK: 'TICK',
    START: 'START',
    STOP: 'STOP',
    RESET: 'RESET'
};

const update = (model = { running: false, time: 0 }, action) => {
    const updates = {
        'TICK': (model) => Object.assign({}, model, {
            time: model.time + (model.running ? 1 : 0)
        }),
        'STOP': (model) => Object.assign({}, model, { running: false }),
        'START': (model) => Object.assign({}, model, { running: true })
    };

    return (updates[action.type] || (() => model))(model);
}

let container = Redux.createStore(update);

ReactDOM.render(
    <ReactRedux.Provider store={container}>
        <StopWatch />
    </ReactRedux.Provider>,
    document.getElementById('root'));

setInterval(() => {
    container.dispatch({ type: intents.TICK });
}, 1000);

serviceWorker.unregister();
