import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

// Interfaces para las cuentas y transacciones
interface Account {
  id: number;
  name: string;
  accountNumber: string;
  balance: number;
}

interface Transaction {
  accountId: number;
  type: 'deposit' | 'withdraw';
  amount: number;
}

let accounts: Account[] = [];
let transactions: Transaction[] = [];

const app = express();
app.use( bodyParser.json() );
app.use( cors() );

// Crear una nueva cuenta bancaria
app.post( '/accounts', ( req: Request, res: Response ) => {
  const { name, accountNumber, balance } = req.body;
  const newAccount: Account = {
    id: accounts.length + 1,
    name,
    accountNumber,
    balance,
  };

  console.log( "Creating new account:", newAccount );

  accounts.push( newAccount );
  res.status( 201 ).json( { id: newAccount.id } );
} );

// Obtener el saldo de una cuenta bancaria
app.get( '/accounts/:id/balance', ( req: Request, res: Response ) => {
  const accountId = parseInt( req.params.id );
  const account = accounts.find( acc => acc.id === accountId );

  if ( !account ) {
    return res.status( 404 ).json( { error: 'Cuenta no encontrada' } );
  }

  res.status( 200 ).json( { balance: account.balance } );
} );

// Realizar una transacción bancaria
app.post( '/transactions', ( req: Request, res: Response ) => {
  const { accountId, type, amount } = req.body;

  console.log( "Received transaction request for accountId:", accountId );
  console.log( "Current accounts:", accounts );

  const account = accounts.find( acc => acc.accountNumber == accountId );

  if ( !account ) {
    return res.status( 404 ).json( { error: 'Cuenta no encontrada' } );
  }

  if ( type === 'deposit' ) {
    account.balance += amount;
  } else if ( type === 'withdraw' ) {
    if ( account.balance < amount ) {
      return res.status( 400 ).json( { error: 'Fondos insuficientes' } );
    }
    account.balance -= amount;
  }

  const newTransaction: Transaction = { accountId, type, amount };
  transactions.push( newTransaction );

  res.status( 201 ).json( { message: 'Transacción realizada con éxito' } );
} );

// Iniciar el servidor
const PORT = 3001;
app.listen( PORT, () => {
  console.log( `Servidor corriendo en http://localhost:${ PORT }` );
} );
