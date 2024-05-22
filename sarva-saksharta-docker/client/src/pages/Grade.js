import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Grade.css';
import { validateToken } from './Auth.js';


const Grade = () => {

  const user = validateToken();
  const [grade, set_grade] = useState('');

  const grade_set = async (e) => {
    e.preventDefault();

    const new_grade = {
      user: user,
      grade: grade,
      grade_check:"selected"
    };

    try {
      const response = await axios.post('http://localhost:5500/api/set-grade', new_grade, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      });

      if(response.status===200){
        window.location.reload()
        console.log("grade updated")
      }
      else if(response.status===201){
        console.log("grade not upgraded")
      }
} catch (error) {
      console.error('Error setting grade:', error);
    }
  };

  return (
    <div id="fake-click">
    <div id="grade-select-box">
      <h1 id="grade-title">Choose Grade</h1>
      <form onSubmit={grade_set}>
        <select id="select-dd" value={grade} onChange={(e) => set_grade(e.target.value)} required>
          <option value="">------------------</option>
          <option value="grade-5">Grade 5</option>
          <option value="grade-6">Grade 6</option>
          <option value="grade-7">Grade 7</option>
          <option value="grade-8">Grade 8</option>
          <option value="grade-9">Grade 9</option>
          <option value="grade-10">Grade 10</option>
          <option value="grade-11">Grade 11</option>
          <option value="grade-12">Grade 12</option>
        </select>
        <button id="confirm-grade" type="submit">Confirm</button>
      </form>
    </div>
    </div>
  );
};

export default Grade;
