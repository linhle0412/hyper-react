import { APICore } from 'helpers/api/apiCore';
import { Product as TProduct } from 'pages/apps/Ecommerce/types';
import { PayloadProducts } from './actions';
import { ProductActionTypes } from './constants';

const INIT_STATE = {
    products: [],
    total: 0,
    loading: false,
};

type ProductActionType = {
    type: ProductActionTypes,
    payload: {
        actionType?: string;
        data?: any;
        error?: string;
    };
};

type State = {
    products: TProduct[] | [];
    total?: number,
    loading: boolean;
};

const Product = (state: State = INIT_STATE, action: ProductActionType) => {
    switch (action.type) {
        case ProductActionTypes.API_RESPONSE_SUCCESS:
            console.log(action.payload);
            
            switch (action.payload.actionType) {
                case ProductActionTypes.FETCH_PRODUCTS: {
                    return {
                        ...state,
                        ...action.payload.data,
                        loading: false,
                    };
                }
                case ProductActionTypes.REMOVE_PRODUCTS: {
                    return {
                        products: state.products.filter((product) => !action.payload.data?.ids.includes(product.id)),
                        total: state.products.length - action.payload.data?.ids.length,
                        loading: false                  
                    }
                }
                default:
                    return { ...state };
            }

        case ProductActionTypes.API_RESPONSE_ERROR:
            switch (action.payload.actionType) {
                case ProductActionTypes.FETCH_PRODUCTS: {
                    return {
                        ...state,
                        error: action.payload.error,
                        loading: false,
                    };
                }
                default:
                    return { ...state };
            }
        default:
            return { ...state };
    }
};

export default Product;
