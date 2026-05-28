import React, { useState, useRef, useEffect } from 'react';
import { Search, Bell, Stethoscope, Calendar, FileText, ChevronDown, LogOut, Settings, Award } from 'lucide-react';
import logoImg from '../assets/Logo.png';

// Mock Doctor Database for interactive search
const MOCK_DOCTORS = [
  { id: 1, name: 'د. أحمد علي', specialty: 'أخصائي أمراض القلب والأوعية الدموية', hospital: 'مستشفى الشفاء' },
  { id: 2, name: 'د. سارة كمال', specialty: 'أخصائية طب الأطفال وحديثي الولادة', hospital: 'عيادات الرواد' },
  { id: 3, name: 'د. يوسف الحسين', specialty: 'استشاري جراحة العظام والمفاصل', hospital: 'مجمع العافية الطبي' },
  { id: 4, name: 'د. فاطمة الزهراء', specialty: 'أخصائية الأمراض الجلدية والتجميل', hospital: 'مركز داوايا الطبي' },
  { id: 5, name: 'د. رانيا سعيد', specialty: 'أخصائية الغدد الصماء والسكري', hospital: 'مستشفى الشفاء' }
];

export default function Navbar({ activeNotifications, clearNotificationCount, profileName, onLogout }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  
  const searchRef = useRef(null);
  const notificationsRef = useRef(null);
  const profileMenuRef = useRef(null);

  // Close menus on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchQuery('');
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Search logic
  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchQuery(val);
    if (!val.trim()) {
      setSearchResults([]);
      return;
    }
    const filtered = MOCK_DOCTORS.filter(doc => 
      doc.name.includes(val) || doc.specialty.includes(val)
    );
    setSearchResults(filtered);
  };

  return (
    <nav style={{
      backgroundColor: '#ffffff',
      borderBottom: '1px solid var(--color-border)',
      position: 'sticky',
      top: 0,
      zIndex: 90,
      padding: '16px 0',
      boxShadow: '0 2px 10px rgba(0,0,0,0.02)'
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        
        {/* Right side: Logo & Navigation */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '48px' }}>
          <a href="#" className="navbar-brand" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img src={logoImg} alt="DAWAYA" style={{ height: '36px', width: 'auto', objectFit: 'contain' }} />
          </a>

          <div style={{ display: 'flex', gap: '28px', alignItems: 'center' }}>
            <a href="#" style={{ color: 'var(--color-primary)', fontWeight: '700', fontSize: '14px', textDecoration: 'none', borderBottom: '2px solid var(--color-primary)', paddingBottom: '4px' }}>لوحة التحكم</a>
            <a href="#" style={{ color: 'var(--color-text-muted)', fontWeight: '600', fontSize: '14px', textDecoration: 'none', transition: 'color var(--transition-fast)' }} className="nav-link-hover">الوصفات الطبية</a>
            <a href="#" style={{ color: 'var(--color-text-muted)', fontWeight: '600', fontSize: '14px', textDecoration: 'none', transition: 'color var(--transition-fast)' }} className="nav-link-hover">المواعيد</a>
            <a href="#" style={{ color: 'var(--color-text-muted)', fontWeight: '600', fontSize: '14px', textDecoration: 'none', transition: 'color var(--transition-fast)' }} className="nav-link-hover">السجلات الصحية</a>
          </div>
        </div>

        {/* Left side: Search, Notifications, Avatar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          
          {/* Search Box */}
          <div ref={searchRef} className="search-wrapper">
            <Search size={16} className="search-icon" />
            <input 
              type="text" 
              placeholder="إبحث عن طبيب أو تخصص..." 
              className="search-input"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            {/* Search Suggestions Dropdown */}
            {searchQuery && (
              <div style={{
                position: 'absolute',
                top: 'calc(100% + 8px)',
                right: 0,
                width: '100%',
                backgroundColor: '#ffffff',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-lg)',
                padding: '8px',
                zIndex: 100,
                maxHeight: '300px',
                overflowY: 'auto',
                animation: 'slideUp var(--transition-fast)'
              }}>
                {searchResults.length > 0 ? (
                  searchResults.map(doc => (
                    <div key={doc.id} style={{
                      padding: '10px 12px',
                      borderRadius: 'var(--radius-md)',
                      cursor: 'pointer',
                      transition: 'background var(--transition-fast)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px'
                    }} 
                    className="suggestion-item"
                    onClick={() => {
                      alert(`سيتم فتح صفحة الحجز لـ ${doc.name}`);
                      setSearchQuery('');
                    }}>
                      <div style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--color-primary-light)',
                        color: 'var(--color-primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <Stethoscope size={18} />
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--color-text-main)' }}>{doc.name}</span>
                        <span style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>{doc.specialty} • {doc.hospital}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div style={{ padding: '16px', textAlign: 'center', fontSize: '13px', color: 'var(--color-text-muted)' }}>
                    لم يتم العثور على أطباء يطابقون بحثك.
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Dynamic Notification Bell */}
          <div ref={notificationsRef} style={{ position: 'relative' }}>
            <button 
              className="btn-icon" 
              onClick={() => {
                setShowNotifications(!showNotifications);
                clearNotificationCount();
              }}
              style={{
                position: 'relative',
                backgroundColor: showNotifications ? 'var(--color-primary-light)' : 'var(--bg-card)',
                color: showNotifications ? 'var(--color-primary)' : 'var(--color-text-muted)'
              }}
            >
              <Bell size={18} />
              {activeNotifications.filter(n => !n.read).length > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '6px',
                  left: '6px',
                  width: '9px',
                  height: '9px',
                  backgroundColor: 'var(--color-danger)',
                  borderRadius: '50%',
                  border: '2px solid #ffffff'
                }} />
              )}
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div style={{
                position: 'absolute',
                top: 'calc(100% + 8px)',
                left: 0,
                width: '320px',
                backgroundColor: '#ffffff',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-lg)',
                zIndex: 100,
                overflow: 'hidden',
                animation: 'slideUp var(--transition-fast)'
              }}>
                <div style={{
                  padding: '14px 16px',
                  borderBottom: '1px solid var(--color-border)',
                  backgroundColor: '#f8fafc',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{ fontSize: '14px', fontWeight: '700' }}>التنبيهات الأخيرة</span>
                  <span style={{ fontSize: '11px', color: 'var(--color-primary)', fontWeight: '600' }}>مقروءة بالكامل</span>
                </div>
                <div style={{ maxHeight: '280px', overflowY: 'auto' }}>
                  {activeNotifications.map(notif => (
                    <div key={notif.id} style={{
                      padding: '12px 16px',
                      borderBottom: '1px solid #f1f5f9',
                      display: 'flex',
                      gap: '12px',
                      alignItems: 'flex-start',
                      backgroundColor: notif.read ? 'transparent' : 'rgba(0,123,255,0.02)',
                      transition: 'background var(--transition-fast)'
                    }} className="notification-item">
                      <div style={{
                        marginTop: '2px',
                        width: '30px',
                        height: '30px',
                        borderRadius: '50%',
                        backgroundColor: notif.type === 'appointment' ? 'var(--color-primary-light)' : 'var(--color-success-light)',
                        color: notif.type === 'appointment' ? 'var(--color-primary)' : 'var(--color-success)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        {notif.type === 'appointment' ? <Calendar size={14} /> : <FileText size={14} />}
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', flex: 1 }}>
                        <span style={{ fontSize: '12px', color: 'var(--color-text-main)', fontWeight: notif.read ? '500' : '700' }}>{notif.text}</span>
                        <span style={{ fontSize: '10px', color: 'var(--color-text-light)' }}>{notif.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Profile dropdown */}
          <div ref={profileMenuRef} style={{ position: 'relative' }}>
            <button 
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '4px'
              }}
            >
              <img 
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120" 
                alt="User Profile" 
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '2px solid var(--color-primary-light)'
                }}
              />
              <ChevronDown size={14} style={{ color: 'var(--color-text-muted)' }} />
            </button>

            {/* Profile Dropdown Menu */}
            {showProfileMenu && (
              <div style={{
                position: 'absolute',
                top: 'calc(100% + 8px)',
                left: 0,
                width: '180px',
                backgroundColor: '#ffffff',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-lg)',
                padding: '6px',
                zIndex: 100,
                animation: 'slideUp var(--transition-fast)'
              }}>
                <div style={{ padding: '8px 12px', borderBottom: '1px solid #f1f5f9' }}>
                  <span style={{ display: 'block', fontSize: '13px', fontWeight: '700' }}>{profileName}</span>
                  <span style={{ display: 'block', fontSize: '10px', color: 'var(--color-text-muted)', marginTop: '2px' }}>عضو بلاتيني</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', marginTop: '4px' }}>
                  <button className="dropdown-btn" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    width: '100%',
                    padding: '8px 12px',
                    background: 'none',
                    border: 'none',
                    borderRadius: 'var(--radius-md)',
                    cursor: 'pointer',
                    fontSize: '12px',
                    fontWeight: '600',
                    color: 'var(--color-text-main)',
                    textAlign: 'right'
                  }} onClick={() => { setShowProfileMenu(false); alert("الملف الشخصي مفعل بالفعل!"); }}>
                    <Settings size={14} />
                    <span>إعدادات الحساب</span>
                  </button>
                  
                  <button className="dropdown-btn" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    width: '100%',
                    padding: '8px 12px',
                    background: 'none',
                    border: 'none',
                    borderRadius: 'var(--radius-md)',
                    cursor: 'pointer',
                    fontSize: '12px',
                    fontWeight: '600',
                    color: 'var(--color-danger)',
                    textAlign: 'right'
                  }} onClick={() => { setShowProfileMenu(false); if (onLogout) onLogout(); }}>
                    <LogOut size={14} />
                    <span>تسجيل الخروج</span>
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </nav>
  );
}
