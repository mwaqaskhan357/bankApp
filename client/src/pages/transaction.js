import React, { useEffect, useState } from 'react';
import request from '../utils/axiosInstance';

const Transaction = () => {
  const [transactions, setTransactions] = useState([]);
  const getAllTransactions = async () => {
    try {
      const result = await request.get('bank/transactions');
      console.log({ result });
      setTransactions(result.data);
    } catch (error) {
      console.log({ error });
    }
  };
  useEffect(() => {
    getAllTransactions();
  }, []);

  return (
    <div className='bg-gray-50 dark:bg-gray-900 py-10 h-screen'>
      <div className='bg-gray-50 dark:bg-gray-900'>
        <div class='relative overflow-x-auto'>
          <table class='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
            <thead class='text-xs text-gray-700 uppercase bg-gray-400 dark:bg-gray-700 dark:text-gray-400'>
              <tr>
                <th scope='col' class='px-6 py-3'>
                  From
                </th>
                <th scope='col' class='px-6 py-3'>
                  To
                </th>
                <th scope='col' class='px-6 py-3'>
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {transactions?.map((transaction) => (
                <tr class='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                  <td class='px-6 py-4'>
                    {transaction.fromAccount?.accountNumber}
                  </td>
                  <td class='px-6 py-4'>
                    {transaction.toAccount?.accountNumber}
                  </td>
                  <td class='px-6 py-4'>${transaction?.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Transaction;
