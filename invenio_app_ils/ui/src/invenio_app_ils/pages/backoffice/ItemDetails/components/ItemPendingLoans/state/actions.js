import {
  IS_LOADING,
  SUCCESS,
  HAS_ERROR,
  CHANGE_SORT_BY,
  CHANGE_SORT_ORDER,
} from './types';
import { loan as loanApi } from '../../../../../../common/api';

export const fetchPendingLoans = itemPid => {
  return async (dispatch, getState) => {
    dispatch({
      type: IS_LOADING,
    });

    await loanApi
      .list(
        loanApi
          .query()
          .withItemPid(itemPid)
          .withState('PENDING')
          .qs()
      )
      .then(response => {
        dispatch({
          type: SUCCESS,
          payload: response.data,
        });
      })
      .catch(error => {
        dispatch({
          type: HAS_ERROR,
          payload: error,
        });
      });
  };
};

export const pendingLoansChangeSortBy = (documentPid, itemPid) => {
  return async (dispatch, getState) => {
    const newSortBy =
      getState().itemPendingLoans.sortBy === 'transaction_date'
        ? 'start_date'
        : 'transaction_date';

    dispatch({
      type: CHANGE_SORT_BY,
      payload: newSortBy,
    });

    await dispatch(fetchPendingLoans(itemPid));
  };
};

export const pendingLoansChangeSortOrder = (documentPid, itemPid) => {
  return async (dispatch, getState) => {
    const newSortOrder =
      getState().itemPendingLoans.sortOrder === 'asc' ? 'desc' : 'asc';

    dispatch({
      type: CHANGE_SORT_ORDER,
      payload: newSortOrder,
    });

    await dispatch(fetchPendingLoans(itemPid));
  };
};
