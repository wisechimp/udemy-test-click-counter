import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

import App from './App';

Enzyme.configure({ adapter: new EnzymeAdapter() });

/**
* Factory function to create a ShallowWrapper for the App component
* @function setup
* @param {object} props - Component props sepcific to this setup
* @param {object} state - Initial state for setup.
* @returns {ShallowWrapper}
*/
const setup = (props={}, state=null) => {
  const wrapper = shallow(<App {...props} />);
  if (state) wrapper.setState(state);
  return wrapper;
}

/**
 * Return ShallowWrapper containing node(s) with the given data-test value.
 * @param  {ShallowWrapper} wrapper - Enzyme shallow wrapper to search within.
 * @param  {string} val - Value of data-test attribute for search.
 * @return {ShallowWrapper}
 */
const findByTestAttribute = (wrapper, val) => {
  return wrapper.find(`[data-test="${val}"]`);
}

const counter = 7;

test('renders without error', () => {
  const wrapper = setup();
  const appComponent = findByTestAttribute(wrapper, 'component-app');
  expect(appComponent.length).toBe(1);
});

test('renders increment button', () => {
  const wrapper = setup();
  const button = findByTestAttribute(wrapper, 'increment-button');
  expect(button.length).toBe(1);
});

test('renders decrement button', () => {
  const wrapper = setup();
  const button = findByTestAttribute(wrapper, 'decrement-button');
  expect(button.length).toBe(1);
});

test('renders counter display', () => {
  const wrapper = setup();
  const counterDisplay = findByTestAttribute(wrapper, 'counter-display');
  expect(counterDisplay.length).toBe(1);
});
test('counter starts at 0', () => {
  const wrapper = setup();
  const initialCounterState = wrapper.state('counter');
  expect(initialCounterState).toBe(0);
});

test('clicking increment button increments counter display', () => {
  //const counter = 7;
  const wrapper = setup(null, { counter });

  // Find the increment button and click it
  const button = findByTestAttribute(wrapper, 'increment-button');
  button.simulate('click');
  wrapper.update();

  // Find the display and test the value
  const counterDisplay = findByTestAttribute(wrapper, 'counter-display');
  expect(counterDisplay.text()).toContain(counter + 1);
});

test('clicking decrement button decrements counter display', () => {
  const wrapper = setup(null, { counter });

  //Find the decrement button and click it
  const button = findByTestAttribute(wrapper, 'decrement-button');
  button.simulate('click');
  wrapper.update();

  //Find the display and check the Value
  const counterDisplay = findByTestAttribute(wrapper, 'counter-display');
  expect(counterDisplay.text()).toContain(counter - 1);
});

test('does not render error display when counter is zero or higher', () => {
  const wrapper = setup();
  const errorMessageDisplay = findByTestAttribute(wrapper, 'error-display');
  expect(errorMessageDisplay.length).toBe(0);
});
