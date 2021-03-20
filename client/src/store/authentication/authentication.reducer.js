import { createReducer } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import purgeStoredState from 'redux-persist/es/purgeStoredState';
import storage from 'redux-persist/lib/storage';
import t from 'store/types';

const initialState = {
  token: '',
  organization: '',
  organizationId: null,
  user: '',
  tenant: {},
  locale: '',
  errors: [],
};

const STORAGE_KEY = 'bigcapital:authentication';
const CONFIG = {
  key: STORAGE_KEY,
  blacklist: ['errors'],
  storage,
};

const reducerInstance = createReducer(initialState, {
  [t.LOGIN_SUCCESS]: (state, action) => {
    const { token, user, tenant } = action.payload;

    state.token = token;
    state.user = user;
    state.organization = tenant.organization_id;
    state.organizationId = tenant.id;
    state.tenant = tenant;
  },

  [t.LOGIN_FAILURE]: (state, action) => {
    state.errors = action.errors;
  },

  [t.LOGIN_CLEAR_ERRORS]: (state) => {
    state.errors = [];
  },

  [t.RESET]: () => {
    purgeStoredState(CONFIG);
  }
});

export default persistReducer(
  CONFIG,
  reducerInstance,
);

export const isAuthenticated = (state) => !!state.authentication.token;
export const hasErrorType = (state, errorType) => {
  return state.authentication.errors.find((e) => e.type === errorType);
};

export const isTenantSeeded = (state) => !!state.tenant.seeded_at;
export const isTenantBuilt = (state) => !!state.tenant.initialized_at;

export const isTenantHasSubscription = () => false;
export const isTenantSubscriptionExpired = () => false;