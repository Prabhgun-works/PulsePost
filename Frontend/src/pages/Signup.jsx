import React, { useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [bloodType, setBloodType] = useState('');
  const [password, setPassword] = useState('');

  async function handleSignup(e) {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          bloodType,
          password
        })
      });

      const data = await res.json();
      console.log('✅ Signup success:', data);
      alert('Signup successful!');
    } catch (err) {
      console.error('❌ Signup failed:', err);
      alert('Signup failed. Check console.');
    }
  }

  return (
    <div className="auth-container">
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>

        <Input
          label="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="John Doe"
        />
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
        />
        <Input
          label="Blood Type"
          value={bloodType}
          onChange={(e) => setBloodType(e.target.value)}
          placeholder="O+, A-, AB+, etc"
        />
        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••"
        />
        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
}