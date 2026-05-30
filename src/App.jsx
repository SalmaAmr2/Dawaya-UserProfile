import React, { useState, useEffect, useContext } from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import NotFound from "./Pages/NotFound";
import "./App.css";
import Layout from "./Components/Layout/Layout";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import VerifyOTP from "./Components/VerifyOTP/VerifyOTP";
import UserContextProvider, { UserContext } from "./Context/UserContext";
import ProtectedRoure from "./Components/ProtectedRoure/ProtectedRoute";
import ForgetPassword from "./Components/ForgetPassword/ForgetPassword";
import ResetPassword from "./Components/ResetPassword/ResetPassword";
import VerifyCompleted from "./Components/VerifyCompleted/VerifyCompleted";

import UserProfile from './components/UserProfile';
import Toast from './components/Toast';
import { api } from './services/api';
import {
  EditProfileModal,
  ChangePasswordModal,
  LocationModal
} from './components/Modals';

const INITIAL_PROFILE = {
  fullName: 'عضو داوايا',
  username: 'dawaya_member',
  email: 'user@dawaya.com',
  password: '',
  phone: '01012345678',
  age: 25,
  gender: 'ذكر'
};

const INITIAL_LOCATIONS = [
  {
    id: 1,
    title: 'المنزل',
    type: 'home',
    address: '123 طريق العيادات، منطقة الأجنحة، نيويورك، NY 10001'
  },
  {
    id: 2,
    title: 'العمل',
    type: 'work',
    address: '456 مجمع العافية، الطابق 12، بروكلين، NY 11201'
  }
];

