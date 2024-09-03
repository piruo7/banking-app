import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createAccount } from '../services/api';

const AccountForm: React.FC = () => {
  const [ name, setName ] = useState( '' );
  const [ accountNumber, setAccountNumber ] = useState( '' );
  const [ balance, setBalance ] = useState( 0 );
  const dispatch = useDispatch();

  // Verifica si el botón debe estar desactivado
  const isButtonDisabled = name.trim() === '' || accountNumber.trim() === '' || balance <= 0;

  const handleSubmit = async () => {
    if ( isButtonDisabled ) {
      return;
    }

    await createAccount( name, accountNumber, balance, dispatch );
  };

  return (
    <div style={ styles.container }>
      <h2 style={ styles.title }>Crear Nueva Cuenta</h2>
      <input
        type="text"
        placeholder="Nombre"
        value={ name }
        onChange={ ( e ) => setName( e.target.value ) }
        style={ styles.input }
      />
      <input
        type="text"
        placeholder="Número de Cuenta"
        value={ accountNumber }
        onChange={ ( e ) => setAccountNumber( e.target.value ) }
        style={ styles.input }
      />
      <input
        type="number"
        placeholder="Saldo Inicial"
        value={ balance }
        onChange={ ( e ) => setBalance( Number( e.target.value ) ) }
        style={ styles.input }
      />
      <button
        onClick={ handleSubmit }
        style={ { ...styles.button, backgroundColor: isButtonDisabled ? '#cccccc' : '#00509e' } }
        disabled={ isButtonDisabled }
      >
        Crear Cuenta
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
    boxSizing: 'border-box' as 'border-box',
  },
  button: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#00509e',
    color: '#ffffff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
    fontFamily: 'Arial, sans-serif',
  },
};

export default AccountForm;
