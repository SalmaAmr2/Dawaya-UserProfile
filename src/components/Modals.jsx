import React, { useState } from 'react';
import { User, Shield, Lock, MapPin, X, MessageSquare, Send, PhoneCall } from 'lucide-react';

/* 1. Edit Profile Modal */
export function EditProfileModal({ profile, onSave, onClose }) {
  const [formData, setFormData] = useState({ ...profile });
  const [validationError, setValidationError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setValidationError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate Username
    if (formData.username.trim().length < 2) {
      setValidationError('اسم المستخدم يجب ألا يقل عن حرفين');
      return;
    }
    if (formData.username.trim().length > 12) {
      setValidationError('اسم المستخدم يجب ألا يزيد عن 12 حرفاً');
      return;
    }

    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setValidationError('البريد الإلكتروني غير صحيح');
      return;
    }

    // Validate Phone Number (Egyptian format)
    const phoneRegex = /^01[0125][0-9]{8}$/;
    if (!phoneRegex.test(formData.phone)) {
      setValidationError('رقم الهاتف غير صحيح. يجب أن يكون رقم هاتف مصري صحيح (مثال: 01012345678)');
      return;
    }

    // Validate Age
    const ageNum = Number(formData.age);
    if (isNaN(ageNum) || ageNum <= 0 || ageNum > 120) {
      setValidationError('يرجى إدخال عمر صحيح بين 1 و 120 سنة');
      return;
    }

    onSave(formData);
  };

  return (
    <div className="modal-overlay">
      <form className="modal-content" onSubmit={handleSubmit}>
        <div className="modal-header">
          <div className="modal-title">
            <User size={20} className="text-primary" style={{ color: 'var(--color-primary)' }} />
            <span>تعديل الملف الشخصي</span>
          </div>
          <button type="button" className="modal-close" onClick={onClose}>
            <X size={18} />
          </button>
        </div>
        
        <div className="modal-body">
          {validationError && (
            <div style={{
              backgroundColor: 'var(--color-danger-light)',
              color: 'var(--color-danger)',
              padding: '12px',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: '600',
              marginBottom: '16px'
            }}>
              {validationError}
            </div>
          )}
          <div className="form-group">
            <label className="form-label">الاسم الكامل</label>
            <input
              type="text"
              name="fullName"
              className="form-input"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">اسم المستخدم</label>
            <input
              type="text"
              name="username"
              className="form-input"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">البريد الإلكتروني</label>
            <input
              type="email"
              name="email"
              className="form-input"
              style={{ direction: 'ltr', textAlign: 'left' }}
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">رقم الهاتف</label>
            <input
              type="tel"
              name="phone"
              className="form-input"
              style={{ direction: 'ltr', textAlign: 'left' }}
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">العمر</label>
              <input
                type="number"
                name="age"
                className="form-input"
                value={formData.age}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">الجنس</label>
              <select
                name="gender"
                className="form-input"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="ذكر">ذكر</option>
                <option value="أنثى">أنثى</option>
              </select>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button type="button" className="btn btn-outline" onClick={onClose}>
            إلغاء
          </button>
          <button type="submit" className="btn btn-primary">
            حفظ التغييرات
          </button>
        </div>
      </form>
    </div>
  );
}

