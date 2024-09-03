import React from 'react';
import AccountForm from '../components/AccountForm';
import TransactionForm from '../components/TransactionForm';
import AccountBalance from '../components/AccountBalance';

const Home: React.FC = () => {
  return (
    <div style={ styles.container }>
      <h1 style={ styles.title }>Aplicación Bancaria</h1>
      <div style={ styles.section }>
        <AccountForm />
      </div>
      <div style={ styles.section }>
        <TransactionForm />
      </div>
      <div style={ styles.section }>
        <AccountBalance />
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f0f4f8',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  title: {
    textAlign: 'center' as 'center',
    color: '#003366',
    fontFamily: 'Arial, sans-serif',
    marginBottom: '30px',
  },
  section: {
    marginBottom: '20px',
  },
};

export default Home;
