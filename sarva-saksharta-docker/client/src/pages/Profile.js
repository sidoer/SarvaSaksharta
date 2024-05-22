import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Fix from './Fix.js';
import axios from 'axios';
import { validateToken } from './Auth.js';

const Profile = () => {
  const user = validateToken();
  const [profile_data, set_profile_data] = useState(null);
  const [name,set_name]=useState('')
  const [mail,set_mail]=useState('')
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://localhost:5500/api/get-profile-data', { user: user }, {
          headers: {
            Authorization: localStorage.getItem('token'),
          }
        });
        set_profile_data(response.data);
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    fetchData();
  }, [user]);

  const notifysuccess = () => toast("Changes Saved !");
  const notifyfail = () => toast("Changes not saved !");

  const save_changes=async(e)=>{
    e.preventDefault()
    const update_fields={
      user:user,
      name:name,
      mail:mail,
    }
    try {
      const response = await axios.post('http://localhost:5500/api/update-profile', update_fields, {
        headers: {
          Authorization: localStorage.getItem('token'),
        }
      });
    
      if (response.status === 200) {
        notifysuccess();
        console.log("saved changes");
      } else if (response.status === 201 || response.status===202) {
        notifyfail();
        console.log("failed to save changes");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }

  }
  return (
    <div>
      <ToastContainer/>
      <div className="animate-fade fixed top-60 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
  <h1 className="font-mono text-black text-5xl mb-32 ml-20 underline">Profile</h1>
  <form onSubmit={save_changes} className="flex flex-col items-center">
    <input type="text" className="outline-none text-black bg-transparent placeholder:text-gray-800 border-b-2 border-black ml-8 font-mono text-2xl text-center mb-4" pattern="[a-z0-9]+" placeholder={profile_data && profile_data.name} value={name} onChange={(e) => set_name(e.target.value)} />
    <input type="email" className="outline-none bg-transparent placeholder:text-gray-800 border-b-2 border-black text-black ml-8 font-mono text-2xl text-center mb-4" placeholder={profile_data && profile_data.mail} value={mail} onChange={(e) => set_mail(e.target.value)} />
    <input type="text" className="outline-none text-black bg-transparent placeholder:text-gray-800 border-b-2 border-black ml-8 font-mono text-2xl text-center mb-4" pattern="[a-z0-9]+" placeholder={profile_data && profile_data.role} disabled />
    <input type="text" className="outline-none text-black bg-transparent placeholder:text-gray-800 border-b-2 border-black ml-8 font-mono text-2xl text-center mb-4" pattern="[a-z0-9]+" placeholder={profile_data && profile_data.grade} disabled />
    <button className="fixed mt-60 ml-[2vw] text-2xl bg-black text-white p-2 rounded-xl hover:shadow-2xl border-2 border-transparent transition-all duration-300 ease-in-out" type="submit">Save Changes</button>
  </form>
</div>


    </div>
  );
};

export default Profile;
