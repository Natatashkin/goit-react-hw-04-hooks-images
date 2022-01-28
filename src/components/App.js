import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
// import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import AppStyles from './App.styled';
import API from '../serviseAPI';
import ImageGallery from './ImageGallery';
import Searchbar from './Searchbar';
import Loader from './Loader';
import Button from './Button';
import Modal from './Modal';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

const App = () => {
  // const { IDLE, PENDING, RESOLVED, REJECTED } = Status;
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState(Status.IDLE);
  const PER_PAGE = 12;
  const [totalHits, setTotalHits] = useState(null);
  const [totalPages, setTotalPages] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const [modalAlt, setModalAlt] = useState(null);

  const handleInputValue = searchQuery => {
    setQuery(searchQuery);
    setPage(1);
    setImages([]);
  };

  const handleShowModal = (src, alt) => {
    toggleModal();
    setModalImage(src);
    setModalAlt(alt);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const incrementPage = () => {
    setPage(prevPage => prevPage + 1);
  };
  const handleLoadMoreButtonClick = () => {
    incrementPage();
  };

  useEffect(() => {
    if (query === '') {
      return;
    }

    setStatus(Status.PENDING);

    API(query, page)
      .then(({ hits, totalHits }) => {
        if (hits.length === 0) {
          toast.error(`По запросу ${query} ничего не найдено`, {
            duration: 1000,
          });
          return Promise.reject();
        }
        setImages(prevImages => [...prevImages, ...hits]);
        setTotalHits(totalHits);
        setTotalPages(Math.ceil(totalHits / PER_PAGE));
        setStatus(Status.RESOLVED);
      })
      .catch(error => setStatus(Status.REJECTED));
  }, [query, page]);

  useEffect(() => {
    if (page === totalPages) {
      toast.success('There are all images!');
    }
  }, [page, totalPages]);

  return (
    <AppStyles>
      <Searchbar onSubmit={handleInputValue} />
      {status === Status.PENDING && page === 1 && <Loader />}
      {images.length > 0 && (
        <ImageGallery images={images} onClick={handleShowModal} />
      )}
      {status === Status.PENDING && page > 1 && <Loader />}
      {status === Status.RESOLVED && page < totalPages && (
        <Button onClick={handleLoadMoreButtonClick} status={status} />
      )}
      <Toaster />
      {showModal && (
        <Modal src={modalImage} title={modalAlt} onClose={toggleModal} />
      )}
    </AppStyles>
  );
};

export default App;
