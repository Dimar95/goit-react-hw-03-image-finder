import css from '../styles.module.css';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

const ImageGallery = ({ arrayImg }) => {
  console.log('🎅 ~ arrayImg:', arrayImg);
  return (
    <ul className={css.ImageGallery}>
      {arrayImg.map(img => {
        const { id, webformatURL, largeImageURL } = img;
        return (
          <ImageGalleryItem
            key={id}
            webformatURL={webformatURL}
            largeImageURL={largeImageURL}
          />
        );
      })}
    </ul>
  );
};
export default ImageGallery;
