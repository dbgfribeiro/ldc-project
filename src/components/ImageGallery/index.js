import React, { useEffect, useState, useRef } from 'react';

import PropTypes from 'prop-types';

import { storage } from '../../firebase';
import { ref, listAll, getDownloadURL } from 'firebase/storage';

import { randomNumberInRange, mergeByProperty } from '../../utils';

import styles from './image-gallery.module.scss';

const ImageGallery = ({ lastImage }) => {
  const [smiles, setSmiles] = useState([]);

  // sets the limit of images to be shown
  let gridLimit = 200;

  useEffect(() => {
    const listRef = ref(storage, '');
    let counter = 0;

    // gets all images from firebase and stores them on smiles array
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

  useEffect(() => {
    // generates the random number of times the new image will be shown
    let numberOfCopys = randomNumberInRange(1, 10);
    const smileCopys = [];

    if (lastImage !== '') {
      for (let i = 0; i < numberOfCopys; i++) {
        const newSmile = {
          imgUrl: lastImage,
          isNew: true,
          id: 0,
          cols: 3,
          rows: 3,
        };
        smileCopys.push(newSmile);
      }

      // adds the new images to a random position insite smiles array
      const updateSmiles = [...smiles];
      smileCopys.forEach((c) => (c.id = randomNumberInRange(0, gridLimit / 2)));
      mergeByProperty(updateSmiles, smileCopys, 'id');
      setSmiles(updateSmiles);
    }
  }, [lastImage]);

  return (
    <div className={styles.galleryGrid}>
      {smiles.slice(0, gridLimit).map((smile, index) => (
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
