import React, { useState } from 'react';
import authService from '../../functionservice/authService';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function LoginForm() {
  console.log('API Base URL:', process.env.REACT_APP_API_BASE_URL); // Thêm dòng này để debug
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!fullName || !password) {
      setError('Vui lòng nhập đầy đủ thông tin.');
      return;
    }

    try {
      const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/auth/admin/login`, {
        fullName,
        password,
      });


// Remove duplicate token declaration since it's declared again below
<<<<<<< HEAD

      //console.log('API Response:', res.data);
=======
>>>>>>> main

      const token = res.data.accessToken; // Thay đổi từ token sang accessToken

      if (token) {
        localStorage.setItem('jwt-token', token);
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
          <label htmlFor="fullname" className="form-label">
            Tên người dùng:
          </label>
          <input
            type="text"
            id="fullname"
            className="form-control"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
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