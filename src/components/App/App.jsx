import React, { useState, useEffect } from 'react';
import { animateScroll } from 'react-scroll';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { fetchImages } from 'services/api';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [queryPage, setQueryPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [totalImages, setTotalImages] = useState(null);
  // const [error, setError] = useState(false);

  useEffect(() => {
    if (!searchQuery) {
      return;
    }

    const getImages = async () => {
      setLoading(true);

      if (searchQuery.trim() === '') {
        toast.info('You cannot search by empty field, try again.');
        setLoading(false);

        return;
      } else {
        try {
          const { totalHits, hits } = await fetchImages(searchQuery, queryPage);
          // console.log(totalHits, hits);

          if (hits.length === 0) {
            toast.warn(
              'Sorry, there are no images matching your search query. Please try again.'
            );
            setImages([]);
            setLoading(false);
          } else {
            if (queryPage === 1) {
              setImages(hits);
            } else {
              setImages(prevImages => [...prevImages, ...hits]);
            }

            setTotalImages(totalHits);
            setLoading(false);
          }
        } catch (error) {
          // setError(true);
          toast.error('Sorry, something go wrong! Try again!');
        }
      }
    };

    getImages();
  }, [searchQuery, queryPage]);

  const handleFormSubmit = searchQuery => {
    setSearchQuery(searchQuery);
    setQueryPage(1);
    setLoading(true);

    animateScroll.scrollToTop({ duration: 500, smooth: 'easeInOutQuart' });
  };

  const handleLoadMore = () => {
    setQueryPage(prevState => prevState + 1);
    animateScroll.scrollToBottom({ duration: 500, smooth: 'easeInOutQuart' });
  };

  return (
    <>
      <Searchbar onSubmit={handleFormSubmit} />
      <ToastContainer autoClose={3000} />

      <ImageGallery images={images} />
      {loading && <Loader />}
      {!loading && images.length > 0 && images.length < totalImages && (
        <Button onClick={handleLoadMore} />
      )}
    </>
  );
};