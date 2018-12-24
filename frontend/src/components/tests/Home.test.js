import React from 'react';
import { configure, shallow } from 'enzyme';
import { expect } from 'chai';
import Home from '../default/Home';
import { Link } from 'react-router-dom';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('Home component testing', function() {
    it('renders welcome message', function() {
        const wrapper = shallow(<Home />); 
        const welcome = <h1>Welcome to React Rails Template</h1>;
        expect(wrapper.contains(welcome)).to.equal(true);
        expect(wrapper.find(Link)).to.have.lengthOf(2);
    });
});