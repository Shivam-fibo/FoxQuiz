import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Loading from '../../Layout/Loading';

const QuizResults = () => {
  const [quizResults, setQuizResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [quizTitles, setQuizTitles] = useState([]); 
  const [selectedTitle, setSelectedTitle] = useState(null);
  const resultsPerPage = 10;
  const navigate = useNavigate();

  // Fetch unique quiz titles from the backend
  const fetchQuizTitles = async () => {
    try {
      const response = await axios.get('http://localhost:3000/quiz/totalTitle');
      setQuizTitles(response.data.totalNum || []);
      console.log(response)
    } catch (error) {
      console.error('Error fetching quiz titles:', error);
      toast.error('Failed to fetch quiz titles');
    }
  };

  // Fetch quiz results based on page and optionally a title
  const fetchQuizResults = async (page = 1, title = null) => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:3000/quiz/result', {
        params: {
          page,
          limit: resultsPerPage,
          title,
        },
      });
      console.log(response)
      setQuizResults(response.data.data || []);
      setCurrentPage(response.data.page || 1);
      setTotalPages(response.data.totalPages || 1);
      setTotalResults(response.data.totalResults || 0);
    } catch (error) {
      console.error('Error fetching quiz results:', error);
      toast.error('Failed to fetch quiz results');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizTitles();
    fetchQuizResults(currentPage, selectedTitle);
  }, [currentPage, selectedTitle]); 

  if (loading) {
    return <Loading />;
  }

  const handleTitleClick = (title) => {
    setSelectedTitle(title);
    setCurrentPage(1); 
  };

  return (
    <div className="p-6 bg-gray-50">
      <h2 className="text-2xl font-bold mb-6 text-center">Quiz Results</h2>
      <div className="mb-4">
        {quizTitles.map((title) => (
          <button
            key={title}
            className={`px-4 py-2 mr-2 mb-2 bg-blue-500 text-white rounded ${
              selectedTitle === title ? 'bg-red-500' : ''
            }`}
            onClick={() => handleTitleClick(title)}
          >
            {title}
          </button>
        ))}
      </div>
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
              {quizResults.map((result) => (
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

      <div className="flex justify-between mt-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:cursor-not-allowed disabled:bg-black"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <div>
          Page {currentPage} of {totalPages}
        </div>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:cursor-not-allowed disabled:bg-black"
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default QuizResults;
