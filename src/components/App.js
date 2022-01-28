import React, { Component, createRef } from 'react';
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

const modalRoot = createRef();

export default class App extends Component {
  state = {
    query: '',
    images: [],
    status: Status.IDLE,
    page: 1,
    PER_PAGE: 12,
    totalHits: null,
    totalPages: null,
    showModal: false,
    modalImage: null,
    modalAlt: null,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;
    const prevQuery = prevState.query;
    const nextQuery = query;
    const prevPage = prevState.page;
    const nextPage = page;

    if (prevQuery !== nextQuery || prevPage !== nextPage) {
      this.setState({ status: Status.PENDING });
      await this.fetchImages(query, page);
    }
  }

  fetchImages = async (query, page) => {
    const { PER_PAGE } = this.state;
    API(query, page)
      .then(({ hits, totalHits }) => {
        if (hits.length === 0) {
          toast.error(`По запросу ${query} ничего не найдено`, {
            duration: 1000,
          });
          return Promise.reject();
        }

        this.setState(prevState => {
          return {
            images: [...prevState.images, ...hits],
            totalHits: totalHits,
            totalPages: Math.ceil(totalHits / PER_PAGE),
            status: Status.RESOLVED,
          };
        });
        if (page === this.state.totalPages) {
          toast.success('There are all images!');
        }
      })
      .catch(error => this.setState({ status: Status.REJECTED }));
  };

  handleInputValue = searchQuery => {
    this.setState({ query: searchQuery, page: 1, images: [] });
  };

  incrementPage = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  handleLoadMoreButtonClick = e => {
    this.incrementPage();
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  handleShowModal = (src, alt) => {
    this.toggleModal();
    this.setState({ modalImage: src, modalAlt: alt });
  };

  render() {
    const {
      images,
      page,
      totalPages,
      status,
      showModal,
      modalImage,
      modalAlt,
    } = this.state;

    return (
      <AppStyles>
        <Searchbar onSubmit={this.handleInputValue} />
        {status === 'pending' && page === 1 && <Loader />}
        {images.length > 0 && (
          <ImageGallery images={images} onClick={this.handleShowModal} />
        )}
        {status === 'pending' && page > 1 && <Loader />}
        {status === 'resolved' && page < totalPages && (
          <Button onClick={this.handleLoadMoreButtonClick} status={status} />
        )}
        <Toaster />
        {showModal && (
          <Modal
            root={modalRoot}
            src={modalImage}
            title={modalAlt}
            onClose={this.toggleModal}
          />
        )}
      </AppStyles>
    );
  }
}
