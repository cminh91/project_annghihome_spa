import React, { useState } from 'react';
import authService from '../../functionservice/authService';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Vui lòng nhập đầy đủ thông tin.');
      return;
    }

    try {
      const res = await axios.post('http://localhost:4000/api/auth/login', {
        email,
        password,
      });
      console.log('API Response:', res.data);

      const token = res.data.token; // Adjust if API response uses a different key
      if (token) {
        localStorage.setItem('jwt-token', token); // Consistent key: 'jwt-token'
        authService().login(token);
        navigate('/admin');
      } else {
        setError('Đăng nhập không thành công, thử lại!');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Tên người dùng hoặc mật khẩu không đúng');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <form
        onSubmit={handleLogin}
        className="p-4 border rounded shadow bg-white"
        style={{ width: 400 }}
      >
        <h2 className="mb-4 text-center">Đăng nhập Admin</h2>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            type="email"
            id="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Mật khẩu:
          </label>
          <input
            type="password"
            id="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className="alert alert-danger py-1">{error}</div>}
        <button type="submit" className="btn btn-primary w-100">
          Đăng nhập
        </button>
      </form>
    </div>
  );
}