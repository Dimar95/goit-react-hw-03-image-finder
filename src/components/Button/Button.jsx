import css from '../styles.module.css';
import PropTypes from 'prop-types';

const LoadMore = ({ onButton }) => {
  return (
    <button type="button" onClick={onButton} className={css.Button}>
      Load More
    </button>
  );
};
export default LoadMore;

LoadMore.propType = {
  onButton: PropTypes.func.isRequired,
};
