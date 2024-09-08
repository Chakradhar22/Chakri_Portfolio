import React, { useState } from 'react';
import { FaLinkedin, FaWhatsapp, FaEnvelope, FaInstagram } from 'react-icons/fa';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { firestore } from '../firebase'; // Adjust the path if needed

const ContactPage = () => {
  // Form state
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState(null);

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Add form data to Firestore
      await firestore.collection('HireMe').add({
        email: email,
        company: company, // Saving company name
        description: description,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(), // Add a timestamp
      });
      setMessage('Form submitted successfully!');
      setEmail('');
      setCompany('');
      setDescription('');
    } catch (error) {
      console.error('Error submitting form: ', error);
      setMessage('Error submitting form. Please try again.');
    }
  };

  return (
    <div className="contact-container container mx-auto p-6 md:p-12 bg-white-50 dark:bg-gray-800 rounded-lg shadow-md min-h-screen overflow-x-hidden z-10 flex flex-col items-center">

      {/* Company Name Form */}
      <div className="company-form-card border rounded-lg shadow-md p-6 bg-white dark:bg-gray-700 md:w-1/2">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Hire Me</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 mb-2">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-600 dark:border-gray-500 dark:text-white"
              placeholder="Your email address"
              required
            />
          </div>
          <div>
            <label htmlFor="company" className="block text-gray-700 dark:text-gray-300 mb-2">Company Name</label>
            <input
              type="text"
              id="company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-600 dark:border-gray-500 dark:text-white"
              placeholder="Your company name"
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-gray-700 dark:text-gray-300 mb-2">Project Description</label>
            <textarea
              id="description"
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-600 dark:border-gray-500 dark:text-white"
              placeholder="Tell me about the project"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 dark:bg-blue-400 dark:hover:bg-blue-500 transition-colors"
          >
            Submit
          </button>
        </form>
        {message && <p className="mt-4 text-center text-green-500 dark:text-green-300">{message}</p>}
      </div>

      {/* Contact Section */}
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-10">Contact Me</h2>
      <p className="text-gray-600 dark:text-gray-300 mb-4">Connect with me through the following platforms:</p>
      <div className="social-icons flex space-x-4">
        <a
          href="https://www.linkedin.com/in/chakradhar-m/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 text-2xl hover:text-blue-700"
        >
          <FaLinkedin />
        </a>
        <a
          href="https://wa.me/9705373944"
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-500 text-2xl hover:text-green-700"
        >
          <FaWhatsapp />
        </a>
        <a
          href="mailto:chakradharm2210@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-red-500 text-2xl hover:text-red-700"
        >
          <FaEnvelope />
        </a>
        <a
          href="https://www.instagram.com/___chakri_roy___?igsh=MTM5Nnk0eHlvd3pyag=="
          target="_blank"
          rel="noopener noreferrer"
          className="text-pink-500 text-2xl hover:text-pink-700"
        >
          <FaInstagram />
        </a>
        {/* Add more icons as needed */}
      </div>
    </div>
  );
};

export default ContactPage;
