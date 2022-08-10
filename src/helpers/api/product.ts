import { APICore } from './apiCore';

const api = new APICore();

function fetchProductsApi(params: { page: number; perpage: number }) {
    const baseUrl = '/products';
    return api.get(`${baseUrl}`, params);
}

function removeProductsApi(params: { ids: number[] }) {
    const baseUrl = '/products/delete';
    return api.create(`${baseUrl}`, params);
}


export { fetchProductsApi, removeProductsApi };
