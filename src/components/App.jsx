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
    page: 1,
    arrayImg: null,
    showModal: false,
    status: false,
    activImg: 0,
    loadMore: true,
  };

  onSubmit = search => {
    this.setState({ search, page: 1, arrayImg: null });
  };
  async componentDidUpdate(prevProps, prevState) {
    if (this.state.search !== prevState.search) {
      this.setState({ status: true });
      const result = await fetchImg(this.state.search, this.state.page);

      if (result.length === 0) {
        toast.error(`No search ${this.state.search}`, {
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

      this.setState({
        arrayImg: result.hits,
        status: false,
      });
    }
    if (this.state.page !== prevState.page) {
      console.log('this.state.arrayImg', this.state.arrayImg);
      this.setState({ status: true });
      const result = await fetchImg(this.state.search, this.state.page);
      this.setState(prevState => ({
        arrayImg: [...prevState.arrayImg, ...result.hits],
        status: false,
      }));
    }
  }

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
        {this.state.arrayImg && (
          <ImageGallery
            arrayImg={this.state.arrayImg}
            toggleModal={this.toggleModal}
            onActivImg={this.onActivImg}
          />
        )}
        {this.state.status && <Loader />}
        {this.state.arrayImg && <Button onButton={this.onLoadMore} />}
        {this.state.showModal && (
          <Modal
            toggleModal={this.toggleModal}
            children={this.state.activImg}
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
