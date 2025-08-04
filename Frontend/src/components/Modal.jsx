import React from 'react';

export default function Modal({ open, onClose, data }) {
  if (!open || !data) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="modal-close" onClick={onClose}>×</button>
        <img
          src={`http://localhost:3000/images/${data.image}`}
          alt={data.name}
          className="modal__image"
          onError={(e) => {
            e.target.src = "http://localhost:3000/images/fallback.png";
          }}
        />
        <div className="modal__content">
          <h2>{data.name}</h2>
        <p><strong>Blood Type:</strong> {data.bloodType}</p>
        <p><strong>Location:</strong> {data.location}</p>
        <p><strong>Hospital:</strong> {data.hospital}</p>
        <p><strong>Issue:</strong> {data.issue}</p>
        <p><strong>Time:</strong> {data.timeAgo} ago</p>
        <p><strong>Serious:</strong> {data.serious ? '🛑 Critical' : 'Moderate'}</p>

          <button
  className="modal__btn"
  onClick={() => {
    if (window.innerWidth < 768) {
      window.location.href = `tel:${data.contact}`;
    } else {
      navigator.clipboard.writeText(data.contact);
      alert("📋 Contact number copied to clipboard!");
    }
  }}
>
  📞 Contact Now
</button>
        </div>
      </div>
    </div>
  );
}