import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminQuizSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);
  
  useEffect(() => {
    const fetchQuizSubmissions = async () => {
      try {
        const response = await axios.get('http://localhost:3000/quiz/result'); 
        if (response.status === 200) {
          setSubmissions(response.data.data); // Assuming data.data contains the array of submissions
        }
      } catch (error) {
        console.error('Error fetching quiz submissions:', error);
      }
    };

    fetchQuizSubmissions();
  }, []);

  return (
    <div>
      <h2>Quiz Submissions</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Quiz ID</th>
            <th>Score</th>
            <th>Answers</th>
            <th>Submitted At</th>
          </tr>
        </thead>
        <tbody>
          {submissions.map(submission => (
            <tr key={submission._id}>
              <td>{submission._id}</td>
              <td>{submission.quizId._id}</td>
              <td>{submission.score}</td>
              <td>{JSON.stringify(submission.answers)}</td> {/* Customize how answers are displayed */}
              <td>{new Date(submission.submittedAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminQuizSubmissions;


// http://localhost:3000/quiz/result