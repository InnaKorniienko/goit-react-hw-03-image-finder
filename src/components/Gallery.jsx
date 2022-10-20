import React from "react";
import { Component } from "react";
import { getFetch } from "./Fetch/Fetch";
import Searchbar from "./Searchbar/Searchbar";
import { ImageGallery } from "./Gallery/ImageGallery/ImageGallery";
import Loader from "./Gallery/Loader/Loader";
import { Modal } from "./Gallery/Modal/Modal";
import { LoadMore } from "./Gallery/Button/Button";


export default class Gallery extends Component {
    state = {
        query: null,
        hits: [],
        page: 1,
        per_page: 12,
        totalPages: 0,
        loading: false,
        showModal: false,
        currentLargeImageURL: '',
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

toggleModal = (url) => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      currentlargeImageURL: url,
    }));
  };


  render() {
    const { hits, page, totalPages, loading, error, currentlargeImageURL } = this.state;
    const { handleSubmit, toggleModal, handleLoadMore } =
      this;
    const isHits = hits.length > 0;
    const showError = error.status && !loading;
    const errorMessage = error.message;
    const buttonVisible = isHits && page < totalPages && ! loading;

    return (
        <>
         <Searchbar onSubmit={handleSubmit} />
        {showError && errorMessage}
        {isHits && <ImageGallery hits={hits} onClick={toggleModal}/>}
        {loading && <Loader />}
        {buttonVisible && <LoadMore onClick={handleLoadMore} />}
        {currentlargeImageURL && (
          <Modal url={currentlargeImageURL} closeModal={toggleModal}/>
        )}
        </>
    );
  }
}