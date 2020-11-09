import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import { ItemsList } from './ItemsList.js';
import { Item } from '../Item/Item.js';

configure({ adapter: new Adapter() });

describe('ItemsList with no Props', () => {
  const wrapper = shallow(
    <ItemsList handleClick={() => {}} inventory={[]} title={{}} />,
  );

  it('should have a title', () => {
    expect(wrapper.find('span').length).toEqual(1);
  });

  it('should have 4 items', () => {
    expect(wrapper.find(Item).length).toEqual(4);
  });

  it('should have proper props for div', () => {
    expect(wrapper.find('div').props()).toHaveProperty('className', 'items');
  });
});

describe('Item with Props', () => {
  const initialProps = {
    handleClick: jest.fn(),
    inventory: [{ amount: 1 }, { amount: 2 }, { amount: 3 }, { amount: 4 }],
    title: 'Inventory',
  };

  const wrapper = shallow(<ItemsList {...initialProps} />);

  it('should have the received title as children', () => {
    expect(wrapper.find('span').length).toEqual(1);
    expect(wrapper.find('span').props()).toEqual({
      className: 'title',
      children: 'Inventory',
    });
  });

  it('should have the Items rendered with the received props', () => {
    expect(wrapper.find(Item).length).toEqual(4);

    expect(wrapper.find(Item).at(0).props()).toEqual({
      amount: 1,
      handleClick: expect.any(Function),
      itemName: 'Fiji Water (14)',
      icon: 'fiji_water.svg',
    });

    expect(wrapper.find(Item).at(1).props()).toEqual({
      amount: 2,
      handleClick: expect.any(Function),
      itemName: 'Cambpell Soup (12)',
      icon: 'campbell_soup.svg',
    });

    expect(wrapper.find(Item).at(2).props()).toEqual({
      amount: 3,
      handleClick: expect.any(Function),
      itemName: 'First Aid (10)',
      icon: 'first_aid.svg',
    });

    expect(wrapper.find(Item).at(3).props()).toEqual({
      amount: 4,
      handleClick: expect.any(Function),
      itemName: 'AK47 (8)',
      icon: 'ak_47.svg',
    });
  });
});
