import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const QuizResults = () => {
  const [quizResults, setQuizResults] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to fetch quiz results
  const fetchQuizResults = async () => {
    try {
      const response = await axios.get('http://localhost:3000/quiz/result'); 
      console.log(response);
      setQuizResults(response.data.data); // Assuming the results are in response.data.data
      setLoading(false);
    } catch (error) {
      console.error('Error fetching quiz results:', error);
      toast.error('Failed to fetch quiz results');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizResults(); // Fetch quiz results on component mount
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Quiz Results</h2>
      {quizResults.length === 0 ? (
        <p>No quiz results found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto bg-white rounded-lg shadow-md">
            <thead>
              <tr className="bg-gray-200 text-gray-700 text-left">
                <th className="px-4 py-2">Username</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Score</th>
              </tr>
            </thead>
            <tbody>
              {[...quizResults].reverse().map((result) => (
                <tr key={result._id} className="border-b text-left">
                  <td className="px-4 py-2">{result.username}</td>
                  <td className="px-4 py-2">{result.email}</td>
                  <td className="px-4 py-2">{result.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default QuizResults;
