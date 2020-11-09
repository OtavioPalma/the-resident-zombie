import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import { Logo } from './Logo';

configure({ adapter: new Adapter() });

describe('Logo with Props', () => {
  const wrapper = shallow(<Logo handleClick={() => {}} />);

  it('should have proper props for Logo', () => {
    expect(wrapper.find('div').props()).toHaveProperty('className', 'logo');
    expect(wrapper.find('img').props()).toHaveProperty(
      'onClick',
      expect.any(Function),
    );
    expect(wrapper.find('img').props()).toHaveProperty('src', 'logo.png');
  });
});
