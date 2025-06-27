import React, { useState } from 'react';
import './Marathons.css';
import RegisterMarathon from './RegisterMarathon';

const mockMarathons = [
  {
    id: 1,
    name: 'City Marathon 2024',
    location: 'Mumbai',
    categories: ['5K', '10K', '21K'],
    date: '2024-09-15',
    entryFee: 500,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 2,
    name: 'Beachside Run',
    location: 'Goa',
    categories: ['10K', '21K', '42K'],
    date: '2024-10-10',
    entryFee: 800,
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 3,
    name: 'Mountain Challenge',
    location: 'Manali',
    categories: ['5K', '15K'],
    date: '2024-11-05',
    entryFee: 600,
    image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 4,
    name: 'Desert Ultra',
    location: 'Jaisalmer',
    categories: ['10K', '21K', '50K'],
    date: '2024-12-01',
    entryFee: 1200,
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 5,
    name: 'Riverfront Sprint',
    location: 'Ahmedabad',
    categories: ['5K', '10K'],
    date: '2024-08-20',
    entryFee: 400,
    image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 6,
    name: 'Night Glow Run',
    location: 'Bangalore',
    categories: ['5K', '10K', '21K'],
    date: '2024-09-30',
    entryFee: 700,
    image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 7,
    name: 'Forest Trail Marathon',
    location: 'Pune',
    categories: ['10K', '21K', '42K'],
    date: '2024-10-22',
    entryFee: 900,
    image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3c8b?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 8,
    name: 'Capital City Run',
    location: 'Delhi',
    categories: ['5K', '10K', '21K'],
    date: '2024-11-12',
    entryFee: 650,
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 9,
    name: 'Coastal Classic',
    location: 'Chennai',
    categories: ['10K', '21K'],
    date: '2024-12-18',
    entryFee: 550,
    image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 10,
    name: 'Sunrise Run',
    location: 'Kolkata',
    categories: ['5K', '10K'],
    date: '2024-08-28',
    entryFee: 350,
    image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=400&q=80',
  },
];

// Get unique locations and categories for filters
const allLocations = Array.from(new Set(mockMarathons.map(m => m.location)));
const allCategories = Array.from(new Set(mockMarathons.flatMap(m => m.categories)));

function Marathons({ userProfile }) {
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');
  const [registerMarathon, setRegisterMarathon] = useState(null);
  const [marathons] = useState(mockMarathons);

  const filtered = marathons.filter(m => {
    const matchesSearch =
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.location.toLowerCase().includes(search.toLowerCase()) ||
      m.categories.some(cat => cat.toLowerCase().includes(search.toLowerCase()));
    const matchesLocation = location ? m.location === location : true;
    const matchesCategory = category ? m.categories.includes(category) : true;
    return matchesSearch && matchesLocation && matchesCategory;
  });

  if (registerMarathon) {
    return <RegisterMarathon marathon={registerMarathon} userProfile={userProfile} />;
  }

  return (
    <div className="marathons-root">
      <div className="marathons-header">
        <h2>Registered Marathons</h2>
        <div className="marathons-filters">
          <input
            className="marathons-search"
            type="text"
            placeholder="Search by name, location, or category..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <select
            className="marathons-filter marathons-location"
            value={location}
            onChange={e => setLocation(e.target.value)}
          >
            <option value="">All Locations</option>
            {allLocations.map(loc => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
          <select
            className="marathons-filter marathons-category"
            value={category}
            onChange={e => setCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {allCategories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="marathons-list">
        {filtered.length === 0 ? (
          <div className="marathons-empty">No marathons found.</div>
        ) : (
          filtered.map(marathon => (
            <div className="marathon-card" key={marathon.id}>
              <img className="marathon-img" src={marathon.image} alt={marathon.name + ' image'} />
              <div className="marathon-info">
                <h3>{marathon.name}</h3>
                <div><b>Location:</b> {marathon.location}</div>
                <div><b>Categories:</b> {marathon.categories.join(', ')}</div>
                <div><b>Date:</b> {marathon.date}</div>
                <div><b>Entry Fee:</b> ₹{marathon.entryFee}</div>
              </div>
              <button className="register-btn" onClick={() => setRegisterMarathon(marathon)}>Register Now</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Marathons; 