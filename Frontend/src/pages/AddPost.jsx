import React, { useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';

export default function AddPostForm() {
  const [form, setForm] = useState({
    name: '',
    bloodType: '',
    location: '',
    problem: '',   // <- match backend
    urgency: '',   // <- match backend
    serious: false,
  });

  const [imageFile, setImageFile] = useState(null);
  const [documentFile, setDocumentFile] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === 'image') setImageFile(files[0]);
    if (name === 'document') setDocumentFile(files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('name', form.name);
    data.append('bloodType', form.bloodType);
    data.append('location', form.location);
    data.append('problem', form.problem);
data.append('urgency', form.urgency);
    if (imageFile) data.append('image', imageFile);
    if (documentFile) data.append('document', documentFile);

    try {
      const res = await fetch('http://localhost:5000/api/posts', {
        method: 'POST',
        body: data,
      });

      const result = await res.json();
      console.log('✅ Blood request submitted:', result);
      alert('Request submitted successfully!');
    } catch (err) {
      console.error('❌ Error submitting request:', err);
      alert('Submission failed. See console.');
    }
  };

  return (
    <div className="post-form-container">
      <h2>Post a Blood Request</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <Input label="Patient Name" name="name" value={form.name} onChange={handleChange} placeholder="Full Name" />
        <Input label="Location" name="location" value={form.location} onChange={handleChange} placeholder="City" />
        <Input label="Issue Description" name="issue" value={form.issue} onChange={handleChange} placeholder="Medical emergency details" />

        {/* 📸 Image upload */}
        <div className="input-group">
          <label>Patient Image</label>
          <input type="file" name="image" accept="image/*" onChange={handleFileChange} />
        </div>

        {/* 📄 Document upload */}
        <div className="input-group">
          <label>Medical Document</label>
          <input type="file" name="document" accept=".pdf,.doc,.docx" onChange={handleFileChange} />
        </div>

      
        <div className='Dropdown'>
          <label  name="bloodType" value={form.bloodType} onChange={handleChange} placeholder="O+, AB-, etc">Blood Type</label>
          <select>
          <option>O+</option>
          <option>AB-</option>
          <option>AB+</option>
          <option>O-</option>
          <option>B+</option>
          <option>A+</option>
          <option>A-</option>
          </select>

        </div>
        <div className="checkbox-field">
          <label>
            <input type="checkbox" name="serious" checked={form.serious} onChange={handleChange} />
            Mark as serious/emergency
          </label>
        </div>
   
       

        <Button type="submit">Submit Request</Button>
      </form>
    </div>
  );
}