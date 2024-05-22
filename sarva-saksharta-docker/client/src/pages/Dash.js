import React, { useEffect ,useState} from 'react';
import {useNavigate} from 'react-router-dom'
import { validateToken } from './Auth.js';
import Grade from './Grade.js';
import StudyQuotes from './StudyQuotes.js';
import axios from 'axios';
import '../index.css'

const Dash = () => {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const user = validateToken();
  const [showgrade, set_showgrade] = useState(null);
  const [forumData, setForumData] = useState([]);
  const [taskData, setTaskData] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://localhost:5500/api/grade-check', { user }, {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        });

        if (response.status === 200) {
          set_showgrade(true);
          console.log("Grade selected");
        } else if (response.status === 201) {
          set_showgrade(false);
          console.log("No Grade selected");
        }
      } catch (error) {
        console.error('Error checking grade:', error);
      }
    };

    fetchData();
  }, [user]);

  useEffect(() => {
    const fetchForum = async () => {
      try {
        const response = await axios.post('http://localhost:5500/api/get-forum', { user }, {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        });
        setForumData(response.data);
      } catch (error) {
        console.error('An error occurred:', error);
      }
    };

    fetchForum();
  }, [user]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.post('http://localhost:5500/api/get-tasks', { user }, {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        });
        setTaskData(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('An error occurred:', error);
      }
    };

    fetchTasks();
  }, [user]);

  const messageData = async (e) => {
    e.preventDefault();
    const messageRetrieve = {
      user: user,
      message: message,
    };

    try {
      const response = await axios.post('http://localhost:5500/api/forum', messageRetrieve, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      });

      if (response.status === 200) {
        navigate('/dashboard');
        console.log('Asked');
        window.location.reload();
      } else if (response.status === 201) {
        console.log('!Asked');
      }
    } catch (error) {
      console.error('Error during axios.post', error);
    }
  };

  return (
    <div>
      {showgrade && <Grade />}
      <h1 className="pointer-events-none fixed font-jockey-one text-outline-black text-8xl z-10 text-white top-8 left-36 drop-shadow-[0_5px_5px_rgba(0,0,0,1)] animate-fade">Hello, {user}!</h1>
      <div className="animate-fade hover:drop-shadow-[0_0px_100px_rgba(230,24,144,0.3)] transition-all duration-1000 ease-in-out fixed text-black top-40 rounded-3xl border-black hover:shadow-2xl border-2 w-4/12 h-80 bg-white bg-opacity-10 left-36"><StudyQuotes/></div>
      <div className="animate-fade hover:drop-shadow-[0_0px_100px_rgba(230,24,144,0.3)] transition-all duration-1000 ease-in-out fixed overflow-y-scroll text-black top-96 mt-28 rounded-tl-3xl rounded-tr-3xl border-black border-l-2 border-r-2 border-t-2 w-[89.5vw] h-[35vh] bg-white bg-opacity-10 left-36"><h2 className="text-center text-2xl underline mt-2 mb-4 font-mono">Forum</h2>{forumData.map((message, index) => (
        <div key={index} className="font-mono ml-8 mt-2">
          <p>{message.user}:    {message.message}</p>
        </div>
      ))}</div>
      <form onSubmit={messageData}>
        <textarea
          className="pl-4 pt-2 pr-4 fixed bottom-4 left-36 rounded-bl-3xl border-t w-[81.5vw] bg-black text-white border-black font-mono outline-none max-h-12 min-h-12 border-l-2 border-b-2 "
          type="text"
          placeholder="type your message here ..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="fixed bottom-4 border-r-2 border-t-2 border-l-2 border-b-2 border-black bg-black right-[2vw] rounded-br-3xl w-[8.1vw] h-12 text-white text-2xl" type="submit">
          Send
        </button>
      </form>
      <div className="animate-fade hover:drop-shadow-[0_0px_100px_rgba(230,24,144,0.3)] transition-all duration-1000 ease-in-out fixed text-center text-black overflow-y-scroll top-40 rounded-3xl border-black border-2 w-[55vw] h-80 bg-white bg-opacity-10 right-8 mr-1"><h2 className="text-center mb-4 mt-4 underline text-2xl">Assigned Tasks</h2><br></br>
  {taskData.map((message, index) => (
    <div key={index} className="flex items-center justify-center mb-2">
      <p className="transition-all duration-300 ease-in-out text-white font-mono bg-black w-8/12 pb-2 pt-2 rounded-3xl border-transparent border-2 transition-all duration-500 ease-in-out hover:border-2 hover:border-transparent ">{message.task_name}
      </p>
      <br />
    </div>
  ))}
</div>
</div>
  );
};

export default Dash;
