import React from 'react';
import PropTypes from 'prop-types';

import ImageGallery from '../../components/ImageGallery';

import styles from './gallery.module.scss';

const Gallery = ({ lastImage }) => {
  return (
    <main className={styles.galleryWrapper}>
      <ImageGallery lastImage={lastImage} />
    </main>
  );
};

Gallery.propTypes = {
  lastImage: PropTypes.string,
};

export default Gallery;
