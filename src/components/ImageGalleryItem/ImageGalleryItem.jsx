import { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'components/Modal/Modal';
import { ImageItem, Image, ImageLarge } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ src, largeImageURL, alt }) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(prevState => !prevState);
  };

  return (
    <ImageItem>
      <Image src={src} alt={alt} onClick={toggleModal} />

      {showModal && (
        <Modal onClose={toggleModal}>
          <ImageLarge src={largeImageURL} alt={alt} />
        </Modal>
      )}
    </ImageItem>
  );
};

ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
