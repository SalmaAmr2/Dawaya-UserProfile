import React, { useState, useEffect } from 'react';
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
  fullName: 'أليكس جونسون',
  username: 'alexjohnson_88',
  email: 'alex.j@healthcare.com',
  phone: '+1 (555) 012-3456',
  age: 32,
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

const INITIAL_NOTIFICATIONS = [
  {
    id: 1,
    type: 'appointment',
    text: 'موعدك القادم مع د. أحمد علي غداً الساعة 10:00 صباحاً.',
    time: 'منذ ساعتين',
    read: false
  },
  {
    id: 2,
    type: 'prescription',
    text: 'تم تحديث تقرير وصفتك الطبية لـ "أوميبرازول 20 ملغ".',
    time: 'منذ 5 ساعات',
    read: false
  },
  {
    id: 3,
    type: 'appointment',
    text: 'تم تأكيد حجز موعدك لعيادة الأسنان يوم الخميس 28 مايو.',
    time: 'أمس',
    read: true
  }
];

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [profile, setProfile] = useState(INITIAL_PROFILE);
  const [locations, setLocations] = useState(INITIAL_LOCATIONS);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
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
    if (!localStorage.getItem('token')) return;
    setIsLoading(true);
    try {
      const data = await api.getProfile();
      
      // Map API fields (username, email, phone, age, gender) to local structure
      // Support nested payload formats e.g. { data: { ... } } or { user: { ... } }
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
      api.logout();
      setToken('');
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch on mount or when token updates
  useEffect(() => {
    if (token) {
      fetchProfile();
    }
  }, [token]);

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
      // Edit mode
      setLocations((prev) =>
        prev.map((l) => (l.id === locData.id ? locData : l))
      );
      showToast('تم تحديث الموقع بنجاح!');
    } else {
      // Create mode
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

  // Clear unread notifications count when opening panel
  const clearNotificationsCount = () => {
    setNotifications((prev) =>
      prev.map((n) => ({ ...n, read: true }))
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      
      {/* 1. Header (Standalone / Local Mode) */}
      <header style={{
        backgroundColor: '#ffffff',
        borderBottom: '1px solid var(--color-border)',
        padding: '16px 0',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
      }}>
        <div className="container" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h1 style={{ color: 'var(--color-brand)', fontSize: '24px', fontWeight: '800', margin: 0 }}>DAWAYA</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{
              fontSize: '12px',
              backgroundColor: 'var(--color-primary-light)',
              color: 'var(--color-brand)',
              padding: '6px 12px',
              borderRadius: '9999px',
              fontWeight: '700'
            }}>
              {token ? 'متصل بالسحابة 🌐' : 'عرض محلي 💻'}
            </span>
            {token && (
              <button 
                onClick={() => {
                  api.logout();
                  setToken('');
                  showToast('تم تسجيل الخروج بنجاح.', 'success');
                }}
                className="btn btn-secondary"
                style={{ padding: '6px 12px', fontSize: '12px', border: '1px solid var(--color-border)' }}
              >
                تسجيل الخروج
              </button>
            )}
          </div>
        </div>
      </header>

      {/* 2. Main Page Content (User Profile) */}
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

      {/* 3. Footer */}
      <footer style={{
        backgroundColor: '#ffffff',
        borderTop: '1px solid var(--color-border)',
        padding: '32px 0',
        marginTop: 'auto',
        boxShadow: '0 -2px 10px rgba(0,0,0,0.01)'
      }}>
        <div className="container" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          {/* Right copyright section */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <h4 style={{ color: 'var(--color-brand)', fontSize: '20px', fontWeight: '800' }}>DAWAYA</h4>
            <span style={{ fontSize: '12px', color: 'var(--color-text-muted)', fontWeight: '600' }}>
              © DAWAYA 2024 للرعاية الصحية. دقة سريرية. رعاية متميزة.
            </span>
          </div>

          {/* Left links section */}
          <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
            <a href="#" style={{ color: 'var(--color-text-muted)', fontSize: '13px', fontWeight: '600', textDecoration: 'none' }} className="nav-link-hover">سياسة الخصوصية</a>
            <a href="#" style={{ color: 'var(--color-text-muted)', fontSize: '13px', fontWeight: '600', textDecoration: 'none' }} className="nav-link-hover">شروط الخدمة</a>
            <a href="#" style={{ color: 'var(--color-text-muted)', fontSize: '13px', fontWeight: '600', textDecoration: 'none' }} className="nav-link-hover">مركز المساعدة</a>
            <a href="#" style={{ color: 'var(--color-text-muted)', fontSize: '13px', fontWeight: '600', textDecoration: 'none' }} className="nav-link-hover">الاتصال بالدعم</a>
          </div>
        </div>
      </footer>

      {/* 4. Modular Interactive Modals */}
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
          onClose={() => setActiveModal(null)} 
        />
      )}

      {/* 5. Elegant Alert Toasts */}
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

export default App;
