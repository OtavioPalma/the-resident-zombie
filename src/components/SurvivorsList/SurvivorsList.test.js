import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import { SurvivorsList } from './SurvivorsList';
import { SurvivorCard } from './SurvivorCard/SurvivorCard';

configure({ adapter: new Adapter() });

describe('SurvivorsList with no Props', () => {
  const wrapper = shallow(<SurvivorsList />);

  it('should not render any Survivor', () => {
    expect(wrapper.find(SurvivorCard).length).toEqual(0);
  });

  it('should have proper props for div', () => {
    expect(wrapper.find('div').props()).toHaveProperty(
      'className',
      'survivors_list',
    );
  });
});

describe('SurvivorsList with Props', () => {
  const initialProps = {
    survivors: [{ _id: 0 }, { _id: 1 }, { _id: 2 }],
    fullInfo: true,
    survivor: { _id: 1 },
    handleClick: jest.fn(),
  };

  const wrapper = shallow(<SurvivorsList {...initialProps} />);

  it('should have rendered 3 Survivors', () => {
    expect(wrapper.find(SurvivorCard).length).toEqual(3);
  });

  it('should have rendered each Survivor with the received props', () => {
    expect(wrapper.find(SurvivorCard).at(0).props()).toEqual({
      survivor: { _id: 0 },
      fullInfo: true,
      handleClick: expect.any(Function),
      selected: false,
    });

    expect(wrapper.find(SurvivorCard).at(1).props()).toEqual({
      survivor: { _id: 1 },
      fullInfo: true,
      handleClick: expect.any(Function),
      selected: true,
    });

    expect(wrapper.find(SurvivorCard).at(2).props()).toEqual({
      survivor: { _id: 2 },
      fullInfo: true,
      handleClick: expect.any(Function),
      selected: false,
    });
  });
});
