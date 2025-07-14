import React, { useState } from "react";

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = e => {
    e.preventDefault();
    setSubmitted(true); // In a real app, send to backend or email service
  };

  return (
    <main className="p-8 max-w-3xl mx-auto">
      <head>
        <title>Contact | Kenya Money Market Funds Dashboard</title>
        <meta name="description" content="Contact the Kenya Money Market Funds Dashboard team for support, feedback, or partnership inquiries." />
        <meta name="keywords" content="contact, Kenya money market funds, support, feedback, partnership, dashboard" />
        <link rel="canonical" href="/contact" />
      </head>
      <article>
        <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
        <p className="mb-6">Have a question, suggestion, or partnership inquiry? Fill out the form below or email us at <a href="mailto:info@kenyammfdashboard.com" className="text-blue-600 hover:underline">info@kenyammfdashboard.com</a>.</p>
        {submitted ? (
          <div className="bg-green-100 text-green-800 p-4 rounded mb-6">Thank you for reaching out! We’ll get back to you soon.</div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-6 mb-8"> {/* Increased gap for paragraph breaks */}
            <input name="name" type="text" placeholder="Your Name" value={form.name} onChange={handleChange} className="border p-2 rounded" required />
            <input name="email" type="email" placeholder="Your Email" value={form.email} onChange={handleChange} className="border p-2 rounded" required />
            <textarea name="message" placeholder="Your Message" value={form.message} onChange={handleChange} className="border p-2 rounded" rows={5} required />
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Send Message</button>
          </form>
        )}
      <nav className="mt-8">
        <a href="/about" className="text-blue-600 hover:underline mr-4">About</a>
        <a href="/" className="text-blue-600 hover:underline mr-4">Dashboard</a>
        <a href="/faq" className="text-blue-600 hover:underline mr-4">FAQ</a>
        <a href="/contact" className="text-blue-600 hover:underline">Contact</a>
      </nav>
      </article>
    </main>
  );
};

export default Contact; 