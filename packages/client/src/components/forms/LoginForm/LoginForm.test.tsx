/* eslint-disable import/no-extraneous-dependencies */
/**
 * @jest-environment node
 */
import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from '@cfaester/enzyme-adapter-react-18';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import { store } from '../../../store';
import { LoginForm } from './LoginForm';

configure({ adapter: new Adapter() });
describe('Login Form', () => {
  // TODO: временно убираем, вернем в следующих задачах
  // test('Должен верно отрисовываться', () => {
  //   const WrappedForm = () => (
  //     <Provider store={store}>
  //       <BrowserRouter>
  //         <LoginForm />
  //       </BrowserRouter>
  //     </Provider>
  //   );

  //   const tree = render(<WrappedForm />);
  //   expect(tree).toMatchSnapshot();
  // });

  describe('Проверка ф-ти', () => {
    test('Должен обновлять поле с паролем', () => {
      const WrappedForm = () => (
        <Provider store={store}>
          <BrowserRouter>
            <LoginForm />
          </BrowserRouter>
        </Provider>
      );

      const passwordInput = mount<React.FC>(<WrappedForm />)
        .find(LoginForm)
        .find('input[name="password"]');

      act(() => {
        passwordInput.simulate('change', {
          persist: () => undefined,
          target: {
            name: 'password',
            value: '12345678',
          },
        });
      });
      expect(passwordInput.html()).toMatch('12345678');
    });

    test('Должен обновлять поле с логином', () => {
      const WrappedForm = () => (
        <Provider store={store}>
          <BrowserRouter>
            <LoginForm />
          </BrowserRouter>
        </Provider>
      );

      const loginInput = mount<React.FC>(<WrappedForm />)
        .find(LoginForm)
        .find("input[name='login']");

      act(() => {
        loginInput.simulate('change', {
          persist: () => undefined,
          target: {
            name: 'login',
            value: 'newName',
          },
        });
      });

      expect(loginInput.html()).toMatch('newName');
    });
  });
});
