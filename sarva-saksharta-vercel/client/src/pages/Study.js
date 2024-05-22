import React, { useState, useEffect } from 'react';
import '../styles/Study.css';
import Fix from './Fix.js';
import axios from 'axios';
import { validateToken } from './Auth.js';

const UploadComponent = ({ setShowUpload }) => {
  const [subject, set_subject] = useState('');
  const [grade, set_grade] = useState('');
  const [unit, set_unit] = useState('');
  const [topic, set_topic] = useState('');
  const [file, set_file] = useState(null);
  const user = validateToken();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const upload_data = new FormData();
    upload_data.append('user', user);
    upload_data.append('grade', grade);
    upload_data.append('subject', subject);
    upload_data.append('unit', unit);
    upload_data.append('topic', topic);
    upload_data.append('file', file);

    try {
      const response = await axios.post('http://localhost:5500/api/upload', upload_data, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      });

      if (response.status === 200) {
        console.log("Uploading data - successful");
      } else if (response.status === 201) {
        console.log("Uploading data - failed");
      }

    } catch (error) {
      console.error('Error uploading data:', error);
    }
  };

  return (
    <div className="fixed top-0 left-24 text-white z-10">
      <button id="close-upload" onClick={() => setShowUpload(false)}>Close</button>
      <form onSubmit={handleSubmit}>
        <select id="upload-grade" onChange={(e) => set_grade(e.target.value)}>
          <option value="">select-grade</option>
          <option value="grade-5">grade-5</option>
          <option value="grade-6">grade-6</option>
          <option value="grade-7">grade-7</option>
          <option value="grade-8">grade-8</option>
          <option value="grade-9">grade-9</option>
          <option value="grade-10">grade-10</option>
          <option value="grade-11">grade-11</option>
          <option value="grade-12">grade-12</option>
        </select><br></br>
        {/* "Mathematics",
    "Social Science",
    "English",
    "Language",
    "Biology",
    "Chemistry",
    "Physics"*/}
        <select id="upload-subject" onChange={(e) => set_subject(e.target.value)}>
          <option value="">select-subject</option>
          <option value="Mathematics">Mathematics</option>
          <option value="Social Science">Social Science</option>
          <option value="English">English</option>
          <option value="Language">Language</option>
          <option value="Biology">Biology</option>
          <option value="Chemistry">Chemistry</option>
          <option value="Physics">Physics</option>
        </select><br></br>
        <input id="upload-unit" type="text" placeholder="enter unit" value={unit} onChange={(e) => set_unit(e.target.value)} /><br></br>
        <input id="upload-topic" type="text" placeholder="enter topic" value={topic} onChange={(e) => set_topic(e.target.value)} /><br></br>
        <input id="upload-file" type="file" accept=".pdf, .doc, .docx, .pptx, .mp4, .mp3" onChange={(e) => set_file(e.target.files[0])} /><br></br>
        <button id="upload-submit" type="submit">Submit</button>
      </form>
    </div>
  );
};

const Give_Task = ({ set_show_task }) => {
  const [task_name, set_task_name] = useState('');
  const [task_grade, set_task_grade] = useState('');
  const task_details = {
    task_name: task_name,
    task_grade: task_grade,
  };

  const assign_task = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://sasa-back-vercel.vercel.app/api/tasks', task_details, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      });

      if (response.status === 200) {
        console.log("Uploading task - successful");
      } else if (response.status === 201) {
        console.log("Uploading task - failed");
      }

    } catch (error) {
      console.error('Error uploading data:', error);
    }
  };

  const Dontshow_Task = () => {
    console.log('Closing task...');
    set_show_task(false);
  };
  

  return (
    <div id="task-panel">
      <button id="close-button2" onClick={Dontshow_Task}>Close</button>
      <h2 id="task-title">Assign Tasks</h2>
      <form onSubmit={assign_task}>
        <input id="task-name" type="text" placeholder="task name" onChange={(e) => set_task_name(e.target.value)} /><br></br>
        <select id="task-grade" onChange={(e) => set_task_grade(e.target.value)}>
          <option value="">select-grade</option>
          <option value="grade-5">grade-5</option>
          <option value="grade-6">grade-6</option>
          <option value="grade-7">grade-7</option>
          <option value="grade-8">grade-8</option>
          <option value="grade-9">grade-9</option>
          <option value="grade-10">grade-10</option>
          <option value="grade-11">grade-11</option>
          <option value="grade-12">grade-12</option>
        </select><br></br>
        <button id="add-task" type="submit">Add Task</button>
      </form>
    </div>
  );
};

