import React, { useEffect, useRef, useState } from 'react';
import Logo from '../Media/LandingPage/Logo.png';
import { VscAccount } from 'react-icons/vsc';
import { FaSearch } from 'react-icons/fa';
import { MdKeyboardVoice } from "react-icons/md";
import NewsImage from '../Media/dashboard-img.png';
import { Link, useNavigate } from 'react-router-dom';
import { LuXCircle } from "react-icons/lu";
import { LuPencil } from "react-icons/lu";
import { MdDeleteOutline } from "react-icons/md";

function LoginDashBoard() {
  const [showSidebar, setShowSideBar] = useState(false);
  const [showExplore, setShowExplore] = useState(false);
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [settingsModal, setSettingsModal] = useState(false);
  const [fullName, setFullName] = useState('Aditya Bhattacharjee');
  const [email, setEmail] = useState('adityab76@gmail.com');
  const navigate = useNavigate();
  const clickOutsideRef = useRef(null);

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
    setShowAccountModal(!showAccountModal);
  }

  const handleNavigateLogout = () => {
    navigate("/");
  }

  const handleSettingsModal = () => {
    setSettingsModal(true);
  }

  const handleCloseSettingModal = () => {
    setSettingsModal(false);
  }

  const handleRefFunction = (event) => {
    if (clickOutsideRef.current && !clickOutsideRef.current.contains(event.target)) {
      setShowAccountModal(false);
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleRefFunction);

    return () => {
      document.removeEventListener('mousedown', handleRefFunction);
    }
  }, []);

  const RenderAccountShowModal = () => {
    if (showAccountModal) {
      return (
        <div ref={clickOutsideRef} className='absolute bottom-12 left-4 w-80 p-7 h-auto flex flex-col items-start justify-between bg-white border rounded-xl shadow-lg'>
          <div className='my-5'>
            <VscAccount className='w-12 h-12' />
            <p className='text-3xl'><strong>{fullName}</strong></p>
            <p className=''>{email}</p>
          </div>
          
          <div>
            <p className='text-black hover:text-blue-300 cursor-pointer' onClick={handleSettingsModal}>Settings</p>
            <p className='text-black hover:text-blue-300 cursor-pointer' onClick={handleNavigateLogout}>Log out</p>
          </div>
        </div>
      );
    }
    return null;
  };

  const RenderSettingsModal = () => {
    if (settingsModal) {
      return (
        <div className='absolute h-screen w-screen shadow-xl bg-white'>
          <div className='flex items-center justify-between p-5'>
            <p className='text-5xl font-bold'>Your Profile
              <p className='text-lg font-semibold text-gray-500 ml-2'>MANAGE YOUR PROFILE</p>
            </p>
            <p><LuXCircle className='w-7 h-7 cursor-pointer' onClick={handleCloseSettingModal} /></p>
          </div>
          <div className='w-screen h-auto flex items-center justify-around mt-24'>
            <div className=' shadow-xl flex flex-col items-center rounded-3xl p-12'>
             <div className='p-12 flex flex-col items-center text-3xl'>
                <label htmlFor='fullName' className='font-bold'>Your Full Name</label>
                <input
                  type='text'
                  id='fullName'
                  name='fullName'
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className='border p-2 rounded'
                />
             </div>
              <div className="mt-4 flex flex-col items-center p-4 text-3xl">
                <label htmlFor='email' className='font-bold'>Your Email</label>
                <input
                  type='email'
                  id='email'
                  name='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className='border p-2 rounded'
                />
              </div>
              <button className='mt-12 border px-7 py-2 rounded-full bg-red-500 font-semibold text-white hover:bg-red-200'>SAVE CHANGES</button>
            </div>
            <div className=''>
              <VscAccount className='w-56 h-56 account-icon' />
              <div className='flex items-center justify-between mt-7'>
                <button className='border border-2 px-2 py-2 font-semibold rounded-md bg-white text-black flex items-center hover:bg-slate-200'>
                  REPLACE<LuPencil className='mx-2' />
                </button>
                <button className='border border-2 px-2 py-2 font-semibold rounded-md bg-white text-black flex items-center hover:bg-slate-200'>
                  REMOVE<MdDeleteOutline className='mx-2' />
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return null;
  }

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
        {RenderSettingsModal()}
        <div
          className='w-12 h-screen border-r flex flex-col items-start p-2 justify-between'
          onMouseLeave={handleCloseSideBar}
        >
          <div>
            <Link to='/LoginDashboard'> <img src={Logo} alt="logo" className='w-7 cursor-pointer' /></Link>
            <FaSearch className='w-5 h-5 mx-2 my-5 cursor-pointer'
              onMouseEnter={handleShowSideBar}
            />
          </div>
          <VscAccount className='w-7 h-7 cursor-pointer account-icon' onClick={handleAccountModal} />
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

export default LoginDashBoard;
