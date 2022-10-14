import React from "react";
import { Component } from "react";
import { getFetch } from "./Fetch/Fetch";
import Searchbar from "./Searchbar/Searchbar";
import ImageGallery from "./Gallery/ImageGallery";
import Loader from "./Gallery/Loader";
import { Modal } from "./Gallery/Modal";
import { LoadMore } from "./Gallery/Button";
import css from "../index.css"


export default class Gallery extends Component {
    state = {
        query: null,
        hits: [],
        page: 1,
        per_page: 12,
        totalPages: 0,
        loading: false,
        modal: {
            status: false,
            content: '',
        },
        error: {
            status: false,
            message: '',
        },
    };

componentDidUpdate(_, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
        this.handleFetchHits();
}
}

handleFetchHits = async () => {
    const { query, page, per_page } = this.state;
    try {
      this.setState({ loading: true });

      const data = await getFetch(query, page, per_page);

      if (data.hits.length === 0) {
        this.setState({
          error: {
            status: true,
            message: `Sorry, there are no images matching ${query}. Please try again.`,
          },
        });
        return;
      }

      const totalPages = Math.ceil(data.totalHits / per_page);

      this.setState(prevState => {
        return {
          hits: [...prevState.hits, ...data.hits],
          totalPages,
        };
      });
    } catch (error) {
      this.setState({
        error: {
          status: true,
          message: 'Something went wrong :( Please try again later!',
        },
      });
    } finally {
      this.setState({ loading: false });
    }
  };

  handleLoadMore = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  handleSubmit = query => {
    this.setState({
      hits: [],
      query,
      page: 1,
      error: {
        status: false,
        message: '',
      },
    });
  };

  handleOpenModal = hitId => {
    const currentImage = this.state.hits.find(hit => hit.id === hitId);

    this.setState({
      modal: {
        status: true,
        content: currentImage.largeImageURL,
      },
    });
  };

  handleCloseModal = () => {
    this.setState({
      modal: {
        status: false,
        content: '',
      },
    });
  };

  render() {
    const { hits, page, totalPages, loading, modal, error } = this.state;
    const { handleSubmit, handleOpenModal, handleCloseModal, handleLoadMore } =
      this;
    const isHits = hits.length > 0;
    const isModalOpen = modal.status;
    const modalContent = modal.content;
    const showError = error.status && !loading;
    const errorMessage = error.message;
    const buttonVisible = isHits && page < totalPages && ! loading;

    return (
      <div className={css.container}>
        <Searchbar onSubmit={handleSubmit} />
        {showError && errorMessage}
        {isHits && <ImageGallery hits={hits} openModal={handleOpenModal} />}
        {loading && <Loader />}
        {buttonVisible && <LoadMore onClick={handleLoadMore} />}
        {isModalOpen && (
          <Modal largeImageURL={modalContent} closeModal={handleCloseModal} />
        )}
      </div>
    );
  }
}