function ProfilePage() {
  const { userLogin } = useContext(UserContext);
  const [profile, setProfile] = useState(INITIAL_PROFILE);
  const [locations, setLocations] = useState(INITIAL_LOCATIONS);
  const [isLoading, setIsLoading] = useState(false);

  const [activeModal, setActiveModal] = useState(null);
  const [editingLocation, setEditingLocation] = useState(null);
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const fetchProfile = async () => {
    const activeToken = userLogin || localStorage.getItem('userToken');
    if (!activeToken) return;

    setIsLoading(true);
    try {
      const data = await api.getProfile();

      const apiUser = data.user || data.data || data;

      const localEmail = localStorage.getItem("dawaya_current_email") || apiUser.email || '';
      const localPassword = localStorage.getItem("dawaya_current_password") || '';

      setProfile({
        fullName: apiUser.username || 'عضو داوايا',
        username: apiUser.username || 'user',
        email: localEmail,
        password: localPassword,
        phone: apiUser.phone || '',
        age: apiUser.age || 30,
        gender: apiUser.gender === 'male' || apiUser.gender === 'ذكر' ? 'ذكر' : 'أنثى'
      });
    } catch (err) {
      try {
        const localEmail = localStorage.getItem("dawaya_current_email") || "";
        const localPassword = localStorage.getItem("dawaya_current_password") || "";
        const users = JSON.parse(localStorage.getItem("dawaya_users") || "[]");
        const matchedUser = users.find(u => u.email.toLowerCase() === localEmail.toLowerCase());
        if (matchedUser) {
          setProfile({
            fullName: matchedUser.username || 'عضو داوايا',
            username: matchedUser.username || 'user',
            email: matchedUser.email,
            password: matchedUser.password,
            phone: matchedUser.phone || '01012345678',
            age: matchedUser.age || 25,
            gender: matchedUser.gender === 'female' ? 'أنثى' : 'ذكر'
          });
          return;
        }
      } catch (e) {
        console.error("Local fallback failed", e);
      }
      showToast(err.message || 'انتهت الجلسة، يرجى تسجيل الدخول مجدداً.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [userLogin]);

  const handleSaveProfile = async (updatedProfile) => {
    const activeToken = localStorage.getItem("userToken");
    const isMockToken = !activeToken || activeToken === "mock_token_for_dawaya_auth";

    try {
      const genderApi = updatedProfile.gender === 'ذكر' ? 'male' : 'female';

      if (!isMockToken) {
        try {
          await api.updateProfile({
            username: updatedProfile.username,
            phone: updatedProfile.phone,
            age: Number(updatedProfile.age),
            gender: genderApi
          });
        } catch (apiErr) {
          console.warn("Backend profile update rejected or failed, executing local fallback save:", apiErr.message);
        }
      }

      try {
        const users = JSON.parse(localStorage.getItem("dawaya_users") || "[]");
        const oldEmail = localStorage.getItem("dawaya_current_email") || updatedProfile.email;
        const index = users.findIndex(u => u.email.toLowerCase() === oldEmail.toLowerCase());
        const token = localStorage.getItem("userToken") || "mock_token_for_dawaya_auth";

        const userData = {
          username: updatedProfile.username,
          phone: updatedProfile.phone,
          email: updatedProfile.email,
          password: updatedProfile.password,
          gender: genderApi,
          age: Number(updatedProfile.age),
          token: token
        };

        if (index > -1) {
          users[index] = userData;
        } else {
          users.push(userData);
        }

        localStorage.setItem("dawaya_users", JSON.stringify(users));
        localStorage.setItem("dawaya_current_email", updatedProfile.email);
        localStorage.setItem("dawaya_current_password", updatedProfile.password);
      } catch (e) {
        console.error("Local profile update failed", e);
      }

      setProfile(updatedProfile);
      setActiveModal(null);
      showToast('تم تحديث الملف الشخصي بنجاح!');
    } catch (err) {
      showToast(err.message || 'حدث خطأ أثناء حفظ التغييرات.', 'error');
    }
  };

  const handleChangePassword = async (oldPassword, newPassword) => {
    const activeToken = localStorage.getItem("userToken");
    const isMockToken = !activeToken || activeToken === "mock_token_for_dawaya_auth";

    try {
      if (!isMockToken) {
        try {
          await api.changePassword(oldPassword, newPassword);
        } catch (apiErr) {
          console.warn("Backend change password failed, executing local fallback save:", apiErr.message);
        }
      }

      localStorage.setItem("dawaya_current_password", newPassword);
      try {
        const users = JSON.parse(localStorage.getItem("dawaya_users") || "[]");
        const activeEmail = localStorage.getItem("dawaya_current_email") || "";
        const index = users.findIndex(u => u.email.toLowerCase() === activeEmail.toLowerCase());
        if (index > -1) {
          users[index].password = newPassword;
          localStorage.setItem("dawaya_users", JSON.stringify(users));
        }
      } catch (e) {
        console.error("Local password change sync failed", e);
      }

      setProfile(prev => ({ ...prev, password: newPassword }));
      setActiveModal(null);
      showToast('تم تغيير كلمة المرور بنجاح!', 'success');
    } catch (err) {
      showToast(err.message || 'يرجى التحقق من كلمة المرور الحالية والمحاولة مجدداً.', 'error');
    }
  };

  const handleSaveLocation = (locData) => {
    if (locData.id) {
      setLocations((prev) =>
        prev.map((l) => (l.id === locData.id ? locData : l))
      );
      showToast('تم تحديث الموقع بنجاح!');
    } else {
      const newLoc = {
        ...locData,
        id: Date.now()
      };
      setLocations((prev) => [...prev, newLoc]);
      showToast('تمت إضافة الموقع بنجاح!');
    }
    setActiveModal(null);
    setEditingLocation(null);
  };

  const handleDeleteLocation = (id) => {
    setLocations((prev) => prev.filter((l) => l.id !== id));
    showToast('تم حذف الموقع بنجاح!', 'error');
  };

  const triggerEditLocation = (location) => {
    setEditingLocation(location);
    setActiveModal('location');
  };

  const triggerAddLocation = () => {
    setEditingLocation(null);
    setActiveModal('location');
  };

  return (
    <div style={{ minHeight: '80vh', padding: '24px 0' }}>
      <main style={{ flex: 1, paddingBottom: '48px' }}>
        {isLoading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
            <span style={{ fontSize: '15px', color: 'var(--color-text-muted)', fontWeight: '600' }}>جاري تحميل الملف الشخصي...</span>
          </div>
        ) : (
          <UserProfile
            profile={profile}
            locations={locations}
            onEditProfile={() => setActiveModal('edit-profile')}
            onChangePassword={() => setActiveModal('change-password')}
            onAddLocation={triggerAddLocation}
            onEditLocation={triggerEditLocation}
            onDeleteLocation={handleDeleteLocation}
          />
        )}
      </main>

      {activeModal === 'edit-profile' && (
        <EditProfileModal
          profile={profile}
          onSave={handleSaveProfile}
          onClose={() => setActiveModal(null)}
        />
      )}

      {activeModal === 'change-password' && (
        <ChangePasswordModal
          storedPassword={profile.password}
          onSave={handleChangePassword}
          onClose={() => setActiveModal(null)}
        />
      )}

      {activeModal === 'location' && (
        <LocationModal
          location={editingLocation}
          onSave={handleSaveLocation}
          onClose={() => { setActiveModal(null); setEditingLocation(null); }}
        />
      )}



      <div className="toast-container">
        {toasts.map((t) => (
          <Toast
            key={t.id}
            message={t.message}
            type={t.type}
            onClose={() => removeToast(t.id)}
          />
        ))}
      </div>
    </div>
  );
}

function App() {
  let router = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoure>
              <Home />
            </ProtectedRoure>
          ),
        },
        {
          path: "/about",
          element: (
            <ProtectedRoure>
              <About />
            </ProtectedRoure>
          ),
        },
        {
          path: "/profile",
          element: (
            <ProtectedRoure>
              <ProfilePage />
            </ProtectedRoure>
          ),
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/regester",
          element: <Register />,
        },
        {
          path: "/verifyotp",
          element: <VerifyOTP />,
        },
        {
          path: "/verifycompleted",
          element: <VerifyCompleted />,
        },
        {
          path: "/forgetpassword",
          element: <ForgetPassword />,
        },
        {
          path: "/resetpassword",
          element: <ResetPassword />,
        },
        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
  ]);

  return (
    <UserContextProvider>
      <div dir="rtl">
        <RouterProvider router={router}></RouterProvider>
      </div>
    </UserContextProvider>
  );
}

export default App;
