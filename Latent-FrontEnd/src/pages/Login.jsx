import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// import axios from 'axios';
import FormInput from '../components/FormInput';
import { setUser } from '../redux/features/userSlice';

// import { useLoginMutation } from '../redux/services/latentAPI';

const ResetPassword = ({ showResetModal, setShowResetModal }) => {
  const [values, setValues] = useState({
    OTP: '',
    password: '',
    confirmPassword: '',
  });
  const inputs = [
    {
      id: 1,
      name: 'OTP',
      type: 'number',
      placeholder: 'OTP number',
      label: 'OTP',
    },
    {
      id: 2,
      name: 'password',
      type: 'password',
      placeholder: 'Password',
      errorMessage:
        'Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!',
      label: 'Password',
      pattern: '^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$',
      required: true,
    },
    {
      id: 3,
      name: 'confirmPassword',
      type: 'password',
      placeholder: 'Confirm Password',
      errorMessage: "Passwords don't match!",
      label: 'Confirm Password',
      pattern: values.password,
      required: true,
    },

  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // submit the email & close the modal + open the resetPassword modal
    setShowResetModal(false);
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`absolute top-0 smooth-transition ${showResetModal ? 'left-0 md:left-8' : '-left-[100%]'} bg-white z-10 flex flex-col
      items-center w-full md:w-1/2 h-full py-10 md:px-16 gap-2 md:rounded-md md:shadow-lg`}
    >
      {inputs.map((input) => (
        <FormInput
          key={input.id}
          {...input}
          value={values[input.name]}
          onChange={onChange}
        />
      ))}
      <div className="w-full pl-12 md:pl-0">
        <button
          type="submit"
          className="ml-2 md:ml-0 bg-green text-white py-2 px-16 transition-colors
        hover:bg-md_green rounded-md"
        >Reset Password
        </button>
      </div>
    </form>
  );
};

const ForgotPassword = ({ showEmailModal, setShowEmailModal, setShowResetModal }) => {
  const input = {
    id: 1,
    name: 'email',
    type: 'email',
    placeholder: 'Enter your email',
    errorMessage: 'It should be a valid email address!',
    label: 'Email',
    required: true,
  };
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // submit the email & close the modal + open the resetPassword modal
    setShowEmailModal(false);
    setShowResetModal(true);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`absolute top-0 smooth-transition ${showEmailModal ? 'left-0 md:left-8' : '-left-[100%]'} bg-white z-10 flex flex-col
        items-center w-full md:w-1/2 h-full py-10 md:px-16 gap-2 md:rounded-md md:shadow-lg`}
    >
      <FormInput
        {...input}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <div className="w-full pl-12 md:pl-0">
        <button type="submit" className="ml-2 md:ml-0 bg-green text-white py-2 px-16 transition-colors hover:bg-md_green rounded-md">Submit</button>
      </div>
    </form>
  );
};

const Login = () => {
  // const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: '',
    password: '',
  });
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);

  const inputs = [
    {
      id: 1,
      name: 'email',
      type: 'email',
      placeholder: 'Email',
      errorMessage: 'It should be a valid email address!',
      label: 'Email',
      required: true,
    },
    {
      id: 2,
      name: 'password',
      type: 'password',
      placeholder: 'Password',
      errorMessage:
        'Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!',
      label: 'Password',
      pattern: '^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$',
      required: true,
    },
  ];

  const getUser = async () => {
    const response = await fetch('http://localhost:5000/api/v1/users', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // credentials: 'include',
    });
    const data = await response.json();
    console.log({ data });
    if (data.success) {
      dispatch(setUser(data));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log({ values });
    // if (!isLoading) {
    //   try {
    //     const res = await login(values);
    //     console.log({ res });
    //     if (res.data.success) {
    //       // set user state
    //       dispatch(setUser(true));
    //       navigate('/explore');
    //     }
    //   } catch (error) {
    //     console.error('Login failed: ', error);
    //   }
    // }
    const response = await fetch('http://localhost:5000/api/v1/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });
    const data = await response.json();
    if (data.success) {
      // redirect to explore
      // dispatch(setUser(true));
      await getUser();
      navigate('/explore');
    } else {
      // show error message
      console.log('Login failed: ', data);
    }
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-row-reverse w-full my-8 relative">
      <form
        onSubmit={handleSubmit}
        className="flex-1 flex flex-col px-4 md:px-16 items-center md:items-start"
      >
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
        <span
          onClick={() => setShowEmailModal(true)}
          className="hover:text-green cursor-pointer mt-4"
        >
          Forgot password
        </span>
        <div className="flex flex-col gap-4 md:flex-row w-[280px] md:w-full mt-8 justify-between items-center">
          <span className="text-slate-600">Don't have an account?
            <Link to="/signup" className="font-semibold hover:text-green cursor-pointer">Sign up</Link>
          </span>
          <button
            type="submit"
            className="w-full md:w-auto bg-green rounded-md text-white p-3 md:px-6
             transition-colors hover:bg-md_green"
          >Login
          </button>
        </div>
      </form>
      <ForgotPassword setShowEmailModal={setShowEmailModal} showEmailModal={showEmailModal} setShowResetModal={setShowResetModal} />
      <ResetPassword setShowResetModal={setShowResetModal} showResetModal={showResetModal} />
      <div className="hidden flex-1 md:flex min-h-[520px] h-full bg-form-bg bg-blend-multiply bg-cover
        bg-center overflow-hidden rounded-b-md"
      >
        <div className="flex flex-col w-full bg-gradient-to-b from-bg_color via-bg_color to-bg-transparent
          rounded-b-md overflow-hidden p-8"
        >
          <span className="text-xl font-bold text-green">
            Find your next house quickly, cheaply and conveniently with
            <span className="text-black pl-1">Latent</span>
          </span>
          <span className="text-sm text-green pt-4">Explore options from thousands of listed houses, all at the comfort of your home.</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
