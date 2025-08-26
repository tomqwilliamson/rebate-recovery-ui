import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Contract, Vendor, ContractType } from '../../types/contract.types';
import { PaginatedResponse } from '../../types/api.types';
import { contractsApi } from '@services/api/contracts.api';

interface ContractsState {
  contracts: Contract[];
  currentContract: Contract | null;
  vendors: Vendor[];
  contractTypes: ContractType[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  loading: boolean;
  error: string | null;
  filters: {
    search: string;
    status: string;
    vendorId: string;
  };
}

const initialState: ContractsState = {
  contracts: [],
  currentContract: null,
  vendors: [],
  contractTypes: [],
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  },
  loading: false,
  error: null,
  filters: {
    search: '',
    status: 'all',
    vendorId: '',
  },
};

export const fetchContracts = createAsyncThunk(
  'contracts/fetchContracts',
  async (params: {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
    vendorId?: string;
  } = {}, { rejectWithValue }) => {
    try {
      const response = await contractsApi.getContracts(params);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchContract = createAsyncThunk(
  'contracts/fetchContract',
  async (id: string, { rejectWithValue }) => {
    try {
      const contract = await contractsApi.getContract(id);
      return contract;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchVendors = createAsyncThunk(
  'contracts/fetchVendors',
  async (_, { rejectWithValue }) => {
    try {
      const vendors = await contractsApi.getVendors();
      return vendors;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchContractTypes = createAsyncThunk(
  'contracts/fetchContractTypes',
  async (_, { rejectWithValue }) => {
    try {
      const contractTypes = await contractsApi.getContractTypes();
      return contractTypes;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const contractsSlice = createSlice({
  name: 'contracts',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Partial<ContractsState['filters']>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearCurrentContract: (state) => {
      state.currentContract = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContracts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContracts.fulfilled, (state, action) => {
        state.loading = false;
        state.contracts = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchContracts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchContract.fulfilled, (state, action) => {
        state.currentContract = action.payload;
      })
      .addCase(fetchVendors.fulfilled, (state, action) => {
        state.vendors = action.payload;
      })
      .addCase(fetchContractTypes.fulfilled, (state, action) => {
        state.contractTypes = action.payload;
      });
  },
});

export const { setFilters, clearCurrentContract, clearError } = contractsSlice.actions;
export default contractsSlice.reducer;