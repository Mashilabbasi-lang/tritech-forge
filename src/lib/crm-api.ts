const BASE = import.meta.env.VITE_CRM_API_URL || 'http://localhost:3001';

const getToken = () => localStorage.getItem('crm_token') || '';

const req = async (method: string, path: string, body?: any) => {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`,
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (res.status === 401) {
    // Token expired or invalid — clear and redirect
    localStorage.removeItem('crm_token');
    localStorage.removeItem('crm_user');
    window.location.href = '/admin/login';
    return { success: false, error: 'Session expired' };
  }
  return res.json();
};

export const crmApi = {
  // Auth
  login: (username: string, password: string) =>
    fetch(`${BASE}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    }).then(r => r.json()),

  verify: () => req('GET', '/api/auth/verify'),
  changePassword: (currentPassword: string, newPassword: string) =>
    req('POST', '/api/auth/change-password', { currentPassword, newPassword }),

  // Companies (superadmin only)
  getCompanies: () => req('GET', '/api/companies'),
  createCompany: (data: any) => req('POST', '/api/companies', data),
  updateCompany: (id: string, data: any) => req('PUT', `/api/companies/${id}`, data),
  deleteCompany: (id: string) => req('DELETE', `/api/companies/${id}`),
  getCompanyCredentials: (id: string) => req('GET', `/api/companies/${id}/credentials`),
  resetCompanyPassword: (id: string) => req('POST', `/api/companies/${id}/reset-password`),

  // Global stats
  getStats: () => req('GET', '/api/stats'),

  // Bookings (superadmin + company user)
  getCompanyBookings: (companyId: string, params?: any) => {
    const qs = params ? '?' + new URLSearchParams(params).toString() : '';
    return req('GET', `/api/companies/${companyId}/bookings${qs}`);
  },
  createBooking: (companyId: string, data: any) => req('POST', `/api/companies/${companyId}/bookings`, data),
  updateBooking: (companyId: string, id: string, data: any) => req('PUT', `/api/companies/${companyId}/bookings/${id}`, data),
  deleteBooking: (companyId: string, id: string) => req('DELETE', `/api/companies/${companyId}/bookings/${id}`),
  getCompanyActivity: (companyId: string) => req('GET', `/api/companies/${companyId}/activity`),
  getCompanyStats: (companyId: string) => req('GET', `/api/companies/${companyId}/stats`),
};

export const saveSession = (token: string, user: any) => {
  localStorage.setItem('crm_token', token);
  localStorage.setItem('crm_user', JSON.stringify(user));
};

export const getSession = () => {
  const user = localStorage.getItem('crm_user');
  return { token: getToken(), user: user ? JSON.parse(user) : null };
};

export const isLoggedIn = () => !!getToken();

export const logout = () => {
  localStorage.removeItem('crm_token');
  localStorage.removeItem('crm_user');
};
