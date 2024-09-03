import axios from 'axios';
import { AppDispatch } from '../redux/store';
import { setAccountDetails, updateBalance } from '../redux/slices/accountSlice';

const API_URL = 'http://localhost:3001'; // URL del backend

// Crea una nueva cuenta bancaria
export const createAccount = async (
  name: string,
  accountNumber: string,
  balance: number,
  dispatch: AppDispatch
) => {
  const response = await axios.post( `${ API_URL }/accounts`, {
    name,
    accountNumber,
    balance,
  } );

  dispatch( setAccountDetails( { name, accountNumber, balance } ) );
  return response.data;
};

// Obtiene el saldo de una cuenta bancaria
export const getAccountBalance = async ( accountId: number, dispatch: AppDispatch ) => {
  const response = await axios.get( `${ API_URL }/accounts/${ accountId }/balance` );
  dispatch( updateBalance( response.data.balance ) );
  return response.data;
};

// Realiza una transacción bancaria
export const performTransaction = async (
  accountId: number,
  type: 'deposit' | 'withdraw',
  amount: number,
  dispatch: AppDispatch
) => {
  try {
    const response = await axios.post( `${ API_URL }/transactions`, {
      accountId,
      type,
      amount,
    } );

    dispatch( updateBalance( type === 'deposit' ? amount : -amount ) );

    return response.data;
  } catch ( error ) {
    if ( axios.isAxiosError( error ) ) {
      console.error( 'Axios error:', error.response?.data || error.message );
    } else {
      console.error( 'Unexpected error:', error );
    }
    throw error;
  }
};
