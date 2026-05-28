const BASE_URL = 'https://dawaya-back-end.vercel.app';

// Helper to get auth headers
function getHeaders() {
  const headers = {
    'Content-Type': 'application/json',
  };
  const token = localStorage.getItem('token');
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

export const api = {
  // Register a new user
  async register(username, email, password, phone, gender) {
    const response = await fetch(`${BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username,
        email,
        password,
        phone: String(phone),
        gender
      }),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'حدث خطأ أثناء إنشاء الحساب. يرجى المحاولة مرة أخرى.');
    }
    return response.json();
  },

  // Verify email OTP
  async verify(email, otp) {
    const response = await fetch(`${BASE_URL}/api/auth/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, otp: String(otp) }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'رمز التحقق غير صحيح أو انتهت صلاحيته.');
    }
    return response.json();
  },

  // Login
  async login(email, password) {
    const response = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'البريد الإلكتروني أو كلمة المرور غير صحيحة.');
    }

    const data = await response.json();
    // Support common response structures like { token }, { accessToken }, { data: { token } }
    const token = data.token || data.accessToken || (data.data && (data.data.token || data.data.accessToken));
    
    if (token) {
      localStorage.setItem('token', token);
    } else {
      throw new Error('لم يتم استلام رمز التفويض من الخادم.');
    }
    return data;
  },

  // Get Profile
  async getProfile() {
    const headers = getHeaders();
    console.log('Fetching profile with headers:', headers);

    const response = await fetch(`${BASE_URL}/api/user/profile`, {
      method: 'GET',
      headers: headers,
    });

    if (!response.ok) {
      console.warn(`Profile fetch failed with status: ${response.status}`);
      let errorText = '';
      let errorData = {};
      try {
        errorText = await response.text();
        errorData = JSON.parse(errorText);
      } catch (e) {
        errorData = { message: errorText || `HTTP Error ${response.status}` };
      }
      
      console.error('Detailed Server Error payload:', errorData);

      if (response.status === 401) {
        localStorage.removeItem('token');
        throw new Error('انتهت صلاحية الجلسة، يرجى تسجيل الدخول مرة أخرى.');
      }
      throw new Error(errorData.message || 'فشل في تحميل بيانات الملف الشخصي من الخادم السحابي.');
    }

    return response.json();
  },

  // Update Profile
  async updateProfile(profileData) {
    const response = await fetch(`${BASE_URL}/api/user/profile`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify({
        username: profileData.username,
        phone: String(profileData.phone),
        age: Number(profileData.age),
        gender: profileData.gender
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'فشل في تحديث بيانات الملف الشخصي.');
    }

    return response.json();
  },

  // Change Password
  async changePassword(oldPassword, newPassword) {
    const response = await fetch(`${BASE_URL}/api/user/changepassword`, {
      method: 'PATCH',
      headers: getHeaders(),
      body: JSON.stringify({ oldPassword, newPassword }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'فشل في تغيير كلمة المرور. يرجى التحقق من كلمة المرور الحالية.');
    }

    return response.json();
  },

  // Logout
  logout() {
    localStorage.removeItem('token');
  },

  // Check if user is logged in
  isLoggedIn() {
    return !!localStorage.getItem('token');
  }
};
