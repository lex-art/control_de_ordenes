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
                    <p>Para poder comprar necesitas registrate o bien iniciar sesión</p>
                    </div>
                        
                        <div className="d-flex justify-content-end">
                            <div className= "m-1 p-1" >
                                <Link className='btn btn-primary' to='/login'>Inciar sesion</Link>
                            </div>  
                            <div className= "m-1 p-1" >
                                <Link className="btn btn-success" to="/registro">Registrate aquí</Link>
                            </div>                          
                            
                            
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
