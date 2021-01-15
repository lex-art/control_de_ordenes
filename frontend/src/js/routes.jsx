import React from 'react';
import {
    Route,
    Switch,
    Redirect,
} from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';

import {Login, Profile, Registro} from './common/components/LoginRegister';
import Demo from './common/components/Demo/Demo';
import ProtectedRoute from './ProtectedRoute';
import Examples from './common/components/Examples/Basic';
import NotFound from './common/components/layout/NotFound/NotFound';

import '../assets/fonts/fonts.css';

require('../../node_modules/font-awesome/css/font-awesome.css');
require('../../node_modules/bootstrap/dist/css/bootstrap.css');
import 'bootstrap/dist/css/bootstrap.min.css';
import Grids from "./common/components/Examples/Grids";
import Notificaciones from './common/components/Examples/Notificaciones';
import ExampleTabs from './common/components/Examples/Tabs/Tabs';
require('../style/index.css');

// ----------------------- Productos ------------------------------------
import ProductListContainer from './common/components/Product/ProductListContainer';
import CatalogueListContainer from './common/components/catalogue/CatalogueListContainer';
import ProductCreateContainer from './common/components/Product/ProductCreateContainer';
import SaleCreateContainer from './common/components/Sale/SaleCreateContainer';
import ReportListContainer from './common/components/report/ReportListContainer';
import CatalogueListContainerUser from './common/components/catalogue_user/CatalogueListContainerUser';

module.exports = (
    <div>
        <div className="container__content">
            <Switch>
                <Route exact path="/" component={CatalogueListContainer} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/registro" component={Registro} />
                
                {/* -------------------- Productos -------------------------- */}
                <ProtectedRoute exact path="/report" component={ReportListContainer} />
                <ProtectedRoute exact path="/catalogo_user" component={CatalogueListContainerUser} />

                <ProtectedRoute exact path="/producto" component={ProductListContainer} />
                <ProtectedRoute exact path="/product_create" component={ProductCreateContainer} />
                <ProtectedRoute exact path="/:id" component={ProductCreateContainer} />
                <ProtectedRoute exact path="/:id/editar" component={ProductCreateContainer} />
                
                <ProtectedRoute exact path="/catalogo/:id/comprar" component={SaleCreateContainer} />
               


                <ProtectedRoute exact path="/page2" component={Examples} />
                <ProtectedRoute exact path="/user-profile" component={Profile} />
                <ProtectedRoute exact path="/grids" component={Grids} />
                <ProtectedRoute exact path="/notifications" component={Notificaciones} />
                <ProtectedRoute exact path="/tabs" component={ExampleTabs} />
                
                
                
                
                <Route component={NotFound} />
            </Switch>
        </div>
        <NotificationContainer />
    </div>
);
