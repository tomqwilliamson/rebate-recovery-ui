import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { 
  RebateCalculation, 
  RebateValidation, 
  RebateForecast, 
  ForecastParameters,
  ForecastAnalytics 
} from '@types/rebate.types';
import { PaginatedResponse } from '@types/api.types';
import { rebatesApi } from '@services/api/rebates.api';

interface RebatesState {
  calculations: RebateCalculation[];
  currentCalculation: RebateCalculation | null;
  validations: RebateValidation[];
  forecasts: RebateForecast[];
  forecastAnalytics: ForecastAnalytics | null;
  forecastScenarios: {
    scenario: string;
    description: string;
    forecasts: RebateForecast[];
  }[];
  forecastAccuracy: {
    period: string;
    predicted: number;
    actual: number;
    accuracy: number;
  }[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  loading: boolean;
  forecastLoading: boolean;
  error: string | null;
  filters: {
    contractId: string;
    status: string;
    period: string;
  };
  forecastParameters: ForecastParameters;
}

const initialState: RebatesState = {
  calculations: [],
  currentCalculation: null,
  validations: [],
  forecasts: [],
  forecastAnalytics: null,
  forecastScenarios: [],
  forecastAccuracy: [],
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  },
  loading: false,
  forecastLoading: false,
  error: null,
  filters: {
    contractId: '',
    status: 'all',
    period: '',
  },
  forecastParameters: {
    forecastType: 'quarterly',
    includeHistorical: false,
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

export const generateRebateForecasts = createAsyncThunk(
  'rebates/generateForecasts',
  async (params: ForecastParameters, { rejectWithValue }) => {
    try {
      const forecasts = await rebatesApi.generateForecasts(params);
      return forecasts;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchForecastAnalytics = createAsyncThunk(
  'rebates/fetchForecastAnalytics',
  async (forecasts: RebateForecast[], { rejectWithValue }) => {
    try {
      const analytics = await rebatesApi.getForecastAnalytics(forecasts);
      return analytics;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchForecastAccuracy = createAsyncThunk(
  'rebates/fetchForecastAccuracy',
  async (_, { rejectWithValue }) => {
    try {
      const accuracy = await rebatesApi.getForecastAccuracy();
      return accuracy;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const simulateForecastScenarios = createAsyncThunk(
  'rebates/simulateScenarios',
  async (forecasts: RebateForecast[], { rejectWithValue }) => {
    try {
      const scenarios = await rebatesApi.simulateForecastScenarios(forecasts);
      return scenarios;
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
    setForecastParameters: (state, action: PayloadAction<Partial<ForecastParameters>>) => {
      state.forecastParameters = { ...state.forecastParameters, ...action.payload };
    },
    clearCurrentCalculation: (state) => {
      state.currentCalculation = null;
    },
    clearForecasts: (state) => {
      state.forecasts = [];
      state.forecastAnalytics = null;
      state.forecastScenarios = [];
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
      .addCase(fetchRebateForecasts.pending, (state) => {
        state.forecastLoading = true;
      })
      .addCase(fetchRebateForecasts.fulfilled, (state, action) => {
        state.forecastLoading = false;
        state.forecasts = action.payload;
      })
      .addCase(fetchRebateForecasts.rejected, (state, action) => {
        state.forecastLoading = false;
        state.error = action.payload as string;
      })
      .addCase(generateRebateForecasts.pending, (state) => {
        state.forecastLoading = true;
      })
      .addCase(generateRebateForecasts.fulfilled, (state, action) => {
        state.forecastLoading = false;
        state.forecasts = action.payload;
      })
      .addCase(generateRebateForecasts.rejected, (state, action) => {
        state.forecastLoading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchForecastAnalytics.fulfilled, (state, action) => {
        state.forecastAnalytics = action.payload;
      })
      .addCase(fetchForecastAccuracy.fulfilled, (state, action) => {
        state.forecastAccuracy = action.payload;
      })
      .addCase(simulateForecastScenarios.fulfilled, (state, action) => {
        state.forecastScenarios = action.payload;
      });
  },
});

export const { 
  setFilters, 
  setForecastParameters, 
  clearCurrentCalculation, 
  clearForecasts, 
  clearError 
} = rebatesSlice.actions;
export default rebatesSlice.reducer;