"use client"; // Required for Next.js Client Component

import { useState } from "react";

export default function HostRegistration() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    whatsapp: "",
    location: "",
    properties: "",
    channelManager: "",
    otherCM: "",
    features: [] as string[],
    startDate: "",
    demoCall: "",
    comments: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;

    // Handle checkboxes separately
    if (type === "checkbox") {
      const checkbox = e.target as HTMLInputElement;
      setFormData((prev) => ({
        ...prev,
        features: checkbox.checked ? [...prev.features, value] : prev.features.filter((f) => f !== value),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbzg92d2dUIIX1IhLtQgFCM-qjZTZc9elqamgaGUSKKuMpOFMQCe6hAh0wt4GkmKx0g/exec", // Replace this with your Google Script URL
      {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      }
    );

    if (response.ok) {
      setMessage("✅ Thank you! Your response has been submitted.");
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
      setMessage("❌ Something went wrong. Please try again.");
    }

    setIsSubmitting(false);
  };

  return (
    <div className="container">
      <h1>🏡 Host Registration</h1>
      <form onSubmit={handleSubmit}>
        <label>Name: <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required /></label>
        <label>Email: <input type="email" name="email" value={formData.email} onChange={handleChange} required /></label>
        <label>WhatsApp: <input type="text" name="whatsapp" value={formData.whatsapp} onChange={handleChange} required /></label>
        <label>Location: <input type="text" name="location" value={formData.location} onChange={handleChange} required /></label>
        
        <label>Number of Properties:
          <select name="properties" value={formData.properties} onChange={handleChange}>
            <option value="">Select...</option>
            <option value="1-5">1-5</option>
            <option value="6-10">6-10</option>
            <option value="11-20">11-20</option>
            <option value="21-50">21-50</option>
            <option value="51+">51+</option>
          </select>
        </label>

        <label>Channel Manager:
          <select name="channelManager" value={formData.channelManager} onChange={handleChange}>
            <option value="">Select...</option>
            <option value="Icnea">Icnea</option>
            <option value="Guesty">Guesty</option>
            <option value="Smoobu">Smoobu</option>
            <option value="Hostaway">Hostaway</option>
            <option value="Rentals United">Rentals United</option>
            <option value="Other">Other</option>
          </select>
        </label>

        <label>Other Channel Manager: <input type="text" name="otherCM" value={formData.otherCM} onChange={handleChange} /></label>

        <fieldset>
          <legend>What features interest you?</legend>
          <label><input type="checkbox" name="features" value="Check-in & Check-out" onChange={handleChange} /> Check-in & Check-out Automation</label>
          <label><input type="checkbox" name="features" value="AI FAQ Messaging" onChange={handleChange} /> AI FAQ Messaging</label>
          <label><input type="checkbox" name="features" value="Troubleshooting" onChange={handleChange} /> Troubleshooting & Support</label>
          <label><input type="checkbox" name="features" value="Upselling" onChange={handleChange} /> Upselling (Late Checkout, Transport, etc.)</label>
        </fieldset>

        <label>Start Date:
          <select name="startDate" value={formData.startDate} onChange={handleChange}>
            <option value="">Select...</option>
            <option value="Immediately">Immediately</option>
            <option value="In a Month">In a Month</option>
            <option value="Just Exploring">Just Exploring</option>
          </select>
        </label>

        <label>Demo Call:
          <select name="demoCall" value={formData.demoCall} onChange={handleChange}>
            <option value="">Select...</option>
            <option value="Yes">Yes, send me the link</option>
            <option value="No">No, I'll explore on my own</option>
          </select>
        </label>

        <label>Comments: <textarea name="comments" value={formData.comments} onChange={handleChange} /></label>

        <button type="submit" disabled={isSubmitting}>{isSubmitting ? "Submitting..." : "Submit"}</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}
