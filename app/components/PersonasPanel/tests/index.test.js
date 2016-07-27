import PersonasPanel from '../index';

import expect from 'expect';
import { shallow } from 'enzyme';
import React from 'react';

describe('<PersonasPanel />', () => {
  it('should render the PersonasPanel component', () => {
    const data = [
      {
        percentage: 23,
        status: 'test',
        arpu: { data: 12.5, change: 12.3 },
        avgViewingTime: { data: 54.5, change: -9.8 },
        posters: ['test', 'test', 'test'],
        description: 'test',
      },
    ];
    const renderedComponent = shallow(<PersonasPanel data={data} />);
    expect(renderedComponent.find(PersonasPanel)).toExist();
  });
});
