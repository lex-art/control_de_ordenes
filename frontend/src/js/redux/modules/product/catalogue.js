import { handleActions } from 'redux-actions';
import { push } from 'react-router-redux';
import { initialize as initializeForm } from 'redux-form';
import { NotificationManager } from 'react-notifications';
import { api } from 'api';


const SET_CATALOGUE_LIST = 'SET_CATALOGUE_LIST';

export const listCatalogue = () => (dispatch)=>  {
    api.get('/catalogue').then(response => {
        if (response){          
            console.log(response);    
            dispatch({
                type: SET_CATALOGUE_LIST,
                data: response,
            });       
        }
        
    }).catch(error => {
        console.log('error:', error);
        NotificationManager.error(
            'Ocurrió un error al listar los productos',
            'ERROR',
            0
        );
    });
};


export const actions = {
    listCatalogue,   
};

export const reducers = {
    [SET_CATALOGUE_LIST]: (state, { data }) => {
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
