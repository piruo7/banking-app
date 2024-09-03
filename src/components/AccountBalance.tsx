import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const AccountBalance: React.FC = () => {
  const balance = useSelector( ( state: RootState ) => state.account.balance );

  return (
    <div style={ styles.container }>
      <h2 style={ styles.balanceText }>Saldo Actual: ${ balance }</h2>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '400px',
    margin: '20px auto',
    padding: '20px',
    borderRadius: '8px',
    backgroundColor: '#e0e7ff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center' as 'center',
  },
  balanceText: {
    color: '#003366',
    fontFamily: 'Arial, sans-serif',
    fontSize: '24px',
    margin: '0',
  }
};

export default AccountBalance;
