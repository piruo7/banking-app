import type { NextApiRequest, NextApiResponse } from 'next';

interface Transaction {
  accountId: number;
  type: 'deposit' | 'withdraw';
  amount: number;
}

interface Account {
  id: number;
  name: string;
  accountNumber: string;
  balance: number;
}

let accounts: Account[] = [];
let transactions: Transaction[] = [];

export default function handler( req: NextApiRequest, res: NextApiResponse ) {
  if ( req.method === 'POST' ) {
    const { accountId, type, amount } = req.body;
    const account = accounts.find( ( acc ) => acc.id === accountId );
    if ( !account ) return res.status( 404 ).json( { error: 'Cuenta no encontrada' } );

    if ( type === 'deposit' ) {
      account.balance += amount;
    } else if ( type === 'withdraw' ) {
      account.balance -= amount;
    }

    const newTransaction: Transaction = { accountId, type, amount };
    transactions.push( newTransaction );

    res.status( 201 ).json( { message: 'Transacción realizada con éxito' } );
  } else {
    res.setHeader( 'Allow', [ 'POST' ] );
    res.status( 405 ).end( `Método ${ req.method } no permitido` );
  }
}
