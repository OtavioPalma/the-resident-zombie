import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import { Resource } from './Resource';
import { IconButton } from '../UI/IconButton/IconButton';
import { Item } from '../Item/Item';
import { TextField } from '../UI/TextField/TextField';

import fiji_water from '../../assets/icons/fiji_water.svg';

configure({ adapter: new Adapter() });

describe('Resource with no Props', () => {
  const wrapper = shallow(<Resource />);

  it('should have 2 Icon Buttons', () => {
    expect(wrapper.find(IconButton).length).toEqual(2);
  });

  it('should have 1 Item', () => {
    expect(wrapper.find(Item).length).toEqual(1);
  });

  it('should have 1 TextField', () => {
    expect(wrapper.find(TextField).length).toEqual(1);
  });

  it('should have proper props for div', () => {
    expect(wrapper.find('div').props()).toHaveProperty('className', 'resource');
  });
});

describe('Resource with Props', () => {
  const initialProps = {
    handleDecrease: jest.fn(),
    handleIncrease: jest.fn(),
    name: 'Fiji Water',
    icon: fiji_water,
    amount: 0,
  };

  const wrapper = shallow(<Resource {...initialProps} />);

  it('should have the received name and icon as Item props', () => {
    expect(wrapper.find(Item).length).toEqual(1);
    expect(wrapper.find(Item).props()).toEqual({
      icon: 'fiji_water.svg',
      itemName: 'Fiji Water',
    });
  });

  it('should have the amount rendered as a TextField', () => {
    expect(wrapper.find(TextField).length).toEqual(1);
    expect(wrapper.find(TextField).props()).toEqual({
      children: ['x', 0],
    });
  });

  it('should have the received functions as IconButton props', () => {
    expect(wrapper.find(IconButton).length).toEqual(2);
    expect(wrapper.find(IconButton).at(0).props()).toEqual({
      handleClick: expect.any(Function),
      content: '-',
    });

    expect(wrapper.find(IconButton).at(1).props()).toEqual({
      handleClick: expect.any(Function),
      content: '+',
    });
  });
});
