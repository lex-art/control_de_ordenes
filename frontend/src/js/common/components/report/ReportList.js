import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Grid from '../Utils/Grid';
import { standardActions } from '../Utils/Grid/StandardActions';


class ReportList extends Component {
    
    componentWillMount = () => {
        const { listReport } = this.props;
        listReport();
        
    };



    render() {
        const { data, loader, eliminar} = this.props; 
        // const users = this.countUsers(data);
        //console.log("Esta es la data" , data.results[0].total)
        var result = 0;  
             
        {    
                let tope =  data && data.count
                for (let i = 0; i < tope; i++) {
                    var temp = data.results && data.results[i].total
                    result =    result + temp;                   
                    
                }
                
        }
        console.log("Esta es el total" , result)
        
       
        return (
            <React.Fragment>
            <div className="py-4">      
            <div className="p-4 padding card">
                        <div className="row justify-content-around px-4 head">
                           
                            
                            <div className = "align-self-center text-center">
                                <h1>
                                    { data && data.count
                                    
                                    }
                                </h1>
                                <p>Productos vendidos</p>

                            </div>

                            <div className = "align-self-center text-center">
                                <h1>
                                    Q.{ 
                                        data && result
                                    }
                                </h1>
                                <p>Ventas Totales</p>

                            </div>

                            <div className = "align-self-center text-center">
                                <h1>
                                    Q.{ 
                                        data && result / data.count
                                    }
                                </h1>
                                <p>Promedio de los precios manejados </p>

                            </div>

                        </div>
                </div>         
               
                <div className="my-4 containetr p-4 padding card ">
                    <div className="row justify-content-between text-center px-4 head">
                        <h1>Tus poductos vendidos</h1>
                        {
                        data && 
                            <Grid 
                                hover
                                striped
                                data={data}
                                loading={loader}
                                //onPageChange={onPageChange}
                                //onSortChange={onSortChange}
                            >        
                                
                                <TableHeaderColumn 
                                     dataField='sale_detail'
                                     dataSort                         
                                     //cel es un objeto como tal, en este caso saria position
                                     dataFormat={(cell)=>{
                                         return `${cell.product.name} `;}}
                                >
                                    Producto
                                </TableHeaderColumn>              
                                <TableHeaderColumn isKey dataField='date' dataSort>
                                    fecha
                                </TableHeaderColumn>                    
                                <TableHeaderColumn 
                                text= 'Q.'
                                dataField='total' dataSort
                                   
                                >
                                    Total x producto vendido
                                </TableHeaderColumn>                    
                                <TableHeaderColumn
                                    dataField='sale_detail'
                                    dataSort                         
                                    //cel es un objeto como tal, en este caso saria position
                                    dataFormat={(cell)=>{
                                        return `${cell.quantity} `;}}
                                >
                                    Cantidad
                                </TableHeaderColumn>   
                                <TableHeaderColumn 
                                    dataField='buyer' 
                                    dataSort
                                    //cel es un objeto como tal, en este caso saria position
                                    dataFormat={(cell)=>{
                                        return `${cell.user.username} `;}}
                                >
                                    Comprador
                                </TableHeaderColumn> 
                            </Grid>
                    }

                    </div> 
                    <div className="p-3 padding">                    
                    </div>  
                </div>              
            </div>
                
                
            </React.Fragment>
        );
    }
}

export default ReportList;
