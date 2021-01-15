import { handleActions } from 'redux-actions';
import { push } from 'react-router-redux';
import { initialize as initializeForm } from 'redux-form';
import { NotificationManager } from 'react-notifications';
import { api } from 'api';
import moment from 'moment';

const SET_PRODUCT_LIST = 'SET_PRODUCT_LIST';
const SET_REGISTER_PRODUCT = 'SET_REGISTER_PRODUCT';


export const registerProduct = () => (dispatch, getStore) => {
    const data = getStore().form.registerProductForm.values;
    const id =  getStore().form.profile.initial.seller.id;
    console.log("get sotore", id);
    api.post('/product', data).then((response) => {
    // dispatch(setMe(response));
        NotificationManager.success(
            'Producto registrado correctamente',
            'Éxito',
            3000
        );
        dispatch(push('/'));
    }).catch(error => {
        console.log('Error:', error);
        NotificationManager.error(
            'Ocurrió un error al registrar el producto',
            'ERROR',
            0
        );
    });
};

export const listProducts = () => (dispatch)=>  {
    api.get('/product').then(response => {
        if (response){           
            console.log(response);           
        }   
        dispatch({
            type: SET_PRODUCT_LIST,
            data: response,
        });
    }).catch(error => {
        console.log('error:', error);
        NotificationManager.error(
            'Ocurrió un error al listar los empleados',
            'ERROR',
            0
        );
    });
};

export const getProduct = (id) => dispatch => {
    
    api.get(`/product/${id}`).then((response)=>{
        console.log("dato producto:", response)
        dispatch ({type: SET_REGISTER_PRODUCT, register: response});
        dispatch(initializeForm('registerProductForm', response));
    }).catch(error => {
        console.log('error:', error);
        NotificationManager.error(
            'Ocurrió un error al consultar el registro',
            'ERROR',
            0
        );
    });
}


export const updateProduct = () => (dispatch, getStore) => {
    const data = getStore().form.registerProductForm.values;
   const id = data.id;
    api.put(`/product/${id}`, data).then((response) => {
    // dispatch(setMe(response));
        NotificationManager.success(
            'Producto Actualizado correctamente',
            'Éxito',
            3000
        );
        dispatch(push('/'));
    }).catch(error => {
        console.log('Error:', error);
        NotificationManager.error(
            'Ocurrió un error al actualizar el producto',
            'ERROR',
            0
        );
    });
};

export const eliminar = (id) => (dispatch) =>{

    api.eliminar(`/product/${id}`).then((response) => {
            NotificationManager.success(
                'Producto eliminado correctamente',
                'Éxito',
                3000
            );
            dispatch(listProducts());
        })
        .catch(error => {
            console.log('Error:', error);
            NotificationManager.error(
                'Ocurrió un error al eliminar el producto',
                'ERROR',
                0
            );
        });
}

export const actions = {
    listProducts,
    registerProduct,
    getProduct, 
    updateProduct,
    eliminar,
};

export const reducers = {
    [SET_PRODUCT_LIST]: (state, { data }) => {
        return {
            ...state,
            data,
        };
    },
    [SET_REGISTER_PRODUCT]: (state, { register }) => {
        return {
            ...state,
            register,
        };
    },

};

export const initialState = {
    loader: false,
    data: null,
    register: null,
};



export default handleActions(reducers, initialState);
