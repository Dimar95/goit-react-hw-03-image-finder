import css from '../styles.module.css';

const LoadMore = ({ onButton }) => {
  return (
    <button type="button" onClick={onButton} className={css.Button}>
      Load More
    </button>
  );
};
export default LoadMore;
