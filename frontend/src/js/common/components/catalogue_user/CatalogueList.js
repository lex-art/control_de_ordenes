import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Grid from '../Utils/Grid';
import { standardActions } from '../Utils/Grid/StandardActions';

class ProductList extends Component {
        
    componentWillMount = () => {
        const { listCatalogue } = this.props;
        listCatalogue();
    };

    render() {
        const { data, loader } = this.props; 
        // const users = this.countUsers(data);
        return (
            <React.Fragment>
            <div className="py-4">               
               
                <div className="my-4 containetr p-4 padding card ">
                    <div className="row justify-content-between text-center px-4 head">
                    <div className = "align-self-start ">
                        <h1>Catalogo de productos disponibles</h1>
                        <p>Selecciona el producto que deseas comprar</p>
                    </div> 
                    </div> 
                    <div className="p-3 padding">
                    {
                        data && 
                            <Grid 
                                hover
                                striped
                                data={data}
                                loading={loader}
                                // onPageChange={onPageChange}
                                // onSortChange={onSortChange}
                            >                                
                                <TableHeaderColumn isKey dataField='name' dataSort>
                                    Nombre
                                </TableHeaderColumn>                    
                                <TableHeaderColumn dataField='description' dataSort >
                                    Descripción
                                </TableHeaderColumn>                    
                                <TableHeaderColumn dataField='price' dataSort>
                                    Precio
                                </TableHeaderColumn>                                
                                <TableHeaderColumn dataField= 'existence' dataSort>
                                    Existencia
                                </TableHeaderColumn>
                                
                                <TableHeaderColumn
                                    dataField='id'
                                    dataAlign='center'
                                    dataSort
                                    dataFormat={standardActions({
                                        comprar: 'catalogo',
                                    })}
                                >
                                    Acciones
                                </TableHeaderColumn>
                            </Grid>
                    }
                    </div>  
                </div>              
            </div>
                
                
            </React.Fragment>
        );
    }
}

export default ProductList;
