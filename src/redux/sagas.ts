import { all } from 'redux-saga/effects';
import authSaga from './auth/saga';
import productSaga from './features/product/saga';
import layoutSaga from './layout/saga';

export default function* rootSaga() {
    yield all([authSaga(), layoutSaga(), productSaga()]);
}
