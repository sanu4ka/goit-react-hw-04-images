import { useState } from 'react';
import { useEffect } from 'react';
import css from './App.module.css';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Api from 'services/Api/Api';

const PER_PAGE = 12;

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [largeImageURL, setLargeImageURL] = useState(null);
  const [id, setId] = useState(null);
  const [loadStatus, setLoadStatus] = useState('idle');

  useEffect(() => {
    if (searchQuery === '') {
      return;
    }
    setLoadStatus('searching');
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

        setSearchResult(searchResult => [...searchResult, ...results]);
        setTotalPages(totalPages);
      })
      .catch(error => alert(error))
      .finally(() => {
        setLoadStatus('idle');
      });
  }, [searchQuery, page]);

  const onSearchbarSubmit = query => {
    if (query === searchQuery) {
      alert('You are currently viewing this request');
      return;
    }
    setSearchQuery(query);
    setSearchResult([]);
    setPage(1);
    setTotalPages(null);
  };

  const onImageClick = (getedLargeImageURL, imageId) => {
    setId(imageId);
    setLargeImageURL(getedLargeImageURL);
  };

  const onModalClose = () => {
    setId(null);
    setLargeImageURL(null);
  };

  const onLoadMore = () => {
    setPage(prevpage => prevpage + 1);
  };

  const isButtonShow = searchResult.length > 0 && page !== totalPages;
  return (
    <div className={css.App}>
      <Searchbar onSubmit={onSearchbarSubmit} />
      {searchResult.length > 0 && (
        <ImageGallery imageList={searchResult} onImageClick={onImageClick} />
      )}
      {isButtonShow && <Button onClick={onLoadMore} />}

      {largeImageURL && (
        <Modal
          largeImageURL={largeImageURL}
          id={id}
          onModalClose={onModalClose}
        />
      )}
      {loadStatus === 'searching' && <Loader />}
    </div>
  );
}
