import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';
import SaleForm from './SaleForm';
import LoadMask from "../Utils/LoadMask/LoadMask";

class Registro extends Component {
    
    state = {
        create: true,
    }

    componentWillMount =() =>{
        const {getProduct, match} = this.props;
        //enviamos el id que viene en la ruta, lo hacemos con mathc
        const id = match.params.id;
        if(id){
            this.setState({create: false})
            console.log('id Producto', id)
            getProduct(id);
        }
    }

    render() {
        const { registerSale, updateProduct,} = this.props;
        const {create} = this.state;
        //verificamos que tipo de funcion necesita el form si es actualizar o registrar
        const sendFunction = create ? registerSale : updateProduct;
        return (
            <React.Fragment>
                <div className="container">                    
                    <SaleForm   
                        create = {create}                     
                        onSubmit={registerSale}                
                    />
                </div>                
            </React.Fragment>
        );        
    }
}

export default Registro;
