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
        showModal: false,
        largeImageURL: '',
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

  // handleOpenModal = (largeImage, tag, id) => {
  //   this.setState({
  //     modal: {
  //       status: true,
  //     },
  //     largeImageURL: largeImage,
  //     tags: tag,
  //       })
  // };

  // handleCloseModal = () => {
  //   this.setState({
  //     modal: false,
  //     largeImageURL: "",
  //   });
  // };

  toggleModal = (largeImageURL) => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      largeImageURL: largeImageURL,
    }));
  };


  render() {
    const { hits, page, totalPages, loading, showModal, error, largeImageURL } = this.state;
    const { handleSubmit, toggleModal, handleLoadMore } =
      this;
    const isHits = hits.length > 0;
    // const isModalOpen = modal.status;
    const showError = error.status && !loading;
    const errorMessage = error.message;
    const buttonVisible = isHits && page < totalPages && ! loading;

    return (
      <div className={css.container}>
        <Searchbar onSubmit={handleSubmit} />
        {showError && errorMessage}
        {isHits && <ImageGallery hits={hits} openModal={toggleModal} />}
        {loading && <Loader />}
        {buttonVisible && <LoadMore onClick={handleLoadMore} />}
        {showModal && (
          <Modal largeImageURL={largeImageURL} closeModal={toggleModal}/>
        )}
      </div>
    );
  }
}