import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AccountState {
  name: string;
  accountNumber: string;
  balance: number;
}

const initialState: AccountState = {
  name: '',
  accountNumber: '',
  balance: 0,
};

const accountSlice = createSlice( {
  name: 'account',
  initialState,
  reducers: {
    setAccountDetails( state, action: PayloadAction<{ name: string; accountNumber: string; balance: number; }> ) {
      state.name = action.payload.name;
      state.accountNumber = action.payload.accountNumber;
      state.balance = action.payload.balance;
    },
    updateBalance( state, action: PayloadAction<number> ) {
      state.balance += action.payload;
    },
  },
} );

export const { setAccountDetails, updateBalance } = accountSlice.actions;
export default accountSlice.reducer;
