import React from 'react';

export default function BloodRequestCard({ data }) {
  return (
    <div className="card">
      <img src={data.imageUrl} alt="Patient" className="card__image" />
      <div className="card__body">
        <h3>{data.name}</h3>
        <p><strong>Blood Type:</strong> {data.bloodType}</p>
        <p><strong>Location:</strong> {data.location}</p>
        <p><strong>Issue:</strong> {data.issue}</p>
        <p><strong>Serious:</strong> {data.serious ? '🛑 Critical' : 'Moderate'}</p>
        <a href={`/${data.documents[0]}`} download className="card__doc">Download Docs</a>
      </div>
    </div>
  );
}