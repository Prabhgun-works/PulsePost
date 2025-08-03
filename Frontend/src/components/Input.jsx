// Input.jsx
import React from 'react';

export default function Input({ label, type = 'text', name, value, onChange, placeholder }) {
  return (
    <div className="input-group">
      {label && <label htmlFor={name}>{label}</label>}
      <input
        id={name}
        type={type}
        name={name} // <-- 🔥 CRITICAL for form state updates
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
}