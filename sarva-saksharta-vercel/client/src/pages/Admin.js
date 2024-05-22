import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Fix from './Fix.js';
import { validateToken } from './Auth.js';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const Admin = () => {
  const user = validateToken();
  const navigate = useNavigate();
  const [manageaccounts,set_manageaccounts]=useState(false)
  const [approvecontent,set_approvecontent]=useState(false)
  const [content,set_content]=useState([]);
  useEffect(() => {
    const validateAdmin = async () => {
      try {
        const response = await axios.post(
          'https://sasa-back-vercel.vercel.app/api/admin',
          { user: user },
          {
            headers: {
              Authorization: localStorage.getItem('token'),
            },
          }
        );

        if (response.status === 201) {
          navigate('/dashboard');
        }
      } catch (error) {
        console.error(error.message);
      }
    };

    validateAdmin();
  }, []);
  function sleep(ms, callback) {
    setTimeout(callback, ms);
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('https://sasa-back-vercel.vercel.app/api/role-check', { user }, {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        });

        if (response.status === 202) {
          console.log("No Grade selected, Teacher?");
          set_content(response.data[0]);
          console.log(response.data[0]);
        }
      } catch (error) {
        console.error('Error checking grade:', error);
      }
    };
    fetchData();
  }, [user]);

  const [delete_username, set_delete_username] = useState('');
  const [teacher_username, set_teacher_username] = useState('');
  const [teacher_password, set_teacher_password] = useState('');

  const [admin_username, set_admin_username] = useState('');
  const [admin_password, set_admin_password] = useState('');

  const deleteAccount = async (e) => {
    e.preventDefault();
    const account = {
      user: user,
      delete: delete_username,
    };

    try {
      const response = await axios.post('https://sasa-back-vercel.vercel.app/api/delete', account, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      });
      if (response.status === 200) {
        notifydelete()
        sleep(3000, function () {
          window.location.reload();
        });
      }
    } catch (error) {
      console.error('Error during axios.post', error);
    }
  };
  const set_manageaccounts_true=()=>{
    set_manageaccounts(true);
    set_approvecontent(false)
  }
  const set_approvecontent_true=()=>{
    set_approvecontent(true)
    set_manageaccounts(false);
  }
  const sendApproval=async(item)=>{
    console.log(item.filename)
    try {
      const response = await axios.post('https://sasa-back-vercel.vercel.app/api/approve-content',{filename:item.filename},{
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      });

      if (response.status === 200) {
        console.log("content approved")
      }
      else{
        console.log("something went wrong")
      }
    } catch (error) {
      console.error('Error checking grade:', error);
    }
  }
  const sendDelete=async(item)=>{
    console.log(item.filename)
    try {
      const response = await axios.post('https://sasa-back-vercel.vercel.app/api/delete-content',{filename:item.filename},{
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      });

      if (response.status === 200) {
        console.log("content deleted")
      }
      else{
        console.log("something went wrong")
      }
    } catch (error) {
      console.error('Error :', error);
    }
  }
  const addTeacher = async (e) => {
    e.preventDefault();
    const account = {
      username: teacher_username,
      password: teacher_password,
    };

    try {
      const response = await axios.post('https://sasa-back-vercel.vercel.app/api/addteacher', account, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      });
      if (response.status === 200) {
        notifyteacher()
        sleep(3000, function () {
          window.location.reload();
        });
      }
    } catch (error) {
      console.error('Error during axios.post', error);
    }
  };

  const notifydelete = () => toast("Account deleted !");
  const notifyteacher = () => toast("Teacher account added !");
  const notifyadmin = () => toast("Admin account added !");

  const addAdmin = async (e) => {
    e.preventDefault();
    const account = {
      username: admin_username,
      password: admin_password,
    };

    try {
      const response = await axios.post('https://sasa-back-vercel.vercel.app/api/addadmin', account, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      });
      if (response.status === 200) {
        notifyadmin()
        sleep(3000, function () {
          window.location.reload();
        });
      }
    } catch (error) {
      console.error('Error during axios.post', error);
    }

  };
  return (
    <div>
      <ToastContainer/>
      <h2 className="text-black fixed font-mono top-8 left-56 text-5xl text-underline">Admin Portal</h2>
      <button className="text-white bg-black z-10 fixed top-32 text-xl border-white border-2 p-4 left-1/4 -ml-52 hover:shadow-2xl transition-all duration-300 ease-in-out" onClick={set_manageaccounts_true}>Manage Accounts</button>
      <button className="text-white bg-black z-10 fixed top-32 text-xl border-white border-2 p-4 left-2/4 -ml-96 hover:shadow-2xl transition-all duration-300 ease-in-out"onClick={set_approvecontent_true}>Manage Uploads</button>
      {(manageaccounts && <div className="mt-32">
      <form onSubmit={deleteAccount}>
        <input
          id="delete-box"
          type="text"
          placeholder="enter id"
          required
          value={delete_username}
          onChange={(e) => set_delete_username(e.target.value)}
          className="text-black text-center outline-none bg-transparent fixed font-mono top-1/4 mt-4 left-56 text-4xl border-black border-b-4 placeholder-gray-600"
        ></input>
        <button
          id="delete-button"
          type="submit"
          className="text-white fixed font-mono top-1/4 mt-2 left-1/2 p-1 bg-red-500 border-black rounded-md font-bold text-4xl w-80 border-2 hover:shadow-2xl transition-all duration-300 ease-in-out"
        >
          Delete Account
        </button>
      </form>
      <form onSubmit={addTeacher}>
        <input
          id="teacher-box"
          type="text"
          placeholder="add teacher"
          value={teacher_username}
          onChange={(e) => set_teacher_username(e.target.value)}
          className="text-black text-center outline-none bg-transparent fixed font-mono top-1/4 mt-32 left-56 text-4xl border-black border-b-4 placeholder-gray-600"
        ></input>
        <input
          id="teacher-box2"
          type="password"
          placeholder="enter password"
          value={teacher_password}
          onChange={(e) => set_teacher_password(e.target.value)}
          className="text-black text-center outline-none bg-transparent fixed font-mono top-1/4 mt-44 left-56 text-4xl border-black border-b-4 placeholder-gray-600"
        ></input>
        <button
          id="teacher-button"
          type="submit"
          className="text-white p-1 rounded-md border-2 w-80 fixed font-mono top-1/4 mt-56 left-1/2 text-4xl border-black bg-red-500 hover:shadow-2xl transition-all duration-300 ease-in-out font-bold"
        >
          Add Teacher
        </button>
      </form>
      <form onSubmit={addAdmin}>
        <input
          id="admin-box"
          type="text"
          placeholder="add admin"
          value={admin_username}
          onChange={(e) => set_admin_username(e.target.value)}
          className="text-black text-center outline-none bg-transparent fixed font-mono top-2/4 mt-28 left-56 text-4xl border-black border-b-4 placeholder-gray-600"
        ></input>
        <input
          id="admin-box2"
          type="password"
          placeholder="enter password"
          value={admin_password}
          onChange={(e) => set_admin_password(e.target.value)}
          className="text-black text-center outline-none bg-transparent fixed font-mono top-2/4 mt-40 left-56 text-4xl border-black border-b-4 placeholder-gray-600"
        ></input>
        <button
          id="admin-button"
          type="submit"
          className="text-white p-1 rounded-md border-2 w-80 fixed font-mono top-2/4 mt-52 left-1/2 text-4xl border-black bg-red-500 hover:shadow-2xl transition-all duration-300 ease-in-out font-bold"
        >
          Add Admin
        </button>
      </form>
      <h2 className="text-white fixed font-mono top-56 bg-black h-52 border-white border-2 p-3 text-center right-16 bottom-16 text-3xl">Disguise: <br></br><br></br>student-student <br></br>teacher-teacher<br></br>admin-admin</h2>
      </div>)}
      {(approvecontent && 
  <div className="flex flex-wrap fixed top-64 left-56 w-6/12 h-3/6 overflow-auto">
    {content.map((item) => (
      <div key={item._id} className="bg-black p-4 rounded-lg mb-4 mr-4 w-60 border-transparent border-2 hover:border-white transition-all duration-300ms ease-in-out">
        
        <button>
        <h3 className="text-white font-bold text-xl mb-2">{item.topic}</h3>
        <p className="text-white font-mono text-sm mb-2">Grade: {item.grade}</p>
        <p className="text-white font-mono text-sm mb-2">Subject: {item.subject}</p>
        <p className="text-white font-mono text-sm mb-2">Unit: {item.unit}</p>
        <p className="text-white font-mono text-sm mb-2">Filename: {item.filename}</p>
        <button
          className="text-white font-mono bg-green-500 border-none rounded-md font-bold text-sm px-2 py-1 w-52 mt-12 -ml-1" onClick={() => sendApproval(item)}
        >
          Approve Upload
        </button>
        <button
          className="text-white font-mono bg-red-500 border-none rounded-md font-bold text-sm px-2 py-1 mt-4 w-52 -ml-1" onClick={() => sendDelete(item)}
        >
          Delete Upload
        </button>
        </button>

      </div>
    ))}
  </div>
)}


    </div>
  );
};

export default Admin;
