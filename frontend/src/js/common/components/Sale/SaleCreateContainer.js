import { connect } from 'react-redux';
import { actions } from '../../../redux/modules/sale/sale';
import SaleCreate from './SaleCreate';


const ms2p = (state) => {
  return {
    ...state.sale,
  };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(SaleCreate );