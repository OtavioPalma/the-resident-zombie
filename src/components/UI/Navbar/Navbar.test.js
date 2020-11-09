import React from 'react';
import { NavLink, BrowserRouter } from 'react-router-dom';
import { mount, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import { Navbar } from './Navbar';
import { Logo } from '../Logo/Logo';

configure({ adapter: new Adapter() });

describe('Navbar with Props', () => {
  const wrapper = mount(
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>,
  );

  it('should have proper props for Navbar', () => {
    expect(wrapper.find('div').at(0).props()).toHaveProperty(
      'className',
      'navbar',
    );
  });

  it('should have rendered 1 Logo', () => {
    expect(wrapper.find(Logo).length).toEqual(1);
  });

  it('should have rendered 5 NavLinks', () => {
    expect(wrapper.find(NavLink).length).toEqual(5);
  });
});
