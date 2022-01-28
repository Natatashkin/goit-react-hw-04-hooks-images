import React from 'react';
import PropTypes from 'prop-types';
import { Gallery } from './ImageGallery.styled';
import ImageGalleryItem from '../ImageGalleryItem';

const ImageGallery = ({ images, onClick }) => {
  return (
    <Gallery>
      {images.map(({ tags, webformatURL, largeImageURL }, index) => (
        <ImageGalleryItem
          key={index}
          src={webformatURL}
          alt={tags}
          onClick={() => onClick(largeImageURL, tags)}
        />
      ))}
    </Gallery>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      tags: PropTypes.string,
      webformatURL: PropTypes.string,
      largeImageURL: PropTypes.string,
    }),
  ),
  onClick: PropTypes.func.isRequired,
};

export default ImageGallery;
