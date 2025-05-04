import React, { useState } from 'react';
import './ContactUs.css'; // Ensure the path is correct
import logo from './images/logo1.jpeg';

function ContactUs() {
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Email: ${email}\nFeedback: ${feedback}`);
  };

  return (
    <div className="contact-us">
      <div className="contact-us-content">
        <div className="contact-us-left">
          <img src={logo} alt="Logo" className="contact-logo" />
        </div>
        
        {/* Vertical Divider Between Left and Right Content */}
        <div className="divider"></div>
        
        <div className="contact-us-right">
        <h2>About Us</h2>
<p>
  Welcome to <strong>PurePlay</strong>, your ultimate destination for seamless sports venue booking. 
  Whether you're planning a friendly match, a tournament, or a special event, we make finding and 
  reserving the perfect venue effortless.
</p>
<p>
  At <strong>PurePlay</strong>, we believe in fostering a love for sports by making access to top-notch 
  facilities easier than ever. Our intuitive platform allows users to browse, compare, and book venues 
  with just a few clicks. We prioritize convenience, affordability, and a seamless experience, so you can 
  focus on what truly matters—playing the game you love.
</p>
<p>
  Join our community of athletes, teams, and event organizers who trust <strong>PurePlay</strong> for their 
  sporting needs. Whether you’re a casual player or a professional, we’ve got the perfect space for you.
</p>
<p>
  Book your next game today and experience sports like never before!
</p>


          {/* Horizontal Divider Before Contact Form */}
          <div className="section-divider"></div>
          
          <h2>Contact Us</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="feedback">Feedback:</label>
              <textarea
                id="feedback"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                required
              />
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
