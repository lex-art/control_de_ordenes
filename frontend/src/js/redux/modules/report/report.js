import { handleActions } from 'redux-actions';
import { push } from 'react-router-redux';
import { initialize as initializeForm } from 'redux-form';
import { NotificationManager } from 'react-notifications';
import { api } from 'api';

const SET_REPORT_LIST = 'SET_REPORT_LIST';

export const listReport = () => (dispatch)=>  {
    api.get('/report').then(response => {
        if (response){           
            console.log("response desde redux perodt",response);           
        }   
        dispatch({
            type: SET_REPORT_LIST,
            data: response,
        });
    }).catch(error => {
        console.log('error:', error);
        NotificationManager.error(
            'Ocurrió un error al listar los reportes',
            'ERROR',
            0
        );
    });
};

export const getProduct = (id) => dispatch => {
    
    api.get(`/product/${id}`).then((response)=>{
        console.log("dato producto:", response)
        dispatch ({type: SET_REGISTER_SALE, register: response});
        dispatch(initializeForm('registerSaleForm', response));
    }).catch(error => {
        console.log('error:', error);
        NotificationManager.error(
            'Ocurrió un error al consultar el registro',
            'ERROR',
            0
        );
    });
}


export const actions = {
    listReport,
    
};

export const reducers = {
    [SET_REPORT_LIST]: (state, { data }) => {
        return {
            ...state,
            data,
        };
    },   

};

export const initialState = {
    loader: false,
    data: null,
   
};



export default handleActions(reducers, initialState);
