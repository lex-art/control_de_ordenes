import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { api } from '../../../utility/api';
import {
    renderField,   
    renderCurrency,
    renderNumber
}  from '../Utils/renderField';


class ProductForm  extends Component { 
    render(){
    const { handleSubmit,  create} = this.props;
    const editar = window.location.href.includes('editar');
    let disabled = false;
    let titulo = editar ? 'Edita los datos de tu producto':'Registrar un producto nuevo';
    //si no esta creando y no esta editando entonces esta viendo
    if(create==false && editar == false){
        //por lo tanto solo va a poder ver el registro sin poder editar los
        //registros
        disabled = true;        
        titulo = 'Datos de tu producto';
    }
    
    return (
            <div className="py-4">
                <div className="formulario-background container p-4 padding card ">
                    <div className="text-center b-1 padding-bottom head">
                        <h1>{titulo}</h1>
                    </div>
                    <form name="NewEmployee" className="form-validate mb-lg p-4 padding" onSubmit={handleSubmit}>
             
                        <div className="mb-3 col-12">
                            <div className="row">
                                <div className="col-md-6 col-12 mb-2">
                                    <div className="form-group has-feedback">
                                        <label htmlFor="name">Nombre</label>
                                        <Field
                                            name="name"
                                            label="name"
                                            component={renderField}
                                            type="text"
                                            placeholder="Nombre"
                                            className="form-control"
                                            disabled = {disabled}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6 col-12 mb-2">
                                    <div className="form-group has-feedback">
                                        <label htmlFor="description">Descripcion</label>
                                        <Field 
                                            name="description"
                                            label="description"
                                            component={renderField}
                                            placeholder="Descripción"
                                            type="text"
                                            className="form-control"
                                            disabled = {disabled}
                                        />
                                    </div>
                                </div>

                                <div className="col-md-6 col-12 mb-2">
                                    <label htmlFor="number_field">Precio</label>
                                    <Field
                                        name="price"
                                        placeholder="Costo"
                                        component={renderCurrency}
                                        disabled = {disabled}
                                    />
                                </div>

                                <div className="col-md-6 col-12 mb-2">
                                    <label htmlFor="number_field">Existencia</label>
                                    <Field
                                        name="existence"
                                        placeholder="Existencia"
                                        component={renderNumber}
                                        disabled = {disabled}
                                    />
                                </div>                            
                                 
                            </div>                            
                        </div>    
                        <div className="col align-self-center ">  
                            <div className="buttons-box">     
                            {    
                                disabled == false && 
                                    <button
                                        type="submit" 
                                        className= {`btn ${editar ? 'btn-success' : 'btn-primary'}`}
                                    > {editar ? 'Actualizar' : 'Registrar'} </button> 
                            } 
                            <Link className="btn btn-secondary btn-sm m-1" to='/producto'>Regresar</Link>               
                            </div>
                        </div>                  
                    </form>
                </div>
            </div>
    );
    }
};

export default reduxForm({
    form: 'registerProductForm', // a unique identifier for this form
    
})(ProductForm);
