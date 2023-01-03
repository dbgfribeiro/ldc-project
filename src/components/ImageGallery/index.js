import React, { useEffect, useState, useRef } from 'react';

import PropTypes from 'prop-types';

import { storage } from '../../firebase';
import { ref, listAll, getDownloadURL } from 'firebase/storage';

import { randomNumberInRange } from '../../utils';

import styles from './image-gallery.module.scss';

const ImageGallery = ({ lastImage }) => {
  const [smiles, setSmiles] = useState([]);

  useEffect(() => {
    const listRef = ref(storage, '');
    let counter = 0;
    listAll(listRef)
      .then((res) => {
        res.items.forEach((itemRef) => {
          const downloadUrl = getDownloadURL(ref(storage, itemRef));
          downloadUrl.then((url) => {
            smiles.push({
              imgUrl: url,
              id: counter++,
              cols: randomNumberInRange(1, 2),
              rows: randomNumberInRange(1, 2),
            });
            setSmiles([...smiles]);
          });
        });
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  console.log(smiles);

  useEffect(() => {
    if (lastImage !== '') {
      const newSmile = {
        imgUrl: lastImage,
        isNew: true,
        id: smiles.length + 1,
        cols: 3,
        rows: 3,
      };
      const updateSmiles = [...smiles];
      updateSmiles.splice(randomNumberInRange(1, 20), 0, newSmile);
      setSmiles(updateSmiles);
    }
  }, [lastImage]);

  return (
    <div className={styles.galleryGrid}>
      {smiles.map((smile, index) => (
        <img
          className={styles.galleryImage}
          style={
            !smile.isNew && lastImage !== ''
              ? {
                  gridColumn: 'span ' + smile.cols,
                  gridRow: 'span ' + smile.rows,
                  filter: 'grayscale(1)',
                }
              : smile.isNew && lastImage !== ''
              ? {
                  gridColumn: 'span ' + smile.cols,
                  gridRow: 'span ' + smile.rows,
                  filter: 'grayscale(0)',
                }
              : {
                  gridColumn: 'span ' + smile.cols,
                  gridRow: 'span ' + smile.rows,
                }
          }
          key={index}
          src={smile.imgUrl}
          alt="image of someone smiling"
        />
      ))}
    </div>
  );
};

ImageGallery.propTypes = {
  lastImage: PropTypes.string,
};

export default ImageGallery;
