import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RebateCalculation, RebateValidation, RebateForecast } from '@types/rebate.types';
import { PaginatedResponse } from '@types/api.types';
import { rebatesApi } from '@services/api/rebates.api';

interface RebatesState {
  calculations: RebateCalculation[];
  currentCalculation: RebateCalculation | null;
  validations: RebateValidation[];
  forecasts: RebateForecast[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  loading: boolean;
  error: string | null;
  filters: {
    contractId: string;
    status: string;
    period: string;
  };
}

const initialState: RebatesState = {
  calculations: [],
  currentCalculation: null,
  validations: [],
  forecasts: [],
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  },
  loading: false,
  error: null,
  filters: {
    contractId: '',
    status: 'all',
    period: '',
  },
};

export const fetchRebateCalculations = createAsyncThunk(
  'rebates/fetchCalculations',
  async (params: {
    page?: number;
    limit?: number;
    contractId?: string;
    status?: string;
    period?: string;
  } = {}, { rejectWithValue }) => {
    try {
      const response = await rebatesApi.getRebateCalculations(params);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchRebateCalculation = createAsyncThunk(
  'rebates/fetchCalculation',
  async (id: string, { rejectWithValue }) => {
    try {
      const calculation = await rebatesApi.getRebateCalculation(id);
      return calculation;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const createRebateCalculation = createAsyncThunk(
  'rebates/createCalculation',
  async (params: { contractId: string; period: string }, { rejectWithValue }) => {
    try {
      const calculation = await rebatesApi.createRebateCalculation(params.contractId, params.period);
      return calculation;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchRebateForecasts = createAsyncThunk(
  'rebates/fetchForecasts',
  async (contractId?: string, { rejectWithValue }) => {
    try {
      const forecasts = await rebatesApi.getRebateForecasts(contractId);
      return forecasts;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const rebatesSlice = createSlice({
  name: 'rebates',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Partial<RebatesState['filters']>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearCurrentCalculation: (state) => {
      state.currentCalculation = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRebateCalculations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRebateCalculations.fulfilled, (state, action) => {
        state.loading = false;
        state.calculations = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchRebateCalculations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchRebateCalculation.fulfilled, (state, action) => {
        state.currentCalculation = action.payload;
      })
      .addCase(createRebateCalculation.fulfilled, (state, action) => {
        state.calculations.unshift(action.payload);
      })
      .addCase(fetchRebateForecasts.fulfilled, (state, action) => {
        state.forecasts = action.payload;
      });
  },
});

export const { setFilters, clearCurrentCalculation, clearError } = rebatesSlice.actions;
export default rebatesSlice.reducer;