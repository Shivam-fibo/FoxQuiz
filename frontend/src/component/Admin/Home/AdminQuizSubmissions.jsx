import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminQuizSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);
  
  useEffect(() => {
    const fetchQuizSubmissions = async () => {
      try {
        const response = await axios.get('http://localhost:3000/quiz/result'); 
        if (response.status === 200) {
          setSubmissions(response.data.data); 
          console.log(response);
        }
      } catch (error) {
        console.error('Error fetching quiz submissions:', error);
      }
    };

    fetchQuizSubmissions();
  }, []);

  return (
    <div>
      <h2 >Quiz Submissions</h2>
      <table className='flex gap-10 flex-col' >
        <thead>
          <tr>
            <th>ID</th>
            <th>Quiz Title</th>
            <th>Username</th>
            <th className='ml-10 bg-green-700'>Score</th>
          
          </tr>
        </thead>
        <tbody>
          {submissions.map(submission => (
            <tr key={submission._id}>
              <td>{submission._id}</td>
              <td>{submission.quizId.title}</td>
              <td>{submission.userId?.username || 'NA'}</td>
      
              <td className=' ml-16 pl-10 bg-green-700'>{submission.score}</td>
             
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminQuizSubmissions;
