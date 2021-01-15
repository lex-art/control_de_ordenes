import { connect } from 'react-redux';
import { actions } from '../../../redux/modules/report/report';
import ReportList from './ReportList';


const ms2p = (state) => {
  return {
    ...state.report,
  };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(ReportList);