import type { NextApiRequest, NextApiResponse } from 'next';

interface Account {
  id: number;
  name: string;
  accountNumber: string;
  balance: number;
}

let accounts: Account[] = [];

export default function handler( req: NextApiRequest, res: NextApiResponse ) {
  if ( req.method === 'POST' ) {
    const { name, accountNumber, balance } = req.body;
    const newAccount: Account = {
      id: accounts.length + 1,
      name,
      accountNumber,
      balance,
    };
    accounts.push( newAccount );
    res.status( 201 ).json( { id: newAccount.id } );
  } else if ( req.method === 'GET' ) {
    const { id } = req.query;
    const account = accounts.find( ( acc ) => acc.id === parseInt( id as string ) );
    if ( !account ) return res.status( 404 ).json( { error: 'Cuenta no encontrada' } );
    res.status( 200 ).json( { balance: account.balance } );
  } else {
    res.setHeader( 'Allow', [ 'POST', 'GET' ] );
    res.status( 405 ).end( `Método ${ req.method } no permitido` );
  }
}
