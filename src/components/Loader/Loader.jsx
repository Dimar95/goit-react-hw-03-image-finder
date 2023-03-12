import { Grid } from 'react-loader-spinner';
import css from '../styles.module.css';

const Loader = () => {
  return (
    <div className={css.Loader}>
      <Grid
        height="80"
        width="80"
        color="#3f51b5"
        ariaLabel="grid-loading"
        radius="12.5"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};
export default Loader;
