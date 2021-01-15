import { connect } from 'react-redux';
import { actions } from '../../../redux/modules/product/catalogue';
import CatalogueList from './CatalogueList';


const ms2p = (state) => {
  return {
    ...state.catalogue,
  };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(CatalogueList);