/* eslint-disable import/no-extraneous-dependencies */
/**
 * @jest-environment node
 */
import React from 'react';
import { mount, render, configure } from 'enzyme';
import Adapter from '@cfaester/enzyme-adapter-react-18';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import { store } from '../../../store';
import { RegistrationForm } from './RegistrationForm';

configure({ adapter: new Adapter() });
describe('Registration Form', () => {
  test('Должен верно отрисовываться', () => {
    const WrappedForm = () => (
      <Provider store={store}>
        <BrowserRouter>
          <RegistrationForm />
        </BrowserRouter>
      </Provider>
    );

    const tree = render(<WrappedForm />);
    expect(tree).toMatchSnapshot();
  });

  describe('Проверка ф-ти', () => {
    const WrappedForm = () => (
      <Provider store={store}>
        <BrowserRouter>
          <RegistrationForm />
        </BrowserRouter>
      </Provider>
    );

    test('Должен обновлять поле с паролем', () => {
      const passwordInput = mount<React.FC>(<WrappedForm />)
        .find(RegistrationForm)
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
      const loginInput = mount<React.FC>(<WrappedForm />)
        .find(RegistrationForm)
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

    test('Должен обновлять поле с почтой', () => {
      const passwordInput = mount<React.FC>(<WrappedForm />)
        .find(RegistrationForm)
        .find('input[name="email"]');

      act(() => {
        passwordInput.simulate('change', {
          persist: () => undefined,
          target: {
            name: 'email',
            value: 'email@email.ru',
          },
        });
      });
      expect(passwordInput.html()).toMatch('email@email.ru');
    });

    test('Должен обновлять поле "повторить пароль"', () => {
      const passwordInput = mount<React.FC>(<WrappedForm />)
        .find(RegistrationForm)
        .find('input[name="passwordRepeat"]');

      act(() => {
        passwordInput.simulate('change', {
          persist: () => undefined,
          target: {
            name: 'passwordRepeat',
            value: '87654321',
          },
        });
      });
      expect(passwordInput.html()).toMatch('87654321');
    });

    test('Должен обновлять поле с телефоном', () => {
      const passwordInput = mount<React.FC>(<WrappedForm />)
        .find(RegistrationForm)
        .find('input[name="phone"]');

      act(() => {
        passwordInput.simulate('change', {
          persist: () => undefined,
          target: {
            name: 'phone',
            value: '8888888888',
          },
        });
      });
      expect(passwordInput.html()).toMatch('8888888888');
    });

    test('Должен обновлять поле с фамилией', () => {
      const passwordInput = mount<React.FC>(<WrappedForm />)
        .find(RegistrationForm)
        .find('input[name="second_name"]');

      act(() => {
        passwordInput.simulate('change', {
          persist: () => undefined,
          target: {
            name: 'second_name',
            value: 'Ivanovich',
          },
        });
      });
      expect(passwordInput.html()).toMatch('Ivanovich');
    });

    test('Должен обновлять поле с именем', () => {
      const passwordInput = mount<React.FC>(<WrappedForm />)
        .find(RegistrationForm)
        .find('input[name="first_name"]');

      act(() => {
        passwordInput.simulate('change', {
          persist: () => undefined,
          target: {
            name: 'first_name',
            value: 'Ivan',
          },
        });
      });
      expect(passwordInput.html()).toMatch('Ivan');
    });
  });
});
