import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import { SagaIterator } from '@redux-saga/core';
import { fetchProductsApi } from 'helpers';
import { ProductActionTypes } from './constants';
import { productsApiResponseError, productsApiResponseSuccess } from './actions';
import { removeProductsApi } from 'helpers/api/product';

type ProductsParams = {
    payload: any;
    type: string;
};

/**
 * Fetch products
 * @param {*} payload - page, perpage
 */
function* fetchProducts({payload, type}: ProductsParams): SagaIterator {
  try {
    const response = yield call(fetchProductsApi, payload);
    
    yield put(productsApiResponseSuccess(ProductActionTypes.FETCH_PRODUCTS, response.data));
  } catch (error: any) {
    yield put(productsApiResponseError(ProductActionTypes.FETCH_PRODUCTS, error));
  }
}

/**
 * Remove Products
 * @param {*} payload - page, perpage
 */
 function* removeProducts({payload: {ids}, type}: ProductsParams): SagaIterator {
  try {
    yield call(removeProductsApi, {ids});
    const response = yield call(fetchProductsApi, {page: 0, perpage: 5});
    yield put(productsApiResponseSuccess(ProductActionTypes.FETCH_PRODUCTS, response.data));
    
    // yield put(productsApiResponseSuccess(ProductActionTypes.REMOVE_PRODUCTS, response.data));
  } catch (error: any) {
    yield put(productsApiResponseError(ProductActionTypes.REMOVE_PRODUCTS, error));
  }
}


export function* watchFetchProducts() {
    yield takeEvery(ProductActionTypes.FETCH_PRODUCTS, fetchProducts);
}

export function* watchRemoveProducts() {
    yield takeEvery(ProductActionTypes.REMOVE_PRODUCTS, removeProducts);
}

function* productSaga() {
    yield all([fork(watchFetchProducts), fork(watchRemoveProducts)]);
}

export default productSaga
