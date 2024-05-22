import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Blobs from './blobs.jpg';
import Logo from './app-name.png';

const Home = () => {
  // back end


  const navigate = useNavigate();
  const [captchaImage, setCaptchaImage] = useState('');
  const [captcha,set_captcha]=useState('')
  const [username, set_username] = useState('');
  const [password, set_password] = useState('');
  const [password3, set_password3] = useState('');
  const [signupbox,set_signupbox]=useState(true)
  const [signinbox,set_signinbox]=useState(false)
  useEffect(() => {
    const fetchCaptcha = async () => {
      try {
        const response = await axios.get('https://sasa-back-vercel.vercel.app/api/captcha', {
          responseType: 'arraybuffer',
        });

        const decoder = new TextDecoder('utf-8');
        const captchaText = decoder.decode(response.data);

        //console.log(captchaText);
        setCaptchaImage(captchaText);
      } catch (error) {
        console.error('Error fetching captcha:', error);
      }
    };

    fetchCaptcha();
  }, []);

  const notifysuccess = () => toast("Sign Up Successful !");
  const notifysuccess2 = () => {
    toast("Sign In Successful !", {
      autoClose: 3000, // Set the autoClose option to 3000 milliseconds (3 seconds)
    });
  };
  const notifyfail = () => toast("Username already exists !");
  const notifyfail2 = () => toast("Passwords do not match !");
  const notifyfail3 = () => toast("Incorrect captcha !");
  const notifyfail4 = () => toast("Incorrect Password !");
  function sleep(ms, callback) {
    setTimeout(callback, ms);
  }

  const signup_data = async (e) => {
    e.preventDefault();
    const signup_retrieve = {
      user: username,
      pass: password,
      confirm_pass:password3,
      role:"student",
      captcha:captcha
    };

    try {
      const response = await axios.post('https://sasa-back-vercel.vercel.app/api/signup', signup_retrieve);
      if (response.status === 200) {
        notifysuccess();
        //console.log('Sign Up Successful');
      } else if (response.status === 201) {
        notifyfail()
        //console.log('Sign Up Unsuccessful');
      }
      else if (response.status === 202) {
        notifyfail2()
        //console.log('Sign Up Unsuccessful');
      }
      else if (response.status === 203) {
        notifyfail3()
        //console.log('Sign Up Unsuccessful');
      }
    } catch (error) {
      console.error('Error during axios.post', error);
    }
  };

  const [username2, set_username2] = useState('');
  const [password2, set_password2] = useState('');

  const signin_data = async (e) => {
    e.preventDefault();
    const signin_retrieve = {
      user: username2,
      pass: password2,
      captcha:captcha
    };

    try {
      const response = await axios.post('https://sasa-back-vercel.vercel.app/api/signin', signin_retrieve);

      if (response.status === 200) {
        const token = response.data.token;
        localStorage.setItem('token', token);
        notifysuccess2();
        sleep(3000, function () {
          navigate('/dashboard');
        });
      } else if (response.status === 201) {
        notifyfail4();
        console.log('Incorrect password');
      }else if (response.status === 203) {
        notifyfail3();
        console.log('Incorrect password');
      }
       else {
        // Handle other response statuses if needed
        console.log(`Unexpected response status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error during axios.post', error);
    }
  };

  const signin_show=()=>{
    set_signinbox(true);
    set_signupbox(false)
  }
  return (
    <div className="bg-black h-screen">
      <ToastContainer/>
      <div className="flex items-center justify-center">
        <img
          className="animate-fade z-10 w-1/3 fixed top-1/4 -mt-16 left-24 drop-shadow-[0_2px_2px_rgba(0,0,0,1)]"
          id="blob"
          src={Logo}
          alt="logo"
        />
        <h2 className="animate-fade drop-shadow-2xl leading-relaxed fixed z-10 text-black font-mono top-2/4 mt-0 text-2xl font-bold w-4/12 left-24 text-center p-4 rounded-xl bg-opacity-60 ">
          Empowering Rural Minds: Bridging the Education Gap with Our Student-Teacher Education App 🌍📚 Unlocking Knowledge, Connecting Communities!
        </h2>
        <button className="animate-fade bottom-[6.9vh] mt-96 h-28 rounded-xl bg-black bg-opacity-80 text-3xl font-mono w-4/12 left-24 fixed z-10 text-white hover:bg-opacity-60 transition-all duration-300 ease-in-out border-transparent border-2" onClick={signin_show}>Sign In</button>
      </div>
      <div className="animate-fade fixed top-0 left-0 w-full h-full overflow-hidden m-0">
      <img className="w-full h-full object-cover m-0 pointer-events-none border-none outline-none"  src={Blobs} alt="blob" />
      </div>
      <div>
        <div>
          {signupbox && (
            <div className="animate-fade fixed flex items-center justify-center transform translate-x-12 top-28 bg-white bg-opacity-20 border border-black shadow-md rounded-3xl w-5/12 h-4/5 left-1/2 backdrop-blur-sm transition-all duration-300 ease-in-out hover:shadow-2xl">
              <form onSubmit={signup_data}>
                <input
                  className="w-4/5 bg-transparent text-center mx-14 mt-8 text-4xl border-b-2 border-black outline-none transition-all duration-300 ease-in-out text-black  placeholder-gray-600"
                  pattern="[a-z0-9]+"
                  required
                  type="text"
                  placeholder="username"
                  value={username}
                  onChange={(e) => set_username(e.target.value)}
                />
                <br></br>
                <input
                  className="w-4/5 bg-transparent text-center mx-14 mt-8 text-4xl border-b-2 border-black  outline-none transition-all duration-300 ease-in-out text-black   placeholder-gray-600"
                  id="passupbox"
                  pattern="[a-z0-9]+"
                  type="password"
                  placeholder="password"
                  value={password}
                  onChange={(e) => set_password(e.target.value)}
                  required
                />
                <br></br>
                <input
                  className="w-4/5 bg-transparent text-center mx-14 mt-8 text-4xl border-b-2 border-black outline-none transition-all duration-300 ease-in-out text-black  placeholder-gray-600"
                  id="passupbox3"
                  pattern="[a-z0-9]+"
                  type="password"
                  placeholder="confirm password"
                  value={password3}
                  onChange={(e) => set_password3(e.target.value)}
                  required
                />
                <br></br>
                <div className="fixed xl:left-48 xl:ml-20 bg-black border-2 border-black xl:mt-16 left-24" dangerouslySetInnerHTML={{ __html: captchaImage }} />
                <input className="fixed xl:left-44 xl:ml-16 top-72 ml-3 xl:mt-48 bg-transparent text-center transition-all outline-none text-black duration-300 ease-in-out border-b-2 border-black font-mono placeholder:text-gray-600 text-2xl w-4/12" type="text" placeholder="verify captcha" value={captcha} onChange={(e) => set_captcha(e.target.value)} required></input>
                <br></br>
                <button
                  id="signup-but"
                  type="submit"
                  className="mt-52 font-mono w-4/5 text-black text-4xl text-center drop-shadow-xl transition-all duration-300 ease-in-out ml-16"
                >
                  Sign Up
                </button>
              </form>
            </div>
          )}
        </div>
        <div>
        {signinbox && (
        <div className="animate-fade fixed transform flex items-center justify-center translate-x-28 top-28 bg-white bg-opacity-20 border border-black shadow-md rounded-3xl w-5/12 h-4/5 top-2/4 right-52 backdrop-blur-sm transition-all duration-300 ease-in-out hover:shadow-2xl">
            <form onSubmit={signin_data}>
              <input
                className="w-4/5 bg-transparent text-center mx-14 mt-8 text-4xl border-b-2 border-black  outline-none transition-all duration-300 ease-in-out text-black  placeholder-gray-600"
                id="userinbox"
                pattern="[a-z0-9]+"
                type="text"
                placeholder="username"
                value={username2}
                onChange={(e) => set_username2(e.target.value)}
                required
              />
              <br></br>
              <input
                className="w-4/5 bg-transparent text-center mx-14 mt-8 text-4xl border-b-2 border-black outline-none transition-all duration-300 ease-in-out text-black  placeholder-gray-600"
                id="passinbox"
                pattern="[a-z0-9]+"
                type="password"
                placeholder="password"
                value={password2}
                onChange={(e) => set_password2(e.target.value)}
                required
              />
              <br></br>
              <div className="fixed xl:left-48 xl:ml-20 bg-black border-2 border-black xl:mt-20 left-24" dangerouslySetInnerHTML={{ __html: captchaImage }} />
              <input className="fixed xl:left-44 xl:ml-16 xl:mt-40 bg-transparent text-center transition-all outline-none text-black duration-300 ease-in-out border-b-2 border-black font-mono placeholder:text-black text-2xl w-4/12" type="text" placeholder="verify captcha" value={captcha} onChange={(e)=>set_captcha(e.target.value)} required></input>
          <br></br>
              <button
                id="signin-but"
                type="submit"
                className="font-mono w-4/5 text-4xl m-16 mt-60 text-center transition-all duration-300 ease-in-out text-black"
              >
                Sign In
              </button>
            </form>
          </div>)}
        </div>
      </div>
    </div>
  );
  
};

export default Home;

//sarva saksharta