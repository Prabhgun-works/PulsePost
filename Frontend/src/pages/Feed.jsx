import React, { useEffect, useState } from 'react';
import BloodRequestCard from '../components/BloodReqCard';
import Modal from '../components/Modal';

export default function Feed() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await fetch('http://localhost:3000/posts/all');
        const data = await res.json();
        setRequests(data);
      } catch (err) {
        console.error("❌ Failed to fetch blood requests", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const openModal = (data) => {
    setSelectedData(data);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedData(null);
  };

  if (loading) return <p>Loading blood requests...</p>;

  return (
    <div className="feed">
      <h2>Live Blood Requests</h2>
      <div className="feed__grid">
        {requests.map(req => (
          <BloodRequestCard key={req.id} data={req} onClick={openModal} />
        ))}
      </div>

      <Modal open={modalOpen} onClose={closeModal} data={selectedData} />
        </div>
);
}