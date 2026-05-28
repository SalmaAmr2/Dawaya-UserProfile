import React, { useState } from 'react';
import { 
  User, Shield, Lock, MapPin, Star, MoreVertical, Plus, 
  Home, Briefcase, Mail, Phone, Cake, HelpCircle, CheckCircle, 
  ChevronLeft, Edit3, Trash2
} from 'lucide-react';

export default function UserProfile({ 
  profile, 
  locations, 
  onEditProfile, 
  onChangePassword, 
  onAddLocation, 
  onEditLocation, 
  onDeleteLocation, 
  onOpenSupport 
}) {
  const [activeLocationMenu, setActiveLocationMenu] = useState(null);

  // Toggle three dots menu for locations
  const toggleLocationMenu = (id, e) => {
    e.stopPropagation();
    setActiveLocationMenu(activeLocationMenu === id ? null : id);
  };

  // Close location menu
  React.useEffect(() => {
    const closeMenu = () => setActiveLocationMenu(null);
    document.addEventListener('click', closeMenu);
    return () => document.removeEventListener('click', closeMenu);
  }, []);

  // Compute progress bar percentage
  const pointsEarned = 2480;
  const pointsTotal = 5000;
  const progressPercent = (pointsEarned / pointsTotal) * 100;

  return (
    <div className="container">
      <div className="app-grid">
        
        {/* RIGHT COLUMN (In RTL, this appears right. Sidebar is left.) */}
        {/* Wait, in index.css, app-grid has 1fr 2.3fr. 
            Since body is direction: rtl, the first item in DOM (Sidebar) is right, and the second item is left. 
            Looking at the screenshot: The main wider cards are on the RIGHT side. 
            And the sidebar is on the LEFT side. 
            So in our DOM layout:
            We put the main content first in the grid, or sidebar first? 
            In CSS Grid with direction: rtl:
            First child is on the far right. Second child is on the left.
            So we should put the main content cards (Wider, 2.3fr) first in the DOM, 
            and the Sidebar cards (Narrower, 1fr) second in the DOM!
            Wait, let's look at the grid definition in index.css:
            .app-grid {
              display: grid;
              grid-template-columns: 1fr 2.3fr;
              gap: 24px;
            }
            Under RTL:
            `grid-template-columns: 1fr 2.3fr` means the right column is 1fr and the left column is 2.3fr.
            Wait, the right column is 2.3fr in the screenshot, and the left is 1fr.
            So we want the RIGHT column to be 2.3fr and the LEFT column to be 1fr.
            Under RTL, grid columns are laid out from right to left!
            So the first column (rightmost) is the first value: 2.3fr.
            The second column (leftmost) is the second value: 1fr.
            Let's adjust index.css or write the DOM so that the wider cards are on the right, and narrower on the left.
            Let's set:
            `grid-template-columns: 2.3fr 1fr` inside RTL.
            Wait, if we use `grid-template-columns: 2.3fr 1fr`, the rightmost column will be 2.3fr (main cards), 
            and the leftmost column will be 1fr (sidebar). 
            Then, the first child in the HTML grid will be the Right Column (Main Cards), 
            and the second child in the HTML grid will be the Left Column (Sidebar)!
            This is perfect and clean. Let's make sure our CSS grid columns are:
            grid-template-columns: 2.3fr 1fr;
            Let's edit index.css later or verify it. In index.css we wrote `grid-template-columns: 1fr 2.3fr`, 
            which means the rightmost (first) is 1fr, and leftmost is 2.3fr. That would place the Sidebar on the right 
            and Main Cards on the left. 
            Wait, let's look at the screenshot again:
            The Main Cards (Wider) are on the right! 
            The Sidebar (Narrower) is on the left!
            So the right column is wider, left column is narrower.
            In RTL, columns are ordered right-to-left. 
            So first column (right) = 2.3fr. Second column (left) = 1fr.
            Yes, let's fix that in index.css to be `grid-template-columns: 2.3fr 1fr;`! We will do that via a quick edit or inside App.jsx style. Let's just do it directly. Let's write the UserProfile HTML.
        */}

        {/* Right side: Main Information Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Card 1: User Profile Banner */}
          <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '32px', position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
              <img 
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=240" 
                alt="Profile Avatar" 
                style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '4px solid var(--color-primary-light)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
                }}
              />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <h2 style={{ fontSize: '24px', fontWeight: '800' }}>{profile.fullName}</h2>
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    backgroundColor: 'var(--color-primary-light)',
                    color: 'var(--color-brand)',
                    fontSize: '11px',
                    fontWeight: '700',
                    padding: '4px 10px',
                    borderRadius: '9999px',
                    border: '1px solid rgba(9,119,230,0.15)'
                  }}>
                    <CheckCircle size={10} style={{ color: 'var(--color-brand)' }} />
                    موثق
                  </span>
                </div>
                <span style={{ fontSize: '13px', color: 'var(--color-text-muted)', fontWeight: '600' }}>عضو منذ أكتوبر 2023</span>
              </div>
            </div>

            <button className="btn btn-primary" onClick={onEditProfile} style={{ alignSelf: 'flex-end', marginTop: '20px' }}>
              <Edit3 size={16} />
              <span>تعديل الملف الشخصي</span>
            </button>
          </div>

          {/* Card 2: Personal Information Grid */}
          <div className="card" style={{ padding: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '32px', borderBottom: '1px solid #f1f5f9', paddingBottom: '16px' }}>
              <User size={20} style={{ color: 'var(--color-brand)' }} />
              <h3 style={{ fontSize: '18px', fontWeight: '700' }}>المعلومات الشخصية</h3>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              columnGap: '40px',
              rowGap: '32px'
            }}>
              
              {/* Field 1: Username */}
              <div style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '12px' }}>
                <span className="form-label" style={{ marginBottom: '8px' }}>اسم المستخدم</span>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '14px', fontWeight: '700', fontFamily: 'monospace', color: 'var(--color-text-main)' }}>{profile.username}</span>
                  <span style={{ color: 'var(--color-text-muted)', fontSize: '14px' }}>@</span>
                </div>
              </div>

              {/* Field 2: Full Name */}
              <div style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '12px' }}>
                <span className="form-label" style={{ marginBottom: '8px' }}>الاسم الكامل</span>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '14px', fontWeight: '700' }}>{profile.fullName}</span>
                  <User size={16} style={{ color: 'var(--color-text-muted)' }} />
                </div>
              </div>

              {/* Field 3: Email */}
              <div style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '12px' }}>
                <span className="form-label" style={{ marginBottom: '8px' }}>البريد الإلكتروني</span>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '14px', fontWeight: '700', fontFamily: 'monospace' }}>{profile.email}</span>
                  <Mail size={16} style={{ color: 'var(--color-text-muted)' }} />
                </div>
              </div>

              {/* Field 4: Phone */}
              <div style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '12px' }}>
                <span className="form-label" style={{ marginBottom: '8px' }}>رقم الهاتف</span>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '14px', fontWeight: '700', fontFamily: 'monospace', direction: 'ltr' }}>{profile.phone}</span>
                  <Phone size={16} style={{ color: 'var(--color-text-muted)' }} />
                </div>
              </div>

              {/* Field 5: Age */}
              <div style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '12px' }}>
                <span className="form-label" style={{ marginBottom: '8px' }}>العمر</span>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '14px', fontWeight: '700' }}>{profile.age} عاماً</span>
                  <Cake size={16} style={{ color: 'var(--color-text-muted)' }} />
                </div>
              </div>

              {/* Field 6: Gender */}
              <div style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '12px' }}>
                <span className="form-label" style={{ marginBottom: '8px' }}>الجنس</span>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '14px', fontWeight: '700' }}>{profile.gender}</span>
                  <User size={16} style={{ color: 'var(--color-text-muted)' }} />
                </div>
              </div>

            </div>
          </div>

          {/* Card 3: Security & Password */}
          <div className="card" style={{ padding: '24px 32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Shield size={20} style={{ color: 'var(--color-brand)' }} />
                <h3 style={{ fontSize: '16px', fontWeight: '700' }}>الأمان وكلمة المرور</h3>
              </div>
              <button 
                onClick={onChangePassword}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'none',
                  border: 'none',
                  color: 'var(--color-primary)',
                  fontWeight: '700',
                  fontSize: '13px',
                  cursor: 'pointer',
                  padding: '4px 8px',
                  borderRadius: 'var(--radius-sm)',
                  transition: 'background var(--transition-fast)'
                }}
                className="hover-action-bg"
              >
                <Lock size={14} />
                <span>تغيير كلمة المرور</span>
              </button>
            </div>
          </div>

        </div>

        {/* Left side: Sidebar (Membership, Locations, Help) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Card 1: Membership Level */}
          <div className="card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
              <div>
                <span style={{ fontSize: '11px', color: 'var(--color-text-muted)', fontWeight: '600' }}>العضوية</span>
                <h4 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--color-brand)', marginTop: '4px' }}>بلاتيني</h4>
                <span style={{ fontSize: '10px', color: 'var(--color-text-light)', fontWeight: '600' }}>فئة العضوية</span>
              </div>
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-primary-light)',
                color: 'var(--color-brand)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 10px rgba(0, 123, 255, 0.1)'
              }}>
                <Star size={20} fill="var(--color-brand)" strokeWidth={0} />
              </div>
            </div>

            <div style={{ marginTop: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '11px', color: 'var(--color-text-muted)', fontWeight: '600' }}>نقاط الولاء</span>
                <span style={{ fontSize: '12px', fontWeight: '700', fontFamily: 'monospace' }}>{pointsEarned.toLocaleString()} / {pointsTotal.toLocaleString()}</span>
              </div>
              <div style={{
                width: '100%',
                height: '8px',
                backgroundColor: '#e2e8f0',
                borderRadius: '9999px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${progressPercent}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, var(--color-primary) 0%, var(--color-brand) 100%)',
                  borderRadius: '9999px',
                  transition: 'width var(--transition-slow)'
                }} />
              </div>
            </div>
          </div>

          {/* Card 2: Saved Locations */}
          <div className="card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <span style={{ fontSize: '13px', fontWeight: '700' }}>المواقع المحفوظة</span>
              <button 
                className="btn-icon" 
                style={{ width: '28px', height: '28px' }}
                onClick={onAddLocation}
              >
                <Plus size={14} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {locations.map((loc) => (
                <div 
                  key={loc.id} 
                  style={{
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-md)',
                    padding: '14px',
                    position: 'relative',
                    backgroundColor: '#f8fafc',
                    display: 'flex',
                    gap: '12px'
                  }}
                >
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: '#ffffff',
                    color: 'var(--color-text-muted)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid var(--color-border)'
                  }}>
                    {loc.type === 'home' ? <Home size={14} /> : <Briefcase size={14} />}
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1, paddingLeft: '20px' }}>
                    <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--color-text-main)' }}>{loc.title}</span>
                    <p style={{ fontSize: '11px', color: 'var(--color-text-muted)', lineHeight: '1.4' }}>{loc.address}</p>
                  </div>

                  {/* Options dots menu button */}
                  <div style={{ position: 'absolute', top: '10px', left: '10px' }}>
                    <button 
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--color-text-light)',
                        cursor: 'pointer',
                        padding: '4px',
                        display: 'flex',
                        alignItems: 'center'
                      }}
                      onClick={(e) => toggleLocationMenu(loc.id, e)}
                    >
                      <MoreVertical size={14} />
                    </button>

                    {activeLocationMenu === loc.id && (
                      <div style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        backgroundColor: '#ffffff',
                        border: '1px solid var(--color-border)',
                        borderRadius: 'var(--radius-sm)',
                        boxShadow: 'var(--shadow-md)',
                        zIndex: 10,
                        minWidth: '100px',
                        padding: '4px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '2px'
                      }}>
                        <button 
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            padding: '6px 10px',
                            background: 'none',
                            border: 'none',
                            fontSize: '11px',
                            cursor: 'pointer',
                            color: 'var(--color-text-main)',
                            width: '100%',
                            textAlign: 'right'
                          }}
                          className="hover-menu-item"
                          onClick={() => onEditLocation(loc)}
                        >
                          <Edit3 size={10} />
                          <span>تعديل</span>
                        </button>
                        
                        <button 
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            padding: '6px 10px',
                            background: 'none',
                            border: 'none',
                            fontSize: '11px',
                            cursor: 'pointer',
                            color: 'var(--color-danger)',
                            width: '100%',
                            textAlign: 'right'
                          }}
                          className="hover-menu-item-danger"
                          onClick={() => onDeleteLocation(loc.id)}
                        >
                          <Trash2 size={10} />
                          <span>حذف</span>
                        </button>
                      </div>
                    )}
                  </div>

                </div>
              ))}
            </div>
          </div>

          {/* Card 3: Premium Help Card */}
          <div 
            className="card" 
            style={{ 
              background: 'linear-gradient(135deg, var(--color-brand) 0%, var(--color-brand-dark) 100%)', 
              color: '#ffffff', 
              padding: '28px',
              border: 'none',
              overflow: 'hidden',
              position: 'relative'
            }}
          >
            {/* Background design elements */}
            <div style={{
              position: 'absolute',
              top: '-20px',
              left: '-20px',
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.06)'
            }} />
            <div style={{
              position: 'absolute',
              bottom: '-30px',
              right: '-10px',
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.04)'
            }} />

            <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h4 style={{ fontSize: '18px', fontWeight: '800', color: '#ffffff' }}>هل تحتاج مساعدة؟</h4>
              <p style={{ fontSize: '12px', opacity: '0.9', lineHeight: '1.6' }}>
                فريق الدعم المتميز لدينا متاح على مدار الساعة طوال أيام الأسبوع لأعضاء الفئة البلاتينية.
              </p>
              <button 
                className="btn" 
                style={{ 
                  backgroundColor: '#ffffff', 
                  color: 'var(--color-brand)', 
                  fontWeight: '700',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                  marginTop: '8px'
                }}
                onClick={onOpenSupport}
              >
                اتصل بمدير الخدمات
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
