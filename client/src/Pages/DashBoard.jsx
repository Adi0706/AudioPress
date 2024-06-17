import React, { useEffect, useState } from 'react';
import Logo from '../Media/LandingPage/Logo.png';
import { VscAccount } from 'react-icons/vsc';
import { FaSearch } from 'react-icons/fa';
import { MdKeyboardVoice } from "react-icons/md";
import NewsImage from '../Media/dashboard-img.png';
import { Link, useNavigate } from 'react-router-dom';

function DashBoard() {
  const [showSidebar, setShowSideBar] = useState(false);
  const [showExplore, setShowExplore] = useState(false);
  const [showAccountModal, setShowAccountModal] = useState(false);
  const navigate = useNavigate();

  // Show on hovering
  const handleShowSideBar = () => {
    setShowSideBar(true);
  };

  // Hide on mouse leave
  const handleCloseSideBar = () => {
    setShowSideBar(false);
  };

  // Showing explore page
  const handleShowExplore = () => {
    setShowExplore(true);
  };

  const handleFeed = () => {
    setShowExplore(false);
  };

  const handleAccountModal=()=>{
    setShowAccountModal(true)
  }
  const handleNavigateLogin=()=>{
    navigate("/Login")
  }

  const RenderAccountShowModal = () => {
    if (showAccountModal) {
      return (
        <div className='absolute bottom-12 left-4 w-80 p-5 h-36 bg-white border rounded-xl shadow-lg'>
          <p><b>Login to access the voice assistant</b></p>
          <button className=' border  px-12 p-2 font-bold : rounded-full my-12 text-white bg-red-600 hover:bg-red-300' onClick={handleNavigateLogin}>Log In</button>
        </div>
      );
    }
    return null;
  };

  useEffect(() => {
    
    setTimeout(()=>{
setShowAccountModal(true)
    },2000)


    const timer = setTimeout(() => {
      setShowAccountModal(false);
    }, 6000);

    return () => clearTimeout(timer); // Clean up the timer
  }, []);

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
          <li className='flex items-center mb-5'><MdKeyboardVoice className='mr-2' />VoicePress AI</li>
          <li>
            <div className='space-y-2 '>
              <p className='cursor-pointer hover:text-blue-300 '>Politics</p>
              <p className='cursor-pointer hover:text-blue-300'>Business</p>
              <p className='cursor-pointer hover:text-blue-300'>Technology</p>
              <p className='cursor-pointer hover:text-blue-300'>Entertainment</p>
              <p className='cursor-pointer hover:text-blue-300'>Sports</p>
              <p className='cursor-pointer hover:text-blue-300'>Health</p>
              <p className='cursor-pointer hover:text-blue-300'>Science</p>
              <p className='cursor-pointer hover:text-blue-300'>Education</p>
              <p className='cursor-pointer hover:text-blue-300'>Environment</p>
            </div>
          </li>
        </ul>
      </div>
    );
  };

  const RenderExplore = () => {
    return (
      <div className="w-full text-center">
        Explore News API Integration...
      </div>
    );
  };

  return (
    <>
      <div className='Dashboard w-screen h-screen flex relative'>
        <div
          className='w-12 h-screen border-r flex flex-col items-start p-2 justify-between'
          onMouseLeave={handleCloseSideBar}
        >
          <div>
            <Link  to='/'> <img src={Logo} alt="logo" className='w-7 cursor-pointer' /></Link>   
            <FaSearch className='w-5 h-5 mx-2 my-5 cursor-pointer'
              onMouseEnter={handleShowSideBar}
            />
          </div>
          <VscAccount className='w-7 h-7 cursor-pointer account-icon' onClick={handleAccountModal}/>
          {RenderAccountShowModal()}
        </div>
        {showSidebar && <RenderSideBar />}
        <div className='Dashboard-main w-full flex flex-col items-center justify-center'>
          <h1 className='text-5xl font-bold'>Your News Feed</h1>
          <p className='my-5 text-lg'>Stay Ahead with Cutting-Edge Insights from Your AI Voice Assistant</p>
          <span className='flex gap-8'>
            <p className='font-semibold text-black hover:text-gray-500 cursor-pointer' onClick={handleFeed}>Feed</p>
            <p className='font-semibold text-black hover:text-gray-500 cursor-pointer' onClick={handleShowExplore}>Explore</p>
          </span>
          <div className='w-2/4 border-b border-gray-300 my-5'></div>
          {showExplore ? <RenderExplore /> : <img src={NewsImage} alt="dashboard image" className='w-2/4 h-3/5 rounded-full mt-12 shadow-xl' />}
        </div>
      </div>
    </>
  );
}

export default DashBoard;
