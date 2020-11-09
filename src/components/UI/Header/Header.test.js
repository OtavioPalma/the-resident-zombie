import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import { Header } from './Header';

configure({ adapter: new Adapter() });

describe('Card', () => {
  const wrapper = shallow(
    <Header>
      <span>Title</span>
    </Header>,
  );

  it('should have rendered Header with span Title', () => {
    expect(wrapper.find('div').props()).toHaveProperty(
      'children',
      <span>Title</span>,
    );
  });

  it('should have proper props for Header', () => {
    expect(wrapper.find('div').props()).toHaveProperty('className', 'header');
  });
});
