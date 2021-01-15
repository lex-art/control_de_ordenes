import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form'
import login from './modules/cuenta/login';
import register from './modules/cuenta/register';
import profile from './modules/cuenta/profile';
import usuarios from './modules/usuarios/usuarios';
import notificaciones from './modules/notificaciones/notificaciones';

// productos 
import products from './modules/product/products';
import catalogue from './modules/product/catalogue';
import sale from './modules/sale/sale';
import report from './modules/report/report';

export default combineReducers({
    form: formReducer,
    login,
    register,
    profile,
    usuarios,
    routing,
    notificaciones,
    //productos
    catalogue,
    products,
    sale,
    report,
   
});
