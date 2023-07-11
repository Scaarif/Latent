import React from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../components/Button';


import { login as loginReducer } from '../redux/features/userSlice';

const Login = () => {
  const emailField = React.useRef(null);
  const passwordField = React.useRef(null);
  const button = <Button name="Log In" />;
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const login = () => {
    // TODO: Add validation

    const formData = new URLSearchParams({
      email: emailField.current.value,
      password: passwordField.current.value,
    });

    fetch('http://localhost:3000/api/v1/login', {
      method: 'POST',
      body: formData,
      credentials: 'include',
    }).then((response) => {
      if (!response.ok) {
        alert('Invalid Login');
        return;
      }
      // Update frontend
      fetch('http://localhost:3000/api/v1/users', {
        method: 'GET',
        credentials: 'include',
      }).then((response) => {
        if (!response.ok) {
          alert('Invalid Login');
          return;
        }
        response.json().then((userData) => {
          dispatch(loginReducer({ user: userData }));
        });
      });
    });
  };

  console.log(user);

  if (user) {
    return (<Navigate to="/" replace={true} />);
  }

  return (
    <div className="w-full relative m-5">
        <form className="max-w-md mx-auto m-auto bg-white border border-white flex flex-col justify-center">
            <h1 className="text-center font-semibold text-[24px] text-green p-3">Login page</h1>
            <input required className="w-5/6 m-2 p-2 mx-auto text-green text-center border border-green rounded"
                   name="email" type="email" placeholder="Email" ref={emailField} />
            <input required className="w-5/6 m-2 p-2 mx-auto text-green text-center border border-green rounded"
                   name="password" type="password" placeholder="Password" ref={passwordField} />
    <div className="mt-5" onClick={login}>
        {button}
    </div>
        </form>
    </div>
  );
};

export default Login;
