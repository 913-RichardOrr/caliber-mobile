/**
 * @jest-environment jsdom
 */
import Enzyme from 'enzyme';
import React from 'react';
import 'react-native';
import 'jest-enzyme';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import store from '../../store/store';
import CategoryTable from '../../categoriesFeature/CategoryTable';

describe('CategoryTable component', () => {
  let wrapper: any;

  beforeAll(() => {
    wrapper = Enzyme.mount(
      <Provider store={store}>
        <CategoryTable status={true}></CategoryTable>
      </Provider>
    );
  });

  test('that it has toggle instructions', () => {
    const toggle = wrapper.findWhere(
      (node: any) => node.prop('testID') === 'Toggle'
    );
    expect(toggle.length).toBe(1);
  });
});
