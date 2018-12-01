import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

function Hello(props) {
    return <h1>Hello at {props.now}</h1>
}

describe("When setting up testing", () => {
    it('should fail', () => {
        expect(1 + 1).toBe(2);
    });
});

const moment = new Date(2018, 12, 1);

describe("When testing directly", () => {
    let result;

    beforeAll(() => {
        result = Hello({
            now: moment.toISOString()
        });
    })

    it("return a value", () => {
        expect(result).not.toBeNull();
    });

    it("it a h1", () => {
        expect(result.type).toBe("h1");
    });

    it("has children", () => {
        expect(result.props.children).toBeTruthy();
    })
});

describe("When testing with ReactDOM", () => {
    it("renders without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(<Hello now={moment.toString()} />, div);
    });
});

Enzyme.configure({
    adapter: new Adapter()
});

describe("When testing with enzyme", () => {
    it("renders a h1", () => {
        const wrapper = shallow(<Hello now={moment.toString()} />);
        expect(wrapper.find("h1").length).toBe(1);
    });

    it("contains Hello at...", () => {
        const wrapper = shallow(<Hello now={moment.toString()} />);
        expect(wrapper.contains(<h1>Hello at</h1>)).toBe(false);
    });
});

