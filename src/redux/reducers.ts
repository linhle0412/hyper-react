import { combineReducers } from 'redux';
import Auth from './auth/reducers';
import Layout from './layout/reducers';
import Product from './features/product/reducers';

export default combineReducers({
    Auth,
    Layout,
    Product
});
