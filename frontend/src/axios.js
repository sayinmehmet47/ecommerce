import axios from 'axios';

const TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZGMzMGMwYTVhNzljODczYjEzOTAyOSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1ODU5NzU5NywiZXhwIjoxNjU4NjAxMTk3fQ.QNNoiwx2TLYduxx2IQSiWGB9oYZKSPAXjAdaHGHRPAM';

export const userRequest = axios.create({
  baseURL: 'http://localhost:4000/api/',
  timeout: 1000,
  header: { token: `Bearer ${TOKEN}` },
});

export const publicRequest = axios.create({
  baseURL: 'http://localhost:4000/api/',
});

// http://localhost:4000/api/products
