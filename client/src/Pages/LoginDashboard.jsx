import React, { useEffect, useRef, useState } from 'react';
import Logo from '../Media/LandingPage/Logo.png'; // Assuming this is your project's logo
import { VscAccount } from 'react-icons/vsc';
import { FaSearch } from 'react-icons/fa';
import { MdKeyboardVoice } from "react-icons/md";
import NewsImage from '../Media/dashboard-img.png'; // Assuming this is an image for the dashboard
import { Link, useNavigate } from 'react-router-dom';
import { LuXCircle, LuPencil } from "react-icons/lu";
import { MdDeleteOutline } from "react-icons/md";
import axios from 'axios';
import { gapi } from 'gapi-script'; // Assuming you're using Google API for authentication

function LoginDashBoard() {
  const [showSidebar, setShowSideBar] = useState(false);
  const [showExplore, setShowExplore] = useState(false);
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [settingsModal, setSettingsModal] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [googleUser, setGoogleUser] = useState(null);
  const [profilePicture, setProfilePicture] = useState('');

  const clickOutsideRef = useRef(null);
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

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
  };

  const handleNavigateLogout = () => {
    axios.get('http://localhost:5000/api/user/Logout')
      .then(res => {
        navigate('/');
        localStorage.removeItem('profilePicture');
        window.location.reload(true); // Force reload to clear session
        console.log(res.data);
      })
      .catch(err => console.log(err));
  };

  const handleSettingsModal = () => {
    setSettingsModal(true);
  };

  const handleCloseSettingModal = () => {
    setSettingsModal(false);
  };

  const handleRefFunction = (event) => {
    if (clickOutsideRef.current && !clickOutsideRef.current.contains(event.target)) {
      setShowAccountModal(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleRefFunction);

    return () => {
      document.removeEventListener('mousedown', handleRefFunction);
    };
  }, []);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/user/UserDetails", { withCredentials: true });

        // Assuming response.data structure matches { fullname, email, img_url }
        const { fullname, email, img_url } = response.data;

        setFullName(fullname);
        setEmail(email);
        setProfilePicture(img_url);
      } catch (err) {
        console.error("Error fetching user details:", err);
        // Handle error state or logging as needed
      }
    };

    fetchUserDetails();
  }, []);

  useEffect(() => {
    const start = () => {
      gapi.client.init({
        clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        scope: ''
      }).then(() => {
        const auth2 = gapi.auth2.getAuthInstance();
        if (auth2.isSignedIn.get()) {
          const profile = auth2.currentUser.get().getBasicProfile();
          setGoogleUser({
            fullName: profile.getName(),
            email: profile.getEmail(),
            imageUrl: profile.getImageUrl()
          });
        }
      }).catch(error => {
        console.error('Google API Initialization Error:', error);
      });
    };

    gapi.load('client:auth2', start);
  }, []);

  const handleUpdateUser = async () => {
    try {
      if (!fullName || !email) {
        alert("Please provide both Full Name and Email");
        return;
      }

      const res = await axios.put("http://localhost:5000/api/user/Update", {
        fullname: fullName,
        email: email
      });

      if (res.status === 200) {
        alert("User Details Updated Successfully");
      } else {
        alert("Failed to update user details");
      }
    } catch (err) {
      console.error("Error updating user details:", err);
      alert("Error updating user details. Please try again.");
    }
  };

  const handleGoogleLogout = () => {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(() => {
      setGoogleUser(null); // Clear Google user state
      // Perform any additional logout actions here
      navigate('/'); // Navigate to the home page or login page after logout
    }).catch((error) => {
      console.error('Error signing out:', error);
      // Handle sign-out errors if necessary
    });
  };

  // Function to handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      axios.post("http://localhost:5000/api/user/ProfilePictureUpdate", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then((res) => {
          if (res.status === 201) {
            alert("Profile Picture Updated Successfully");
            // Optionally update profile picture in UI
            setProfilePicture(res.data.imgUrl);
          }
        })
        .catch((err) => {
          console.error("Error uploading profile picture:", err); // Log any errors for debugging
          // Handle error state or alert user about the error
        });
    }
  };
  const handleRemoveImage = async () => {
    try {
      const res = await axios.delete('http://localhost:5000/api/user/DelProfilePic', { withCredentials: true });
      if (res.status === 200) {
        alert("Profile Picture Removed Successfully");
        setProfilePicture('');
      } else {
        alert("Failed to remove profile picture. Please try again.");
      }
    } catch (err) {
      console.error("Error removing profile picture:", err);
      alert("An error occurred while removing the profile picture. Please try again.");
    }
  };
  
  

  // Render account modal
  const RenderAccountShowModal = () => {
    if (showAccountModal) {
      const displayFullName = googleUser ? googleUser.fullName : fullName;
      const displayEmail = googleUser ? googleUser.email : email;

      return (
        <div ref={clickOutsideRef} className='absolute bottom-12 left-4 w-80 p-7 h-auto flex flex-col items-start justify-between bg-white border rounded-xl shadow-lg'>
          <div className='my-5'>
            {googleUser && <img src={googleUser.imageUrl} alt="Google User" className='w-12 h-12 rounded-full' />}
            {profilePicture && <img src={profilePicture} alt='profile-picture' className='w-12 h-12 rounded-full' />}
            {!googleUser && !profilePicture && <VscAccount className='w-12 h-12' />}
            <p className='text-3xl'><strong>{displayFullName}</strong></p>
            <p>{displayEmail}</p>
          </div>
          <div>
            <p className='text-black hover:text-blue-300 cursor-pointer' onClick={handleSettingsModal}>Settings</p>
            {googleUser ? (
              <p className='text-black hover:text-blue-300 cursor-pointer' onClick={handleGoogleLogout}>Log out</p>
            ) : (
              <p className='text-black hover:text-blue-300 cursor-pointer' onClick={handleNavigateLogout}>Log out</p>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  // Render settings modal
  const RenderSettingsModal = () => {
    if (settingsModal) {
      const displayFullName = googleUser ? googleUser.fullName : fullName;
      const displayEmail = googleUser ? googleUser.email : email;

      return (
        <div className='absolute h-screen w-screen shadow-xl bg-white'>
          <div className='flex items-center justify-between p-5'>
            <p className='text-5xl font-bold'>Your Profile<br />
              <span className='text-lg font-semibold text-gray-500 ml-2'>MANAGE YOUR PROFILE</span>
            </p>
            <LuXCircle className='w-7 h-7 cursor-pointer' onClick={handleCloseSettingModal} />
          </div>
          <div className='w-screen h-auto flex items-center justify-around mt-24'>
            <div className='shadow-xl flex flex-col items-center rounded-3xl p-12'>
              <div className='p-12 flex flex-col items-center text-3xl'>
                <label htmlFor='fullName' className='font-bold'>Your Full Name</label>
                <input
                  type='text'
                  id='fullName'
                  name='fullName'
                  value={displayFullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className='border p-2 rounded cursor-not-allowed'
                  disabled={!!googleUser}
                />
              </div>
              <div className='p-12 flex flex-col items-center text-3xl'>
                <label htmlFor='email' className='font-bold'>Your Email</label>
                <input
                  type='email'
                  id='email'
                  name='email'
                  value={displayEmail}
                  onChange={(e) => setEmail(e.target.value)}
                  className='border p-2 rounded cursor-not-allowed'
                  disabled={!!googleUser}
                />
              </div>
              <button
                type='submit'
                onClick={handleUpdateUser}
                className={`bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 ${googleUser ? 'cursor-not-allowed opacity-50' : ''}`}
                disabled={!!googleUser}
              >
                Update
              </button>
            </div>
            <div className='shadow-xl p-12 rounded-3xl'>
              <div className='flex flex-col items-center justify-between'>
                <p className='text-3xl font-bold'>Your Profile Picture</p>
                {profilePicture ? (
                  <img src={profilePicture} alt='Profile' className='w-36 h-36 rounded-full' />
                ) : (<VscAccount className='w-36 h-36' />)}
                <label htmlFor='fileInput' className='mt-5 p-2 rounded-lg flex flex-col items-center justify-center bg-blue-400'>
                  <LuPencil className='w-7 h-7' />
                  <p>Choose a file</p>
                </label>
                <input
                  type='file'
                  id='fileInput'
                  className='hidden'
                  onChange={handleImageChange}
                />
                {profilePicture && (
                  <button
                    onClick={handleRemoveImage}
                    className='bg-red-500 text-white mt-5 px-4 py-2 rounded-lg hover:bg-red-600'
                  >
                    Remove Image
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  const RenderExplore = () => {
    return (
      <div className="w-full text-center">
        Explore News API Integration...
      </div>
    );
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
          <li className='flex items-center mb-5'><MdKeyboardVoice className='mr-2' />AudioPress AI</li>
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

  return (
    <div className='Dashboard w-screen h-screen flex relative'>
      {RenderSettingsModal()} {/* Render settings modal */}
      <div
        className='w-12 h-screen border-r flex flex-col items-start p-2 justify-between'
        onMouseLeave={handleCloseSideBar}
      >
        <div>
          <Link to='/LoginDashboard'> <img src={Logo} alt="logo" className='w-7 cursor-pointer' /></Link>
          <FaSearch className='w-5 h-5 mx-2 my-5 cursor-pointer' onMouseEnter={handleShowSideBar} />
        </div>
        {googleUser ? (
          <img
            src={googleUser.imageUrl}
            alt="Google User"
            className='w-7 h-7 rounded-full cursor-pointer account-icon'
            onClick={handleAccountModal}
          />
        ) : profilePicture ? (<img
          src={profilePicture}
          alt="Google User"
          className='w-7 h-7 rounded-full cursor-pointer account-icon'
          onClick={handleAccountModal}
        />) : (
          <VscAccount className='w-7 h-7 cursor-pointer account-icon' onClick={handleAccountModal} />
        )}
        {RenderAccountShowModal()} {/* Render account modal */}
      </div>
      {showSidebar && <RenderSideBar />} {/* Render sidebar if showSidebar is true */}
      <div className='Dashboard-main p-5 w-full flex flex-col items-center justify-center'>
        <h1 className='text-5xl font-bold'>Your News Feed</h1>
        <p className='my-5 text-lg'>Stay Ahead with Cutting-Edge Insights from Your AI Voice Assistant</p>
        <div className='flex gap-8'>
          <p className='font-semibold text-black hover:text-gray-500 cursor-pointer' onClick={handleFeed}>Feed</p>
          <p className='font-semibold text-black hover:text-gray-500 cursor-pointer' onClick={handleShowExplore}>Explore</p>
        </div>
        <div className='w-2/4 border-b border-gray-300 my-5'></div>
        {showExplore ? <RenderExplore /> : <img src={NewsImage} alt="dashboard image" className='w-2/4 h-4/5' />}
      </div>
    </div>
  );
}

export default LoginDashBoard;
