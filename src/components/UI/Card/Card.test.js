import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import { Card } from './Card';

configure({ adapter: new Adapter() });

describe('Card with no Props', () => {
  const wrapper = shallow(<Card />);

  it('should have proper props for Card', () => {
    expect(wrapper.find('div').props()).toHaveProperty('className', 'card');
  });
});

describe('Card with Props', () => {
  const initialProps = {
    grid: '1fr 1fr',
  };

  const wrapper = shallow(
    <Card {...initialProps}>
      <span>Title</span>
    </Card>,
  );

  it('should have rendered Card with span Title', () => {
    expect(wrapper.find('div').props()).toHaveProperty(
      'children',
      <span>Title</span>,
    );
  });

  it('should have rendered Card with grid template columns 1fr 1fr', () => {
    expect(wrapper.find('div').get(0).props.style).toHaveProperty(
      'gridTemplateColumns',
      '1fr 1fr',
    );
  });
});
