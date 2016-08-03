/*
 *
 * UserInsightTransactions actions
 *
 */

import {
  FETCH_USER_INSIGHT_TRANSACTIONS,
  FETCH_TIME_TRANSACTIONS_START,
  FETCH_TIME_TRANSACTIONS_SUCCESS,
  FETCH_TIME_TRANSACTIONS_ERROR,
} from './constants';

export function fetchUserInsightTransactions() {
  return {
    type: FETCH_USER_INSIGHT_TRANSACTIONS,
  };
}

export function fetchTimeTransactionsStart() {
  return {
    type: FETCH_TIME_TRANSACTIONS_START,
  };
}

export function fetchTimeTransactionsSuccess(data) {
  return {
    type: FETCH_TIME_TRANSACTIONS_SUCCESS,
    data,
  };
}

export function fetchTimeTransactionsError(error) {
  return {
    type: FETCH_TIME_TRANSACTIONS_ERROR,
    error,
  };
}
