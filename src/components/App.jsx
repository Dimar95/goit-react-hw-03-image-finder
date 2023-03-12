import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import fetchImg from './utils/fetchAPI';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import css from './styles.module.css';

class App extends Component {
  state = {
    search: '',
    page: 1,
    arrayImg: null,
    status: false,
  };
  onSubmit = async search => {
    this.setState({ status: true });

    this.setState({ page: 1 });
    const result = await fetchImg(search, this.state.page);
    this.setState(prevState => ({
      search: search,
      arrayImg: result,
      page: prevState.page + 1,
      status: false,
    }));
  };

  onLoadMore = async () => {
    this.setState({ status: true });
    setTimeout(async () => {
      const result = await fetchImg(this.state.search, this.state.page);
      this.setState(prevState => ({
        arrayImg: [...prevState.arrayImg, ...result],
      }));
      this.setState({ status: false });
    }, 5000);
  };

  render() {
    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.onSubmit} />;
        {this.state.arrayImg && <ImageGallery arrayImg={this.state.arrayImg} />}
        {this.state.status && <Loader />}
        {this.state.arrayImg && <Button onButton={this.onLoadMore} />}
      </div>
    );
  }
}

export default App;
