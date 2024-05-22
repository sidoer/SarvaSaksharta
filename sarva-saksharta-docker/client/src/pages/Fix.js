import React, { useState ,useEffect} from 'react';
import {Link,useNavigate } from 'react-router-dom';
import Blobs from './blobs.jpg'

const Fix = () => {
const navigate=useNavigate();
const [loading, setLoading] = useState(true);
useEffect(() => {
  const validateToken = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/');
        return;
      }
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      //console.log('Decoded Token:', decodedToken);
      console.log(decodedToken.user);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  validateToken();
}, [navigate]);

const handleLogout = () => {
  localStorage.removeItem('token');
  navigate('/');
};
  return (
    <div className="bg-black h-screen">
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden m-0">
      <img className="w-full h-full object-cover filter blur-[10px] m-0 pointer-events-none border-none outline-none"  src={Blobs} alt="blob" />
      </div>

    <div className="fixed bg-black bg-opacity-70 border-2 rounded-br-3xl rounded-tr-3xl border-black text-white w-[5vw] h-full">
      {!loading && (<>
      
      <nav>
      <Link className="fixed top-1/4 -mt-16 w-12 z-10 ml-4 hover:drop-shadow-[0_0px_15px_rgba(255,255,255,1)] transition-all duration-300 ease-in-out" to="/dashboard"><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#ffffff" transform="rotate(0)"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path fill="none" d="M0 0h24v24H0z"></path> <path d="M6.75 2.5A4.25 4.25 0 0 1 11 6.75V11H6.75a4.25 4.25 0 1 1 0-8.5zM9 9V6.75A2.25 2.25 0 1 0 6.75 9H9zm-2.25 4H11v4.25A4.25 4.25 0 1 1 6.75 13zm0 2A2.25 2.25 0 1 0 9 17.25V15H6.75zm10.5-12.5a4.25 4.25 0 1 1 0 8.5H13V6.75a4.25 4.25 0 0 1 4.25-4.25zm0 6.5A2.25 2.25 0 1 0 15 6.75V9h2.25zM13 13h4.25A4.25 4.25 0 1 1 13 17.25V13zm2 2v2.25A2.25 2.25 0 1 0 17.25 15H15z"></path> </g> </g></svg></Link>
      <Link className="fixed top-1/4 mt-8 w-12 z-10 ml-4 hover:drop-shadow-[0_0px_15px_rgba(255,255,255,1)] transition-all duration-300 ease-in-out" to="/study"><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M20 12V17C20 18.8856 20 19.8284 19.4142 20.4142C18.8284 21 17.8856 21 16 21H6.5C5.11929 21 4 19.8807 4 18.5V18.5C4 17.1193 5.11929 16 6.5 16H16C17.8856 16 18.8284 16 19.4142 15.4142C20 14.8284 20 13.8856 20 12V7C20 5.11438 20 4.17157 19.4142 3.58579C18.8284 3 17.8856 3 16 3H8C6.11438 3 5.17157 3 4.58579 3.58579C4 4.17157 4 5.11438 4 7V18.5" stroke="#ffffff" strokeWidth="2"></path> <path d="M9 8L15 8" stroke="#ffffff" strokeWidth="2" strokeLinecap="round"></path> </g></svg></Link>
      <Link className="fixed top-1/4 mt-32 w-12 z-10 ml-4 hover:drop-shadow-[0_0px_15px_rgba(255,255,255,1)] transition-all duration-300 ease-in-out" to="/profile"><svg fill="#ffffff" viewBox="0 0 24.00 24.00" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff" strokeWidth="0.00024000000000000003" transform="matrix(-1, 0, 0, 1, 0, 0)rotate(0)"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M12,11A5,5,0,1,0,7,6,5.006,5.006,0,0,0,12,11Zm0-8A3,3,0,1,1,9,6,3,3,0,0,1,12,3ZM3,22V18a5.006,5.006,0,0,1,5-5h8a5.006,5.006,0,0,1,5,5v4a1,1,0,0,1-2,0V18a3,3,0,0,0-3-3H8a3,3,0,0,0-3,3v4a1,1,0,0,1-2,0Z"></path></g></svg></Link>
      <Link to="/askai" className="fixed top-1/4 mt-56 w-12 z-10 ml-4 hover:drop-shadow-[0_0px_15px_rgba(255,255,255,1)] transition-all duration-300 ease-in-out"><svg viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12.5 15.5V17.5M12.5 8.5V6.5M12.5 6.5C13.3284 6.5 14 5.82843 14 5C14 4.17157 13.3284 3.5 12.5 3.5C11.6716 3.5 11 4.17157 11 5C11 5.82843 11.6716 6.5 12.5 6.5ZM20.5 20.5V19.5C20.5 18.3954 19.6046 17.5 18.5 17.5H6.5C5.39543 17.5 4.5 18.3954 4.5 19.5V20.5H20.5ZM11.5 12C11.5 12.5523 11.0523 13 10.5 13C9.94772 13 9.5 12.5523 9.5 12C9.5 11.4477 9.94772 11 10.5 11C11.0523 11 11.5 11.4477 11.5 12ZM15.5 12C15.5 12.5523 15.0523 13 14.5 13C13.9477 13 13.5 12.5523 13.5 12C13.5 11.4477 13.9477 11 14.5 11C15.0523 11 15.5 11.4477 15.5 12ZM8.5 15.5H16.5C17.6046 15.5 18.5 14.6046 18.5 13.5V10.5C18.5 9.39543 17.6046 8.5 16.5 8.5H8.5C7.39543 8.5 6.5 9.39543 6.5 10.5V13.5C6.5 14.6046 7.39543 15.5 8.5 15.5Z" stroke="#ffffff" stroke-width="1.2"></path> </g></svg></Link>
      <button className="fixed top-2/3 mt-48 w-12 z-10 ml-4 hover:drop-shadow-[0_0px_15px_rgba(255,255,255,1)] transition-all duration-300 ease-in-out" onClick={handleLogout}><svg viewBox="0 0 24.00 24.00" fill="none" xmlns="http://www.w3.org/2000/svg" transform="matrix(-1, 0, 0, 1, 0, 0)" stroke="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#CCCCCC" strokeWidth="0.144"></g><g id="SVGRepo_iconCarrier"><path d="M14 20H6C4.89543 20 4 19.1046 4 18L4 6C4 4.89543 4.89543 4 6 4H14M10 12H21M21 12L18 15M21 12L18 9" stroke="#ffffff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"></path></g></svg></button>
      </nav>

      </>)}
    </div>
    </div>
  );
};

export default Fix;
