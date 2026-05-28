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

// Profile components and services
import UserProfile from './components/UserProfile';
import Toast from './components/Toast';
import { api } from './services/api';
import { 
  EditProfileModal, 
  ChangePasswordModal, 
  LocationModal, 
  SupportModal 
} from './components/Modals';

// Default initial state for fallback/new users
const INITIAL_PROFILE = {
  fullName: 'عضو داوايا',
  username: 'dawaya_member',
  email: 'user@dawaya.com',
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

// 1. User Profile Page Component
function ProfilePage() {
  const { userLogin } = useContext(UserContext);
  const [profile, setProfile] = useState(INITIAL_PROFILE);
  const [locations, setLocations] = useState(INITIAL_LOCATIONS);
  const [isLoading, setIsLoading] = useState(false);
  
  // Modals management
  const [activeModal, setActiveModal] = useState(null); // 'edit-profile' | 'change-password' | 'location' | 'support'
  const [editingLocation, setEditingLocation] = useState(null); // Location object being edited, if any

  // Toasts management
  const [toasts, setToasts] = useState([]);

  // Trigger custom toast alert
  const showToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Fetch active user profile from live Vercel API
  const fetchProfile = async () => {
    const activeToken = userLogin || localStorage.getItem('userToken');
    if (!activeToken) return;
    
    setIsLoading(true);
    try {
      const data = await api.getProfile();
      
      const apiUser = data.user || data.data || data;

      setProfile({
        fullName: apiUser.username || 'عضو داوايا',
        username: apiUser.username || 'user',
        email: apiUser.email || '',
        phone: apiUser.phone || '',
        age: apiUser.age || 30,
        gender: apiUser.gender === 'male' || apiUser.gender === 'ذكر' ? 'ذكر' : 'أنثى'
      });
    } catch (err) {
      showToast(err.message || 'انتهت الجلسة، يرجى تسجيل الدخول مجدداً.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch on mount or when token updates
  useEffect(() => {
    fetchProfile();
  }, [userLogin]);

  // Profile Save handler
  const handleSaveProfile = async (updatedProfile) => {
    try {
      const genderApi = updatedProfile.gender === 'ذكر' ? 'male' : 'female';
      await api.updateProfile({
        username: updatedProfile.username,
        phone: updatedProfile.phone,
        age: Number(updatedProfile.age),
        gender: genderApi
      });
      
      setProfile(updatedProfile);
      setActiveModal(null);
      showToast('تم تحديث الملف الشخصي بنجاح في قاعدة البيانات!');
    } catch (err) {
      showToast(err.message || 'حدث خطأ أثناء حفظ التغييرات.', 'error');
    }
  };

  // Change Password handler
  const handleChangePassword = async (oldPassword, newPassword) => {
    try {
      await api.changePassword(oldPassword, newPassword);
      setActiveModal(null);
      showToast('تم تغيير كلمة المرور بنجاح في قاعدة البيانات!', 'success');
    } catch (err) {
      showToast(err.message || 'يرجى التحقق من كلمة المرور الحالية والمحاولة مجدداً.', 'error');
    }
  };

  // Location Save handler (Create / Update)
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

  // Delete Location handler
  const handleDeleteLocation = (id) => {
    setLocations((prev) => prev.filter((l) => l.id !== id));
    showToast('تم حذف الموقع بنجاح!', 'error');
  };

  // Open location modal for editing
  const triggerEditLocation = (location) => {
    setEditingLocation(location);
    setActiveModal('location');
  };

  // Open location modal for creating
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
            onOpenSupport={() => setActiveModal('support')}
          />
        )}
      </main>

      {/* Modular Interactive Modals */}
      {activeModal === 'edit-profile' && (
        <EditProfileModal 
          profile={profile} 
          onSave={handleSaveProfile} 
          onClose={() => setActiveModal(null)} 
        />
      )}

      {activeModal === 'change-password' && (
        <ChangePasswordModal 
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

      {activeModal === 'support' && (
        <SupportModal 
          profileName={profile.fullName}
          onClose={() => setActiveModal(null)} 
        />
      )}

      {/* Elegant Alert Toasts */}
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

// 2. Central Router & App Component
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
          element: <VerifyOTP />,
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