const Study = () => {
  const user = validateToken();
  const [showTeacher, setTeacher] = useState(null);
  const [showUpload, setShowUpload] = useState(false);
  const [subjects, set_subjects] = useState([]);
  const [content, set_content] = useState([]);
  const [contentviewer, set_contentviewer] = useState(false);
  const [pdfPath, setPdfPath] = useState('');
  const [show_task, set_show_task] = useState(false);
  const [review_upload,set_review_upload]=useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('https://sasa-back-vercel.vercel.app/api/role-check', { user }, {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        });

        if (response.status === 200) {
          setTeacher(true);
          set_review_upload(response.data)
          console.log(response.data);
        } else if (response.status === 201) {
          setTeacher(false);
          console.log("No Grade selected, Teacher?");
          set_subjects(response.data[0]);
          set_content(response.data[1]);
          
          console.log(response.data[1]);
        }
      } catch (error) {
        console.error('Error checking grade:', error);
      }
    };
    fetchData();
  }, [user]);
  const sendDelete=async(entry)=>{
    console.log(entry.filename)
    try {
      const response = await axios.post('https://sasa-back-vercel.vercel.app/api/delete-content',{filename:entry.filename},{
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
  const TeacherView = () => {
    return (
      <div>
         <div className="ml-12 grid grid-cols-3 gap-5 fixed left-0 top-44 mt-4 z-10 overflow-y-scroll w-full h-4/6 pl-20 pr-20">
        {review_upload.map((entry) => (
          <div class="rounded-2xl overflow-hidden shadow-lg bg-black h-64 bg-opacity-70 border-transparent hover:border-white transition-all duration-300 ease-in-out border-2 w-full text-white font-mono">
          <div class="py-2 px-4">
            <button>
            <h2 class="text-lg font-semibold text-white">{entry.topic}</h2>
            <p class="mt-2 text-white"><b>Unit:</b>{entry.unit}</p>
            <p class="mt-2 text-white"><b>Subject:</b> {entry.subject}</p>
            <p class="mt-2 text-white"><b>Grade:</b> {entry.grade}</p>
            <p class="mt-2 text-white"><b>Source:</b> {entry.filename}</p>
            <button onClick={() => sendDelete(entry)} className="bg-red-500 mt-4 rounded text-white p-2 hover:border-white border-2 border-transparent transiton-all duration-300 ease-in-out">Delete Upload</button>
            </button>
          </div>
        </div>
        
        ))}
    </div>
        <button className="fixed bg-black text-white text-4xl border-2 border-white rounded p-4 top-2/3 mt-48 right-0 w-[47vw] h-24 z-10 hover:bg-opacity-50 transition-all duration-300 ease-in-out" onClick={() => setShowUpload(true)}>
          Upload
        </button>
        {/*<button id="task-button" onClick={() => set_show_task(true)}>
          Assign Task
    </button>*/}
        <button className="fixed bg-black text-white text-4xl border-2 border-white rounded p-4 top-2/3 mt-48 left-20 ml-1 w-[48vw] h-24 z-10 hover:bg-opacity-50 transition-all duration-300 ease-in-out" onClick={() => set_show_task(true)}>Assign Task</button>
        {showUpload && <UploadComponent setShowUpload={setShowUpload} />}
        {show_task && <Give_Task set_show_task={set_show_task} />}
      </div>
    );
  };

  const ContentViewer = () => {
    console.log(pdfPath);
    return (
      <div id="content-viewer">
        <iframe title="Study Material" id="iframe-box" src={pdfPath} width="100%" height="92.5%"></iframe>
        <button id="content-close-button" onClick={ViewContent2}>Close</button>
      </div>
    );
  };

  const ViewContent = (e) => {
    const filePath = e.target.value;
    console.log(filePath)
    setPdfPath(`http://localhost:8080/${filePath}`);
    set_contentviewer(true);
  };

  const ViewContent2 = () => {
    set_contentviewer(false);
  };

  return (
    <div>
      <h1 className="animate-fade fixed top-0 text-black font-mono text-5xl left-1/2 -ml-16 mt-12 underline">Study</h1>
      {contentviewer && <ContentViewer />}
      <div className="fixed animate-fade">
        <button id="clear-button">Clear Filter</button>
        {showTeacher && <TeacherView />}
        
        <div className="fixed top-44 left-[5.4vw] flex w-[92.6vw] h-12 -mt-8 overflow-x-scroll">
  {subjects.map((subject, index) => (
    <button className="text-white border-white border-2 bg-black font-mono min-w-56 text-xl ml-4 hover:bg-white hover:text-black transition-all duration-300 ease-in-out hover:border-black" key={index} value={subject}>{subject}</button>
  ))}
</div>

<div className="fixed top-52 left-28  w-11/12 h-auto max-h-[65vh] overflow-y-scroll top-32 pl-2 pr-2 pt-2 flex flex-wrap -mx-1">
  {content.map((i, index) => (
    <div key={index} className="sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3 px-1 mb-2 p-4 pl-4 pr-4">
      <div>
        <button
          className="rounded-2xl overflow-hidden shadow-lg bg-white h-48 bg-opacity-20 border-transparent hover:shadow-2xl transition-all duration-300 ease-in-out border-2 w-full text-black border-black font-mono"
          value={i.filename}
          onClick={ViewContent}
        >
          Subject: {i.subject}<br />
          Unit: {i.unit}<br />
          Topic: {i.topic}
        </button>
      </div>
    </div>
  ))}
</div>


   </div>
    </div>
  );
};

export default Study;