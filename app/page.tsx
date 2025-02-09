"use client"; // Required for handling form submission in Next.js 13+

import { useState } from "react";

export default function Home() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    whatsapp: "",
    location: "",
    properties: "",
    channelManager: "",
    otherCM: "",
    features: [],
    startDate: "",
    demoCall: "",
    comments: "",
  });

  const handleChange = (e: unknown) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData({
        ...formData,
        features: checked
          ? [...formData.features, value]
          : formData.features.filter((f) => f !== value),
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: unknown) => {
    e.preventDefault();
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbzg92d2dUIIX1IhLtQgFCM-qjZTZc9elqamgaGUSKKuMpOFMQCe6hAh0wt4GkmKx0g/exec", // Replace this with your actual script URL
      {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      }
    );

    if (response.ok) {
      alert("Thank you! Your response has been submitted.");
      setFormData({
        fullName: "",
        email: "",
        whatsapp: "",
        location: "",
        properties: "",
        channelManager: "",
        otherCM: "",
        features: [],
        startDate: "",
        demoCall: "",
        comments: "",
      });
    } else {
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div>
      <h1>Register as a Host</h1>
      <form onSubmit={handleSubmit}>
        <label>Name: <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required /></label><br/>
        <label>Email: <input type="email" name="email" value={formData.email} onChange={handleChange} required /></label><br/>
        <label>WhatsApp: <input type="text" name="whatsapp" value={formData.whatsapp} onChange={handleChange} required /></label><br/>
        <label>Location: <input type="text" name="location" value={formData.location} onChange={handleChange} required /></label><br/>
        <label>Number of Properties:
          <select name="properties" value={formData.properties} onChange={handleChange}>
            <option value="1-5">1-5</option>
            <option value="6-10">6-10</option>
            <option value="11-20">11-20</option>
            <option value="21-50">21-50</option>
            <option value="51+">51+</option>
          </select>
        </label><br/>
        <label>Channel Manager:
          <select name="channelManager" value={formData.channelManager} onChange={handleChange}>
            <option value="Icnea">Icnea</option>
            <option value="Guesty">Guesty</option>
            <option value="Smoobu">Smoobu</option>
            <option value="Hostaway">Hostaway</option>
            <option value="Rentals United">Rentals United</option>
            <option value="Other">Other</option>
          </select>
        </label><br/>
        <label>Other (If applicable): <input type="text" name="otherCM" value={formData.otherCM} onChange={handleChange} /></label><br/>
        <label>Start Date:
          <select name="startDate" value={formData.startDate} onChange={handleChange}>
            <option value="Immediately">Immediately</option>
            <option value="In a Month">In a Month</option>
            <option value="Just Exploring">Just Exploring</option>
          </select>
        </label><br/>
        <label>Demo Call:
          <select name="demoCall" value={formData.demoCall} onChange={handleChange}>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </label><br/>
        <label>Comments: <textarea name="comments" value={formData.comments} onChange={handleChange} /></label><br/>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
