import { Component } from 'react';
import css from './App.module.css';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Api from 'services/Api/Api';

const PER_PAGE = 12;

export class App extends Component {
  state = {
    searchQuery: '',
    searchResult: [],
    totalHits: null,
    page: 1,
    totalPages: null,
    largeImageURL: null,
    id: null,
    status: 'idle',
  };

  componentDidUpdate(prevProps, prevState) {
    const { searchQuery, page, searchResult } = this.state;

    if (prevState.page !== page || prevState.searchQuery !== searchQuery) {
      this.setState({ status: 'searching' });

      Api(searchQuery, page, PER_PAGE)
        .then(res => {
          if (res.total === 0) {
            return alert(`No such pictures`);
          }
          const { hits, totalHits } = res;
          const totalPages = Math.ceil(totalHits / PER_PAGE);
          const results = hits.map(({ id, largeImageURL, webformatURL }) => {
            return { id, largeImageURL, webformatURL };
          });

          this.setState({
            searchResult: [...searchResult, ...results],
            totalHits,
            totalPages,
          });
        })
        .catch(error => alert(error))
        .finally(() => {
          this.setState({
            status: 'idle',
          });
        });
    }
  }

  onSearchbarSubmit = searchQuery => {
    this.setState({
      searchQuery,
      searchResult: [],
      totalHits: null,
      page: 1,
      totalPage: null,
    });
  };

  onImageClick = (largeImageURL, id) => {
    this.setState({ largeImageURL, id });
  };

  onModalClose = () => {
    this.setState({ largeImageURL: null, id: null });
  };

  onLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { searchResult, page, totalPage, largeImageURL, id, status } =
      this.state;
    const isButtonShow = searchResult.length > 0 && page !== totalPage;

    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.onSearchbarSubmit} />
        {searchResult.length > 0 && (
          <ImageGallery
            imageList={searchResult}
            onImageClick={this.onImageClick}
          />
        )}
        {isButtonShow && <Button onClick={this.onLoadMore} />}

        {largeImageURL && (
          <Modal
            largeImageURL={largeImageURL}
            id={id}
            onModalClose={this.onModalClose}
          />
        )}
        {status === 'searching' && <Loader />}
      </div>
    );
  }
}
