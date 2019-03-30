import createLoader from 'utils/createLoader';
import loader from './Provider/loader';
import Routes from './Routes';

export default createLoader(
  Routes,
  loader,
);
