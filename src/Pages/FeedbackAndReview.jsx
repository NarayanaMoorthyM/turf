import React, { useState } from 'react';
import { Camera, ThumbsUp, AlertTriangle, ChevronLeft, ChevronRight } from 'lucide-react';

// Sample photos (replace with placeholder images for demonstration)
const photosData = [
  "/api/placeholder/400/320",
  "/api/placeholder/400/320", 
  "/api/placeholder/400/320",
  "/api/placeholder/400/320",
  "/api/placeholder/400/320",
  "/api/placeholder/400/320"
];

const initialReviewsData = [
  {
    name: 'John Doe',
    rating: 5,
    title: 'Great service!',
    content: 'I really enjoyed the experience.',
    helpful: 12,
    profilePic: "/api/placeholder/100/100",
  },
  {
    name: 'Jane Smith',
    rating: 4,
    title: 'Good service',
    content: 'Good service but room for improvement.',
    helpful: 8,
    profilePic: "/api/placeholder/100/100",
  },
  {
    name: 'Bob Brown',
    rating: 3,
    title: 'Average experience',
    content: 'It was okay.',
    helpful: 5,
    profilePic: "/api/placeholder/100/100",
  },
  {
    name: 'Alice Johnson',
    rating: 4,
    title: 'Pretty good!',
    content: 'Would come again.',
    helpful: 9,
    profilePic: "/api/placeholder/100/100",
  },
  {
    name: 'Chris Evans',
    rating: 2,
    title: 'Not what I expected',
    content: 'Could be better.',
    helpful: 3,
    profilePic: "/api/placeholder/100/100",
  },
  {
    name: 'Emma White',
    rating: 5,
    title: 'Exceptional service',
    content: 'Friendly staff!',
    helpful: 15,
    profilePic: "/api/placeholder/100/100",
  },
];

// Star Rating Component
const StarRating = ({ value, onChange, readOnly = false }) => {
  const [hover, setHover] = useState(null);
  
  return (
    <div className="flex">
      {[...Array(5)].map((_, index) => {
        const ratingValue = index + 1;
        return (
          <button
            key={index}
            type="button"
            className={`bg-transparent border-none cursor-pointer ${readOnly ? 'cursor-default' : ''}`}
            onClick={() => onChange && onChange(ratingValue)}
            onMouseEnter={() => !readOnly && setHover(ratingValue)}
            onMouseLeave={() => !readOnly && setHover(null)}
          >
            <span className={`text-2xl ${(hover || value) >= ratingValue ? 'text-yellow-400' : 'text-gray-300'}`}>
              ★
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default function FeedbackAndReview() {
  const [reviewName, setReviewName] = useState('');
  const [photoIndex, setPhotoIndex] = useState(0);
  const [rating, setRating] = useState(0);
  const [likedReviews, setLikedReviews] = useState({});
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewContent, setReviewContent] = useState('');
  const [reviewsData, setReviewsData] = useState(initialReviewsData);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleNextPhoto = () => {
    setPhotoIndex((prevIndex) => (prevIndex + 1) % photosData.length);
  };

  const handlePreviousPhoto = () => {
    setPhotoIndex((prevIndex) => (prevIndex - 1 + photosData.length) % photosData.length);
  };

  const handleLikeReview = (index) => {
    setLikedReviews((prevLikes) => ({
      ...prevLikes,
      [index]: !prevLikes[index],
    }));
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleReviewSubmit = (event) => {
    event.preventDefault();

    const newReview = {
      name: reviewName,
      rating,
      title: reviewTitle,
      content: reviewContent,
      profilePic: "/api/placeholder/100/100", // Placeholder for profile picture
      helpful: 0, // Initial helpful count
    };

    try {
      // In a real application, you would send this to your API
      console.log('Review to submit:', newReview);
      console.log('Selected file:', selectedFile);
      
      // For demo purposes, we'll just update the state
      setReviewsData((prevReviews) => [newReview, ...prevReviews]);
      
      // Reset form fields after successful submission
      setReviewName('');
      setRating(0);
      setReviewTitle('');
      setReviewContent('');
      setSelectedFile(null);
      
      // Reset file input (handled differently in React)
      const fileInput = document.getElementById('file');
      if (fileInput) fileInput.value = '';
      
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  return (
    <div className="max-w-full px-8 py-6 mx-auto">
      <h2 className="text-2xl font-bold pb-2 mb-8 border-b-2 border-blue-500 text-gray-800">
        Customer Reviews
      </h2>

      {/* Review Summary */}
      <div className="flex flex-col sm:flex-row items-center mb-6 justify-between">
        <div className="flex items-center">
          <StarRating value={4.4} readOnly={true} />
          <span className="ml-4">4.4 out of 5 stars</span>
        </div>
        
        <div className="flex items-center justify-start mt-4 sm:mt-0">
          <div className="flex space-x-2">
            {photosData.slice(photoIndex, photoIndex + 3).map((photo, index) => (
              <div key={index} className="w-24 h-24 relative">
                <img 
                  src={photo} 
                  alt={`Review ${photoIndex + index + 1}`} 
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
          <button 
            onClick={handlePreviousPhoto}
            className="ml-2 p-1 rounded-full hover:bg-gray-200"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={handleNextPhoto}
            className="ml-1 p-1 rounded-full hover:bg-gray-200"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Reviews */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
        {reviewsData.map((review, index) => (
          <div key={index} className="border rounded-lg p-4 mb-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
                  <img 
                    src={review.profilePic} 
                    alt={review.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-bold">{review.name}</h3>
                  <StarRating value={review.rating} readOnly={true} />
                </div>
              </div>
            </div>
            
            <div className="py-2">
              <h4 className="font-semibold">{review.title}</h4>
              <p className="text-sm text-gray-700 mt-1">{review.content}</p>
            </div>
            
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center space-x-1">
                <button 
                  className={`p-1 rounded-full ${likedReviews[index] ? 'text-blue-500' : 'text-gray-500'}`}
                  onClick={() => handleLikeReview(index)}
                >
                  <ThumbsUp size={16} />
                </button>
                <span className="text-sm">
                  {likedReviews[index] ? parseInt(review.helpful) + 1 : review.helpful}
                </span>
              </div>
              <button className="flex items-center text-sm text-amber-600 px-2 py-1 border border-amber-600 rounded">
                <AlertTriangle size={14} className="mr-1" />
                Report
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Leave Your Feedback Form */}
      <div className="mt-8 pt-6 border-t-2 border-blue-500">
        <h3 className="text-xl font-bold mb-4">Leave Your Feedback</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1" htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Enter your name"
              value={reviewName}
              onChange={(e) => setReviewName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Rating</label>
            <StarRating value={rating} onChange={setRating} />
          </div>

          <div>
            <label className="block text-gray-700 mb-1" htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Review title"
              value={reviewTitle}
              onChange={(e) => setReviewTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1" htmlFor="content">Content</label>
            <textarea
              id="content"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              rows="3"
              placeholder="Write your review here"
              value={reviewContent}
              onChange={(e) => setReviewContent(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1" htmlFor="file">Upload Image (optional)</label>
            <div className="flex items-center">
              <input
                id="file"
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />
              <label htmlFor="file" className="cursor-pointer bg-gray-200 px-3 py-2 rounded-md flex items-center">
                <Camera size={16} className="mr-2" />
                {selectedFile ? selectedFile.name : "Choose file"}
              </label>
            </div>
          </div>

          <button
            onClick={handleReviewSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Submit Review
          </button>
        </div>
      </div>
    </div>
  );
}
