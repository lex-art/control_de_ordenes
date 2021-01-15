import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Grid from '../Utils/Grid';
import { standardActions } from '../Utils/Grid/StandardActions';


class ProductList extends Component {
    
    componentWillMount = () => {
        const { listProducts } = this.props;
        listProducts();
    };



    render() {
        const { data, loader, eliminar} = this.props; 
        // const users = this.countUsers(data);
        return (
            <React.Fragment>
            <div className="py-4">               
               
                <div className="my-4 containetr p-4 padding card ">
                    <div className="row justify-content-around text-center px-4 head">
                        <h1>Tus poductos disponibles</h1>   
                        <div className="align-self-center">
                            <Link className='btn btn-success text-withe font-weight-bold ' to='/product_create'>Registrar productos</Link>
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
                                        editar: '',
                                        ver: '',
                                        eliminar: eliminar,
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
