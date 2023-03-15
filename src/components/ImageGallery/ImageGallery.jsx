import css from '../styles.module.css';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import { Component } from 'react';
import PropTypes from 'prop-types';

class ImageGallery extends Component {
  render() {
    return (
      <>
        <ul className={css.ImageGallery} onClick={this.onActivImg}>
          {this.props.arrayImg.map((img, i) => {
            const { id, webformatURL } = img;
            return (
              <ImageGalleryItem
                key={id}
                id={id}
                webformatURL={webformatURL}
                onActivImg={this.props.onActivImg}
                toggleModal={this.props.toggleModal}
              />
            );
          })}
        </ul>
      </>
    );
  }
}
export default ImageGallery;
ImageGallery.propTypes = {
  arrayImg: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  toggleModal: PropTypes.func.isRequired,
  onActivImg: PropTypes.func.isRequired,
};