/* 2. Change Password Modal */
export function ChangePasswordModal({ onSave, onClose }) {
  const [passwords, setPasswords] = useState({
    current: '',
    newPass: '',
    confirmPass: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (passwords.newPass !== passwords.confirmPass) {
      setError('كلمتا المرور الجديدتان غير متطابقتين.');
      return;
    }
    if (passwords.newPass.length < 6) {
      setError('يجب أن تكون كلمة المرور 6 أحرف على الأقل.');
      return;
    }
    onSave(passwords.current, passwords.newPass);
  };

  return (
    <div className="modal-overlay">
      <form className="modal-content" onSubmit={handleSubmit}>
        <div className="modal-header">
          <div className="modal-title">
            <Lock size={20} style={{ color: 'var(--color-primary)' }} />
            <span>تغيير كلمة المرور</span>
          </div>
          <button type="button" className="modal-close" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          {error && (
            <div style={{
              backgroundColor: 'var(--color-danger-light)',
              color: 'var(--color-danger)',
              padding: '12px',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: '600',
              marginBottom: '16px'
            }}>
              {error}
            </div>
          )}

          <div className="form-group">
            <label className="form-label">كلمة المرور الحالية</label>
            <input
              type="password"
              name="current"
              className="form-input"
              value={passwords.current}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">كلمة المرور الجديدة</label>
            <input
              type="password"
              name="newPass"
              className="form-input"
              value={passwords.newPass}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">تأكيد كلمة المرور الجديدة</label>
            <input
              type="password"
              name="confirmPass"
              className="form-input"
              value={passwords.confirmPass}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="modal-footer">
          <button type="button" className="btn btn-outline" onClick={onClose}>
            إلغاء
          </button>
          <button type="submit" className="btn btn-primary">
            تحديث كلمة المرور
          </button>
        </div>
      </form>
    </div>
  );
}

/* 3. Location Modal (Add / Edit Location) */
export function LocationModal({ location, onSave, onClose }) {
  const [formData, setFormData] = useState(
    location || { title: '', type: 'home', address: '' }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="modal-overlay">
      <form className="modal-content" onSubmit={handleSubmit}>
        <div className="modal-header">
          <div className="modal-title">
            <MapPin size={20} style={{ color: 'var(--color-primary)' }} />
            <span>{location ? 'تعديل الموقع المحفوظ' : 'إضافة موقع جديد'}</span>
          </div>
          <button type="button" className="modal-close" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          <div className="form-group">
            <label className="form-label">اسم الموقع (مثال: المنزل، العمل، العيادة)</label>
            <input
              type="text"
              name="title"
              className="form-input"
              value={formData.title}
              onChange={handleChange}
              placeholder="مثال: النادي، عيادة الأسنان"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">نوع الموقع</label>
            <select
              name="type"
              className="form-input"
              value={formData.type}
              onChange={handleChange}
              required
            >
              <option value="home">المنزل (أيقونة سكنية)</option>
              <option value="work">العمل (أيقونة حقيبة عمل)</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">العنوان الكامل بالتفصيل</label>
            <textarea
              name="address"
              className="form-input"
              style={{ minHeight: '100px', resize: 'vertical' }}
              value={formData.address}
              onChange={handleChange}
              placeholder="اكتب العنوان هنا بالتفصيل (مثل: 123 طريق العيادات، نيويورك)..."
              required
            />
          </div>
        </div>

        <div className="modal-footer">
          <button type="button" className="btn btn-outline" onClick={onClose}>
            إلغاء
          </button>
          <button type="submit" className="btn btn-primary">
            حفظ الموقع
          </button>
        </div>
      </form>
    </div>
  );
}

/* 4. Support Manager Chat Modal */
export function SupportModal({ profileName, onClose }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'manager',
      text: `مرحباً ${profileName || 'عضو داوايا'}! أنا سليم، مدير حساب الخدمات الخاص بك. كيف يمكنني مساعدتك اليوم بخصوص رعايتك الطبية؟`,
      time: '11:30 م'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg = {
      id: Date.now(),
      sender: 'user',
      text: inputText,
      time: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputText('');
    setIsTyping(true);

    // Simulated response from Account Manager after 2 seconds
    setTimeout(() => {
      let responseText = `تم استلام طلبك يا أستاذ/ة ${profileName || 'عضو داوايا'}. سأقوم بالتنسيق مع الفريق الطبي فوراً والرد عليك خلال دقائق.`;
      if (newMsg.text.includes('حجز') || newMsg.text.includes('موعد')) {
        responseText = 'بكل سرور. هل تفضل موعداً في الفترة الصباحية أم المسائية؟ سأرتب ذلك لك بأقصى سرعة.';
      } else if (newMsg.text.includes('وصفة') || newMsg.text.includes('دواء')) {
        responseText = 'سأتواصل مع الطبيب المعالج لإعادة صرف وصفتك الطبية وتوصيلها إلى موقعك مباشرة.';
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'manager',
          text: responseText,
          time: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setIsTyping(false);
    }, 2000);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: '460px' }}>
        <div className="modal-header" style={{ background: 'linear-gradient(135deg, var(--color-brand) 0%, var(--color-brand-dark) 100%)', color: '#ffffff' }}>
          <div className="modal-title" style={{ color: '#ffffff' }}>
            <div style={{ position: 'relative' }}>
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100" 
                alt="Support Manager" 
                style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', border: '2px solid rgba(255,255,255,0.5)' }} 
              />
              <span style={{ position: 'absolute', bottom: '0', left: '0', width: '10px', height: '10px', backgroundColor: 'var(--color-success)', borderRadius: '50%', border: '2px solid #ffffff' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <span style={{ fontSize: '15px' }}>أ. سليم (مدير الخدمات)</span>
              <span style={{ fontSize: '10px', opacity: '0.8', fontWeight: 'normal' }}>الفئة البلاتينية • متصل الآن</span>
            </div>
          </div>
          <button type="button" className="modal-close" onClick={onClose} style={{ color: '#ffffff' }}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body" style={{ height: '360px', overflowY: 'auto', background: '#f8fafc', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {messages.map((m) => (
            <div 
              key={m.id} 
              style={{
                alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '80%',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px'
              }}
            >
              <div 
                style={{
                  padding: '10px 14px',
                  borderRadius: '12px',
                  fontSize: '13px',
                  fontWeight: '500',
                  lineHeight: '1.5',
                  backgroundColor: m.sender === 'user' ? 'var(--color-primary)' : '#ffffff',
                  color: m.sender === 'user' ? '#ffffff' : 'var(--color-text-main)',
                  border: m.sender === 'user' ? 'none' : '1px solid var(--color-border)',
                  borderTopLeftRadius: m.sender === 'user' ? '12px' : '0px',
                  borderTopRightRadius: m.sender === 'user' ? '0px' : '12px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
                }}
              >
                {m.text}
              </div>
              <span style={{ fontSize: '9px', color: 'var(--color-text-light)', alignSelf: m.sender === 'user' ? 'flex-start' : 'flex-end' }}>{m.time}</span>
            </div>
          ))}

          {isTyping && (
            <div style={{ alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: '6px', background: '#ffffff', padding: '8px 12px', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
              <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>جاري الكتابة...</span>
            </div>
          )}
        </div>

        <form className="modal-footer" onSubmit={handleSend} style={{ padding: '12px 16px', display: 'flex', gap: '8px', background: '#ffffff' }}>
          <input
            type="text"
            className="form-input"
            style={{ margin: 0, padding: '8px 14px', borderRadius: '20px' }}
            placeholder="اكتب رسالتك للمدير هنا..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={isTyping}
          />
          <button type="submit" className="btn btn-primary" style={{ width: '40px', height: '40px', padding: 0, borderRadius: '50%', minWidth: '40px' }} disabled={isTyping}>
            <Send size={16} style={{ transform: 'rotate(180deg)' }} />
          </button>
        </form>
      </div>
    </div>
  );
}
