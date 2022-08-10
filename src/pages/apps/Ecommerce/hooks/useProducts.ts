import { useRedux } from 'hooks';
import { fetchProducts, removeProducts } from 'redux/actions';

export default function useProducts() {
    const { dispatch, appSelector } = useRedux();
    const { products, loading, total } = appSelector((state) => ({
        products: state.Product.products,
        total: state.Product.total,
        loading: state.Product.loading
    }))

    const onFetchProducts = (params: any) => {
        dispatch(fetchProducts(params))
    }

    const onRemoveProducts = (ids: number[]) => {
        dispatch(removeProducts({ids}))
    }

    return { products, loading, total, fetchProducts: onFetchProducts, removeProducts: onRemoveProducts };
}
