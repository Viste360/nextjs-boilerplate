"use client";

import { useState } from "react";

export default function Form() {
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        features: checked
          ? [...prev.features, value]
          : prev.features.filter((item) => item !== value),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbyVSBZ5FjbKcAOEq_hTmhQgcq9N1W_Sn6K8vk2a1Jn5ncXdyOz3ZjZkg3QFmfRt9akK6A/exec",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      }
    );
    const result = await response.json();
    if (result.status === "success") {
      alert("Thank you for registering! 🎉");
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
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">
        📋 Register Your Rental Business
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="whatsapp"
          placeholder="WhatsApp Number"
          value={formData.whatsapp}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="location"
          placeholder="City & Country"
          value={formData.location}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <select
          name="properties"
          value={formData.properties}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="">Number of Properties</option>
          <option value="1-5">1-5</option>
          <option value="6-10">6-10</option>
          <option value="11-20">11-20</option>
          <option value="21-50">21-50</option>
          <option value="51+">51+</option>
        </select>

        <select
          name="channelManager"
          value={formData.channelManager}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="">Channel Manager</option>
          <option value="Icnea">Icnea</option>
          <option value="Guesty">Guesty</option>
          <option value="Smoobu">Smoobu</option>
          <option value="Hostaway">Hostaway</option>
          <option value="Rentals United">Rentals United</option>
          <option value="Other">Other (Specify Below)</option>
        </select>
        <input
          type="text"
          name="otherCM"
          placeholder="Other Channel Manager (If applicable)"
          value={formData.otherCM}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <label>
          <input
            type="checkbox"
            name="features"
            value="Check-in & Check-out WhatsApp"
            onChange={handleChange}
          />
          Check-in & Check-out Automation
        </label>
        <label>
          <input
            type="checkbox"
            name="features"
            value="AI FAQ Messaging"
            onChange={handleChange}
          />
          AI FAQ Messaging
        </label>
        <label>
          <input
            type="checkbox"
            name="features"
            value="Troubleshooting"
            onChange={handleChange}
          />
          Troubleshooting Support
        </label>

        <select
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="">When do you want to start?</option>
          <option value="Immediately">Immediately</option>
          <option value="1 Month">Within 1 Month</option>
          <option value="Exploring">Just Exploring</option>
        </select>

        <textarea
          name="comments"
          placeholder="Additional Comments"
          value={formData.comments}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        ></textarea>

        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
}
