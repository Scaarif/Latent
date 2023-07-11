import React from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../components/Button';

import ToggleSwitch from '../components/ToggleSwitch';


import { login as loginReducer } from '../redux/features/userSlice';

const SignUp = () => {
  const emailField = React.useRef(null);
  const passwordField = React.useRef(null);
  const confirmationField = React.useRef(null);
  const firstNameField = React.useRef(null);
  const lastNameField = React.useRef(null);
  const isAgentField = React.useRef(null);

  const [signedUp, setSignedUp] = React.useState(false);
  const button = <Button name="Sign Up" />;

  const signup = () => {
    // TODO: Add validation

    const formData = new URLSearchParams({
      email: emailField.current.value,
      password: passwordField.current.value,
      firstName: firstNameField.current.value,
      lastName: lastNameField.current.value,
      isAgent: isAgentField.current.checked,
    });

    fetch('http://localhost:3000/api/v1/users', {
      method: 'POST',
      body: formData,
      credentials: 'include',
    }).then((response) => {
      if (!response.ok) {
        alert('Invalid Sign up');
        return;
      }
      setSignedUp(true);
    });
  };

  if (signedUp) {
    setSignedUp(false);
    return (<Navigate to="/login" replace={true} />);
  }

  return (
    <div className="w-full relative m-5">
        <form className="max-w-md mx-auto m-auto bg-white border border-white flex flex-col justify-center">
            <h1 className="text-center font-semibold text-[24px] text-green p-3">Sign Up</h1>
            <input required className="w-5/6 m-2 p-2 mx-auto text-green text-center border border-green rounded"
                   name="firstName" type="text" placeholder="First Name" ref={firstNameField} />
            <input required className="w-5/6 m-2 p-2 mx-auto text-green text-center border border-green rounded"
                   name="lastName" type="text" placeholder="Last Name" ref={lastNameField} />
            <input required className="w-5/6 m-2 p-2 mx-auto text-green text-center border border-green rounded"
                   name="email" type="email" placeholder="Email" ref={emailField} />
            <input required className="w-5/6 m-2 p-2 mx-auto text-green text-center border border-green rounded"
                   name="password" type="password" placeholder="Password" ref={passwordField} />
            <input required className="w-5/6 m-2 p-2 mx-auto text-green text-center border border-green rounded"
                   name="confirmation" type="password" placeholder="Password Confirmation" ref={confirmationField} />
            <ToggleSwitch label="Do you want to be an Agent?" checkboxRef={isAgentField} />
            <div className="mt-5" onClick={signup}>
                {button}
            </div>
        </form>
    </div>
  );
};

export default SignUp;
