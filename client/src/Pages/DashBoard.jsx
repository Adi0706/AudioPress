import React, { useEffect, useState, useCallback } from 'react';
import Logo from '../Media/LandingPage/Logo.png';
import { VscAccount } from 'react-icons/vsc';
import { FaSearch } from 'react-icons/fa';
import { MdKeyboardVoice } from "react-icons/md";
import NewsImage from '../Media/dashboard-img.png';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CountryData } from '../filterData';
import { CategoryData } from '../filterData';

function DashBoard() {
  const [showSidebar, setShowSideBar] = useState(false);
  const [showExplore, setShowExplore] = useState(true); // Show explore by default
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [filterCountry, setFilterCountry] = useState('in'); // Default country
  const [filterCategory, setFilterCategory] = useState('general'); // Default category
  const [newsData, setNewsData] = useState([]);
  const [page, setPage] = useState(1); // Add state for pagination
  const [loading, setLoading] = useState(false); // Add state for loading
  const navigate = useNavigate();

  const handleShowSideBar = () => {
    setShowSideBar(true);
  };

  const handleCloseSideBar = () => {
    setShowSideBar(false);
  };

  const handleShowExplore = () => {
    setShowExplore(true);
  };

  const handleFeed = () => {
    setShowExplore(false);
  };

  const handleAccountModal = () => {
    setShowAccountModal(true);
  };

  const handleNavigateLogin = () => {
    navigate("/Login");
  };

  const RenderAccountShowModal = () => {
    if (showAccountModal) {
      return (
        <div className='absolute bottom-12 left-4 w-80 p-5 h-36 bg-white border rounded-xl shadow-lg'>
          <p><b>Login to access the voice assistant</b></p>
          <button className='border px-12 p-2 font-bold rounded-full my-12 text-white bg-red-600 hover:bg-red-300' onClick={handleNavigateLogin}>Log In</button>
        </div>
      );
    }
    return null;
  };

  useEffect(() => {
    const showModalTimeout = setTimeout(() => {
      setShowAccountModal(true);
    }, 2000);

    const hideModalTimeout = setTimeout(() => {
      setShowAccountModal(false);
    }, 6000);

    return () => {
      clearTimeout(showModalTimeout);
      clearTimeout(hideModalTimeout);
    };
  }, []);

  const fetchNews = useCallback(async () => {
    if (filterCountry && filterCategory) {
      setLoading(true);
      try {
        const response = await axios.get(`https://newsapi.org/v2/top-headlines`, {
          params: {
            country: filterCountry,
            category: filterCategory,
            apiKey: '790cccf9efb645739bd5114226e62acc',
            page: page,
            pageSize: 10,
          }
        });
        setNewsData(prevNewsData => [...prevNewsData, ...response.data.articles]);
      } catch (error) {
        console.error("Error fetching the news data:", error);
      }
      setLoading(false);
    }
  }, [filterCountry, filterCategory, page]);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  useEffect(() => {
    setPage(1); // Reset page when filters change
    setNewsData([]);
  }, [filterCountry, filterCategory]);

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const RenderSideBar = () => {
    return (
      <div
        className='w-56 h-screen border-r flex flex-col items-center p-5 justify-between bg-white animate-slideIn'
        onMouseEnter={handleShowSideBar}
        onMouseLeave={handleCloseSideBar}
      >
        <ul>
          <li className='font-bold flex items-center mb-5'>
            <img src={Logo} alt="logo" className='w-5 h-5 mx-2 cursor-pointer' />Explore News
          </li>
          <li className='flex items-center mb-5'><MdKeyboardVoice className='mr-2 w-7 h-7 hover:text-blue-300 cursor-pointer' />AudioPress AI</li>
          <li>
            <div className='space-y-2 '>
              <strong>CATEGORIES</strong>
              {CategoryData.map((item, index) => (
                <p key={index} className='cursor-pointer hover:text-blue-300' onClick={() => setFilterCategory(item.name)}>
                  {item.name}
                </p>
              ))}
            </div>
            <div className='space-y-2 my-12'>
              <strong>COUNTRY</strong>
              {CountryData.map((item, index) => (
                <p key={index} className='cursor-pointer hover:text-blue-300' onClick={() => setFilterCountry(item.code)}>
                  {item.name} <strong>({item.code})</strong>
                </p>
              ))}
            </div>
          </li>
        </ul>
      </div>
    );
  };

  const RenderExplore = () => {
    return (
      <div className='news-container explore-scroll-container h-full overflow-y-auto'>
        {newsData.length ? (
          newsData.map((news, index) => (
            <div key={index} className='news-item p-4 border rounded-lg shadow-lg flex flex-col'>
              {news.urlToImage && (
                <img src={news.urlToImage} alt={news.title} className='w-full h-48 object-cover mb-4' />
              )}
              <h2 className='text-xl font-bold mb-2'>{news.title}</h2>
              <p className='text-sm mb-2'>{news.description}</p>
              <a href={news.url} target="_blank" rel="noopener noreferrer" className='text-blue-500 hover:underline'>Read more</a>
            </div>
          ))
        ) : (
          <p>No news available. Please select a category and country.</p>
        )}
        {loading && <p>Loading more news...</p>}
        {!loading && newsData.length > 0 && (
          <button 
            className='border px-12 p-2 font-bold rounded-full my-12 text-white bg-red-400 hover:bg-blue-300'
            onClick={handleLoadMore}
          >
            Load More
          </button>
        )}
      </div>
    );
  };

  return (
    <>
      <div className='Dashboard w-screen h-screen flex'>
        <div
          className='w-12 h-screen border-r flex flex-col items-start p-2 justify-between'
          onMouseLeave={handleCloseSideBar}
        >
          <div>
            <Link to='/'>
              <img src={Logo} alt="logo" className='w-7 cursor-pointer' />
            </Link>
            <FaSearch className='w-5 h-5 mx-2 my-5 cursor-pointer' onMouseEnter={handleShowSideBar} />
          </div>
          <VscAccount className='w-7 h-7 cursor-pointer account-icon' onClick={handleAccountModal} />
          {RenderAccountShowModal()}
        </div>
        {showSidebar && <RenderSideBar />}
        <div className='Dashboard-main p-5 w-full flex flex-col items-center'>
          <h1 className='text-5xl font-bold'>Your News Feed</h1>
          <p className='my-5 text-lg'>Stay Ahead with Cutting-Edge Insights from Your AI Voice Assistant</p>
          <span className='flex items-center justify-center'>
            <p className='font-semibold text-black hover:text-gray-500 cursor-pointer mx-12' onClick={handleFeed}>Feed</p>
            <p className='font-semibold text-black hover:text-gray-500 cursor-pointer mx-2' onClick={handleShowExplore}>Explore</p>
          </span>
          <div className='w-2/4 border-b border-gray-300 my-5'></div>
          {showExplore ? <RenderExplore /> : <img src={NewsImage} alt="dashboard image" className='w-2/4 h-4/5 ' />}
        </div>
      </div>
    </>
  );
}

export default DashBoard;
