import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({
  id,
  webformatURL,
  largeImageURL,
  onImageClick,
}) => {
  return (
    <li className={css.ImageGalleryItem} key={id}>
      <img
        className={css.ImageGalleryItem_image}
        src={webformatURL}
        alt={id}
        onClick={() => {
          onImageClick(largeImageURL, id);
        }}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  onImageClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
