import React, { useState } from 'react';
import { User, Mail, Lock, Phone, UserCheck, ShieldAlert, KeyRound, Sparkles, CheckCircle2 } from 'lucide-react';
import logoImg from '../assets/Logo.png';
import { api } from '../services/api';

export default function Auth({ onAuthSuccess, showToast }) {
  const [view, setView] = useState('login'); // 'login' | 'register' | 'verify'
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Form states
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    phone: '',
    gender: 'male', // 'male' or 'female'
    otp: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      if (view === 'login') {
        // Call login API
        await api.login(formData.email, formData.password);
        showToast('تم تسجيل الدخول بنجاح! جاري تحميل بياناتك...', 'success');
        onAuthSuccess();
      } else if (view === 'register') {
        // Call register API
        await api.register(
          formData.username,
          formData.email,
          formData.password,
          formData.phone,
          formData.gender
        );
        showToast('تم تسجيل الحساب بنجاح! يرجى تفعيل البريد الإلكتروني.', 'success');
        // Automatically switch to verify view to input the OTP code
        setView('verify');
      } else if (view === 'verify') {
        // Call verify email API
        await api.verify(formData.email, formData.otp);
        showToast('تم تفعيل حسابك بنجاح! يمكنك الآن تسجيل الدخول.', 'success');
        setView('login');
        setFormData(prev => ({ ...prev, otp: '' }));
      }
    } catch (err) {
      setError(err.message || 'حدث خطأ غير متوقع. يرجى المحاولة لاحقاً.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      background: 'radial-gradient(circle at 10% 20%, rgba(0, 123, 255, 0.05) 0%, rgba(244, 247, 251, 1) 90.1%)',
      padding: '24px',
      direction: 'rtl'
    }}>
      <div className="card" style={{
        width: '100%',
        maxWidth: '480px',
        padding: '40px',
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(255, 255, 255, 0.7)',
        boxShadow: '0 20px 50px rgba(0, 123, 255, 0.08)',
        borderRadius: 'var(--radius-xl)'
      }}>
        
        {/* Brand Header */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', marginBottom: '32px', textAlign: 'center' }}>
          <img src={logoImg} alt="DAWAYA" style={{ height: '48px', width: 'auto', objectFit: 'contain' }} />
          <div>
            <h2 style={{ fontSize: '22px', fontWeight: '800', color: 'var(--color-text-main)' }}>
              {view === 'login' && 'أهلاً بك مجدداً في داوايا'}
              {view === 'register' && 'انضم إلى عائلة داوايا'}
              {view === 'verify' && 'تأكيد الحساب والبريد الإلكتروني'}
            </h2>
            <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginTop: '6px' }}>
              {view === 'login' && 'سجل دخولك للوصول إلى سجلاتك الصحية وإدارة ملفك الشخصي'}
              {view === 'register' && 'أنشئ حسابك الآن لتتمكن من حجز المواعيد والحصول على الوصفات'}
              {view === 'verify' && `يرجى إدخال رمز التحقق (OTP) المرسل إلى ${formData.email || 'بريدك الإلكتروني'}`}
            </p>
          </div>
        </div>

        {/* Tab Switcher (hidden during OTP verification) */}
        {view !== 'verify' && (
          <div style={{
            display: 'flex',
            backgroundColor: '#f1f5f9',
            padding: '4px',
            borderRadius: 'var(--radius-md)',
            marginBottom: '28px'
          }}>
            <button
              onClick={() => { setView('login'); setError(''); }}
              style={{
                flex: 1,
                padding: '10px',
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                cursor: 'pointer',
                fontWeight: '700',
                fontSize: '13px',
                backgroundColor: view === 'login' ? '#ffffff' : 'transparent',
                color: view === 'login' ? 'var(--color-primary)' : 'var(--color-text-muted)',
                boxShadow: view === 'login' ? '0 2px 8px rgba(0,0,0,0.04)' : 'none',
                transition: 'all var(--transition-fast)'
              }}
            >
              تسجيل الدخول
            </button>
            <button
              onClick={() => { setView('register'); setError(''); }}
              style={{
                flex: 1,
                padding: '10px',
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                cursor: 'pointer',
                fontWeight: '700',
                fontSize: '13px',
                backgroundColor: view === 'register' ? '#ffffff' : 'transparent',
                color: view === 'register' ? 'var(--color-primary)' : 'var(--color-text-muted)',
                boxShadow: view === 'register' ? '0 2px 8px rgba(0,0,0,0.04)' : 'none',
                transition: 'all var(--transition-fast)'
              }}
            >
              إنشاء حساب جديد
            </button>
          </div>
        )}

        {/* Info Instruction Banner */}
        <div style={{
          backgroundColor: 'var(--color-primary-light)',
          borderRight: '4px solid var(--color-brand)',
          borderRadius: 'var(--radius-sm)',
          padding: '12px 16px',
          marginBottom: '24px',
          display: 'flex',
          gap: '12px',
          alignItems: 'center'
        }}>
          <Sparkles size={18} style={{ color: 'var(--color-brand)', flexShrink: 0 }} />
          <span style={{ fontSize: '11.5px', color: 'var(--color-brand-dark)', fontWeight: '600', lineHeight: '1.5' }}>
            {view === 'verify' 
              ? 'يرجى مراجعة بريدك الإلكتروني (بما في ذلك ملف الرسائل غير المرغوب فيها Spam) للحصول على رمز التحقق المكون من 6 أرقام.'
              : 'تطبيق داوايا متصل الآن بالخادم السحابي التجريبي. يمكنك إنشاء حساب جديد لتجربته، أو تسجيل الدخول بحسابك الحالي.'}
          </span>
        </div>

        {/* Error Message with OTP Verification Switcher */}
        {error && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
            <div style={{
              backgroundColor: 'var(--color-danger-light)',
              color: 'var(--color-danger)',
              borderRight: '4px solid var(--color-danger)',
              borderRadius: 'var(--radius-sm)',
              padding: '12px 16px',
              fontSize: '12.5px',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <ShieldAlert size={16} style={{ flexShrink: 0 }} />
              <span>{error}</span>
            </div>

            {/* If login failed due to email verification being required, provide one-click access! */}
            {(error.includes('تفعيل') || error.includes('verify') || error.includes('تنشيط')) && view === 'login' && (
              <button
                type="button"
                className="btn btn-secondary"
                style={{
                  width: '100%',
                  padding: '12px',
                  fontSize: '13px',
                  fontWeight: '700',
                  color: 'var(--color-brand)',
                  backgroundColor: 'var(--color-primary-light)',
                  border: '1px solid rgba(0, 123, 255, 0.15)',
                  boxShadow: '0 2px 6px rgba(0, 123, 255, 0.05)',
                  cursor: 'pointer'
                }}
                onClick={() => { setView('verify'); setError(''); }}
              >
                إدخال رمز التحقق (OTP) وتفعيل الحساب الآن
              </button>
            )}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Username (Only for Register) */}
          {view === 'register' && (
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <User size={14} />
                <span>اسم المستخدم</span>
              </label>
              <input
                type="text"
                name="username"
                className="form-input"
                placeholder="أدخل اسم مستخدم فريد (مثال: amrsalma)"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
          )}

          {/* Email (Shown for login, register, and verify so user knows what's being verified) */}
          <div className="form-group" style={{ margin: 0 }}>
            <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Mail size={14} />
              <span>البريد الإلكتروني</span>
            </label>
            <input
              type="email"
              name="email"
              className="form-input"
              style={{ direction: 'ltr', textAlign: 'left' }}
              placeholder="name@example.com"
              value={formData.email}
              onChange={handleChange}
              disabled={view === 'verify'} // lock email during OTP verification
              required
            />
          </div>

          {/* Phone (Only for Register) */}
          {view === 'register' && (
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Phone size={14} />
                <span>رقم الهاتف</span>
              </label>
              <input
                type="tel"
                name="phone"
                className="form-input"
                style={{ direction: 'ltr', textAlign: 'left' }}
                placeholder="01002345678"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
          )}

          {/* Password (Hidden during OTP) */}
          {view !== 'verify' && (
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Lock size={14} />
                <span>كلمة المرور</span>
              </label>
              <input
                type="password"
                name="password"
                className="form-input"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          )}

          {/* Gender (Only for Register) */}
          {view === 'register' && (
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <UserCheck size={14} />
                <span>الجنس</span>
              </label>
              <select
                name="gender"
                className="form-input"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="male">ذكر</option>
                <option value="female">أنثى</option>
              </select>
            </div>
          )}

          {/* OTP Code Input (Only for Verify View) */}
          {view === 'verify' && (
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 size={14} style={{ color: 'var(--color-success)' }} />
                <span>رمز التحقق (OTP)</span>
              </label>
              <input
                type="text"
                name="otp"
                className="form-input"
                style={{ direction: 'ltr', textAlign: 'center', letterSpacing: '8px', fontSize: '18px', fontWeight: 'bold' }}
                placeholder="000000"
                maxLength={6}
                value={formData.otp}
                onChange={handleChange}
                required
              />
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isLoading}
            style={{
              padding: '14px',
              fontSize: '15px',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              marginTop: '10px',
              backgroundColor: isLoading ? 'var(--color-primary-hover)' : 'var(--color-primary)',
              opacity: isLoading ? 0.8 : 1,
              cursor: isLoading ? 'not-allowed' : 'pointer'
            }}
          >
            {isLoading ? (
              <span>جاري التحميل...</span>
            ) : (
              <>
                <KeyRound size={16} />
                <span>
                  {view === 'login' && 'تسجيل الدخول'}
                  {view === 'register' && 'إنشاء حساب جديد'}
                  {view === 'verify' && 'تأكيد الرمز وتفعيل الحساب'}
                </span>
              </>
            )}
          </button>

          {/* Cancel button in verify view */}
          {view === 'verify' && (
            <button
              type="button"
              className="btn btn-outline"
              style={{ padding: '10px' }}
              onClick={() => { setView('login'); setError(''); }}
            >
              العودة إلى تسجيل الدخول
            </button>
          )}

        </form>

      </div>
    </div>
  );
}
