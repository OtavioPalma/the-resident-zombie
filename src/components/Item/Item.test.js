import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import { Item } from './Item.js';

import fiji_water from '../../assets/icons/fiji_water.svg';

configure({ adapter: new Adapter() });

describe('Item with no Props', () => {
  const wrapper = shallow(<Item />);

  it('should have 1 icon', () => {
    expect(wrapper.find('img').length).toEqual(1);
  });

  it('should not have any span (since amount < 0 and itemName is null)', () => {
    expect(wrapper.find('span').length).toEqual(0);
  });

  it('should have proper props for div', () => {
    expect(wrapper.find('div').props()).toHaveProperty('className', 'item');
  });
});

describe('Item with Props', () => {
  const initialProps = {
    handleClick: jest.fn(),
    icon: fiji_water,
    itemName: 'Fiji Water',
    amount: 0,
  };

  const wrapper = shallow(<Item {...initialProps} />);

  it('should have the imported icon as src', () => {
    expect(wrapper.find('img').length).toEqual(1);
    expect(wrapper.find('img').props()).toEqual({ src: 'fiji_water.svg' });
  });

  it('should have the received itemName as children', () => {
    expect(wrapper.find('.item_name').length).toEqual(1);
    expect(wrapper.find('.item_name').props()).toEqual({
      className: 'item_name',
      children: 'Fiji Water',
    });
  });

  it('should have the received amount as children', () => {
    expect(wrapper.find('.item_amount').length).toEqual(1);
    expect(wrapper.find('.item_amount').props()).toEqual({
      className: 'item_amount',
      children: 0,
    });
  });

  it('should hide the itemName if it is null', () => {
    const newWrapper = shallow(<Item />);
    expect(newWrapper.find('.item_name').length).toEqual(0);
  });

  it('should hide the amount if lesser than 0', () => {
    const newWrapper = shallow(<Item amount={-1} />);
    expect(newWrapper.find('.item_amount').length).toEqual(0);
  });
});
