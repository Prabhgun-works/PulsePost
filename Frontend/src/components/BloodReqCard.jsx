export default function BloodRequestCard({ data, onClick }) {
  return (
    <div className="card" onClick={() => onClick(data)}>
      <img
        className="card__image"
        src={`http://localhost:3000/images/${data.image}`}
        alt={data.name}
        onError={(e) => {
          e.target.src = "http://localhost:3000/images/fallback.png";
        }}
      />
      <div className="card__body">
        <h3>{data.name}</h3>
        <p><strong>Blood Type:</strong> {data.bloodType}</p>
        <p><strong>Location:</strong> {data.location}</p>
        <p><strong>Issue:</strong> {data.issue}</p>
        <p><strong>Serious:</strong> {data.serious ? '🛑 Critical' : 'Moderate'}</p>
      </div>
    </div>
  );
}