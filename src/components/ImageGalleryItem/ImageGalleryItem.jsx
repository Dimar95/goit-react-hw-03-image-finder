import css from '../styles.module.css';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ id, webformatURL, onActivImg, toggleModal }) => {
  return (
    <li
      className={css.ImageGalleryItem}
      onClick={() => {
        toggleModal();
        onActivImg(id);
      }}
    >
      <img src={webformatURL} alt="" className={css.ImageGalleryItemImage} />
    </li>
  );
};
export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  webformatURL: PropTypes.string.isRequired,
  onActivImg: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
};
