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
      console.log(response)
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
        <div>
    {[...quizResults].reverse().map((result) => (
            <div key={result._id} className="mb-4 p-4 bg-white rounded-lg shadow-md">
              <h3 className="text-lg font-semibold">{result.fullName}</h3>
              <p><strong>Username:</strong> {result.username}</p>
              <p><strong>Email:</strong> {result.email}</p>
              <p><strong>Score:</strong> {result.score}</p>
              {/* If you want to display the answers as well */}
              <div>
                <strong>Answers:</strong>
                <pre>{JSON.stringify(result.answers, null, 2)}</pre>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuizResults;

