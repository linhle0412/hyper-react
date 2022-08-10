import { ProductActionTypes } from './constants';
import { Product } from "pages/apps/Ecommerce/types";

export type PayloadProducts = {
  total: number,
  products: Product[]
}

export type ProductActionType = {
    type: ProductActionTypes,
    payload: {};
};

// common success
export const productsApiResponseSuccess = (actionType: string, data: PayloadProducts | {}): ProductActionType => ({
    type: ProductActionTypes.API_RESPONSE_SUCCESS,
    payload: { actionType, data },
});
// common error
export const productsApiResponseError = (actionType: string, error: string): ProductActionType => ({
    type: ProductActionTypes.API_RESPONSE_ERROR,
    payload: { actionType, error },
});

export const fetchProducts = (params: any): ProductActionType => ({
    type: ProductActionTypes.FETCH_PRODUCTS,
    payload: params,
});

export const removeProducts = (params: any): ProductActionType => ({
    type: ProductActionTypes.REMOVE_PRODUCTS,
    payload: params,
});

