import React, { useEffect, useState } from 'react';
import BloodRequestCard from '../components/BloodReqCard';
export default function Feed() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    // Mock fetch — later hook to backend
    const dummy = [
      {
        id: 1,
        name: 'Ankit Sharma',
        bloodType: 'O+',
        location: 'Delhi',
        issue: 'Accident - Internal Bleeding',
        imageUrl: '/images/patient1.jpg',
        documents: ['med1.pdf'],
        serious: true,
      },
      {
        id: 2,
        name: 'Priya Sinha',
        bloodType: 'A-',
        location: 'Mumbai',
        issue: 'Surgery - Liver Transplant',
        imageUrl: '/images/patient2.jpg',
        documents: ['med2.pdf'],
        serious: false,
      },
    ];
    setRequests(dummy);
  }, []);

  return (
    <div className="feed">
      <h2>Live Blood Requests</h2>
      <div className="feed__grid">
        {requests.map(req => (
          <BloodRequestCard key={req.id} data={req} />
        ))}
      </div>
    </div>
  );
}