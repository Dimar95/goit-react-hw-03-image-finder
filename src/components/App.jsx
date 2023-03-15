import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import fetchImg from './utils/fetchAPI';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import css from './styles.module.css';
import Modal from 'components/Modal/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class App extends Component {
  state = {
    search: '',
    page: 0,
    arrayImg: [],
    showModal: false,
    status: false,
    activImg: 0,
  };

  async componentDidUpdate(prevProps, prevState) {
    if (
      this.state.search !== prevState.search ||
      this.state.page !== prevState.page
    ) {
      this.setState({ status: 'loader' });
      const result = await fetchImg(this.state.search, this.state.page);
      this.setState(prevState => ({
        arrayImg: [...prevState.arrayImg, ...result.hits],
        status: 'loadMore',
      }));
      if (result.hits.length === 0) {
        this.setState({
          status: false,
        });
        toast.error(`No search results ${this.state.search}`, {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        });
      }
      if (result.hits.length < 12) {
        this.setState({
          status: false,
        });
      }
    }
  }

  onSubmit = search => {
    if (this.state.search === search) {
      return;
    }
    if (search.trim() === '') {
      toast.error('Enter a request', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
      return;
    }
    this.setState({ search, arrayImg: [], page: 1 });
  };

  onLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  toggleModal = () => {
    this.setState(prevState => ({
      showModal: !prevState.showModal,
    }));
  };
  onActivImg = i => {
    this.setState({
      activImg: this.state.arrayImg.filter(img => {
        return img.id === i;
      }),
    });
  };

  render() {
    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.onSubmit} />;
        {this.state.arrayImg.length > 0 && (
          <ImageGallery
            arrayImg={this.state.arrayImg}
            toggleModal={this.toggleModal}
            onActivImg={this.onActivImg}
          />
        )}
        {this.state.status === 'loader' && <Loader />}
        {this.state.status === 'loadMore' && (
          <Button onButton={this.onLoadMore} />
        )}
        {this.state.showModal && (
          <Modal
            toggleModal={this.toggleModal}
            activeImage={this.state.activImg}
          />
        )}
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
    );
  }
}

export default App;
