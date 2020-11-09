import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import { SurvivorCard } from './SurvivorCard';

configure({ adapter: new Adapter() });

describe('SurvivorCard with no Props', () => {
  const wrapper = shallow(<SurvivorCard />);

  it('should have proper props for div', () => {
    expect(wrapper.find('.survivor').length).toEqual(1);
  });
});

describe('SurvivorCard with Props', () => {
  const initialProps = {
    survivor: { gender: 'male', name: 'Otavio', age: 22, lat: 12, long: 34 },
    handleClick: jest.fn(),
    fullInfo: true,
    selected: true,
  };

  const wrapper = shallow(<SurvivorCard {...initialProps} />);

  it('should have rendered Survivor as selected', () => {
    expect(wrapper.find('.selected').props()).toHaveProperty(
      'className',
      'survivor selected',
    );

    expect(wrapper.find('.selected').props()).toHaveProperty(
      'onClick',
      expect.any(Function),
    );
  });

  it('should have rendered Survivor as male', () => {
    expect(wrapper.find('img').props()).toHaveProperty('src', 'male.svg');
  });

  it('should have rendered Survivor with all information', () => {
    expect(wrapper.find('.survivor_line').length).toEqual(2);
  });
});

describe('SurvivorCard with other Props', () => {
  const initialProps = {
    survivor: {
      gender: 'female',
      name: 'Giovanna',
      age: 23,
      lat: 12,
      long: 34,
    },
    handleClick: jest.fn(),
    fullInfo: false,
    selected: false,
  };

  const wrapper = shallow(<SurvivorCard {...initialProps} />);

  it('should have rendered Survivor as non selected', () => {
    expect(wrapper.find('.survivor').props()).toHaveProperty(
      'className',
      'survivor false',
    );

    expect(wrapper.find('.survivor').props()).toHaveProperty(
      'onClick',
      expect.any(Function),
    );
  });

  it('should have rendered Survivor as female', () => {
    expect(wrapper.find('img').props()).toHaveProperty('src', 'female.svg');
  });

  it('should have rendered Survivor with partial information', () => {
    expect(wrapper.find('.survivor_line').length).toEqual(1);
  });
});
