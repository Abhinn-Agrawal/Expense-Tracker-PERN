import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllExpenses,
  getAllIncomes,
  getAllTransactions
} from "../service/api";

/* ===================== ASYNC THUNKS ===================== */
export const fetchTransactions = createAsyncThunk(
    "finance/fetchTransactions",
    async(_,{rejectWithValue}) => {
        try {
            return await getAllTransactions();
        } catch(err){
            return rejectWithValue(err.message);
        }
    }
);

export const fetchExpenses = createAsyncThunk(
  "finance/fetchExpenses",
  async (_, { rejectWithValue }) => {
    try {
      return await getAllExpenses();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchIncomes = createAsyncThunk(
  "finance/fetchIncomes",
  async (_, { rejectWithValue }) => {
    try {
      return await getAllIncomes();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

/* ===================== SLICE ===================== */

const financeSlice = createSlice({
  name: "finance",
  initialState: {
    incomes: [],
    expenses: [],
    transactions:[],
    loading: false,
    error: null,
  },
  reducers: {
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      /* -------- FETCH EXPENSES -------- */
      .addCase(fetchExpenses.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchExpenses.fulfilled, (state, action) => {
        state.loading = false;
        state.expenses = action.payload || [];
      })
      .addCase(fetchExpenses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* -------- FETCH INCOMES -------- */
      .addCase(fetchIncomes.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchIncomes.fulfilled, (state, action) => {
        state.loading = false;
        state.incomes = action.payload || [];
      })
      .addCase(fetchIncomes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload || [];
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = financeSlice.actions;
export default financeSlice.reducer;
