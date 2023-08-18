import React, { useState } from 'react';
import request from '../utils/axiosInstance';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [sendState, setSendState] = useState({
    account: '',
    amount: '',
  });

  const changeHandler = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;

    setSendState((prev) => ({ ...prev, [name]: value }));
  };

  const sendMoney = async (e) => {
    e.preventDefault();
    try {
      await request.post('bank/send', {
        ...sendState,
      });
      toast.success('Transfer successfully');
      navigate('/transactions');
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <div className='bg-gray-50 dark:bg-gray-900 py-10 h-screen'>
      <div className='bg-gray-50 dark:bg-gray-900 pb-10'>
        <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0'>
          <div className='flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white'>
            <img
              className='w-8 h-8 mr-2'
              src='https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg'
              alt='logo'
            />
            Home
          </div>
          <div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
            <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
              <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
                Transfer Money
              </h1>
              <form className='space-y-4 md:space-y-6' onSubmit={sendMoney}>
                <div>
                  <label
                    for='account'
                    className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                  >
                    Account
                  </label>
                  <input
                    type='text'
                    name='account'
                    value={sendState?.account}
                    onChange={changeHandler}
                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    placeholder='1234567890'
                  />
                </div>
                <div>
                  <label
                    for='amount'
                    className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                  >
                    Amount
                  </label>
                  <input
                    type='number'
                    name='amount'
                    value={sendState?.amount}
                    onChange={changeHandler}
                    placeholder='100'
                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  />
                </div>

                <button
                  type='submit'
                  class='w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
