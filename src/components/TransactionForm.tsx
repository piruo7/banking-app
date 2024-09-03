import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { performTransaction } from '../services/api';
import { RootState } from '../redux/store';

const TransactionForm: React.FC = () => {
  const [ amount, setAmount ] = useState( 0 );
  const [ type, setType ] = useState<'deposit' | 'withdraw'>( 'deposit' );
  const dispatch = useDispatch();

  const account = useSelector( ( state: RootState ) => state.account );

  // Verifica si la cuenta está presente en el store
  if ( !account.accountNumber ) {
    return <p style={ styles.message }>Para realizar una transacción, antes debes crear una cuenta.</p>;
  }

  const accountId = parseInt( account.accountNumber, 10 );

  // Verifica si el botón debe estar desactivado
  const isButtonDisabled = amount <= 0 || !type;

  const handleTransaction = async () => {
    if ( isButtonDisabled ) {
      return;
    }

    try {
      await performTransaction( accountId, type, amount, dispatch );
      console.log( "Transaction successful" );
    } catch ( error ) {
      console.error( "Transaction failed:", error );
    }
  };

  return (
    <div style={ styles.container }>
      <h2 style={ styles.title }>Realizar Transacción</h2>
      <input
        type="number"
        placeholder="Monto"
        value={ amount }
        onChange={ ( e ) => setAmount( Number( e.target.value ) ) }
        style={ styles.input }
      />
      <select
        value={ type }
        onChange={ ( e ) => setType( e.target.value as 'deposit' | 'withdraw' ) }
        style={ styles.select }
      >
        <option value="deposit">Depósito</option>
        <option value="withdraw">Retiro</option>
      </select>
      <button
        onClick={ handleTransaction }
        style={ { ...styles.button, backgroundColor: isButtonDisabled ? '#cccccc' : '#00509e' } }
        disabled={ isButtonDisabled }
      >
        Realizar Transacción
      </button>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '400px',
    margin: '0 auto',
    padding: '20px',
    borderRadius: '8px',
    backgroundColor: '#f0f4f8',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  title: {
    textAlign: 'center' as 'center',
    color: '#003366',
    marginBottom: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '16px',
    fontFamily: 'Arial, sans-serif',
  },
  select: {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '16px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#003366',
  },
  button: {
    width: '100%',
    padding: '10px',
    color: '#ffffff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
    fontFamily: 'Arial, sans-serif',
  },
  message: {
    textAlign: 'center' as 'center',
    color: '#003366',
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
    backgroundColor: '#f0f4f8',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
};

export default TransactionForm;
