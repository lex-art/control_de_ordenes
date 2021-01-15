import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';
import ProductForm from './ProductForm';
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
        const { registerProduct, updateProduct,} = this.props;
        const {create} = this.state;
        //verificamos que tipo de funcion necesita el form si es actualizar o registrar
        const sendFunction = create ? registerProduct : updateProduct;
        return (
            <React.Fragment>
                <div className="container">                    
                    <ProductForm   
                        create = {create}                     
                        onSubmit={sendFunction}                
                    />
                </div>                
            </React.Fragment>
        );        
    }
}

export default Registro;
