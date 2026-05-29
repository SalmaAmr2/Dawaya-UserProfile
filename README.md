# 🩺 DAWAYA | داوايا - User Profile Platform

<<<<<<< HEAD
<div align="center">
  <img src="https://img.shields.io/badge/Vite-8A2BE2?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
  <img src="https://img.shields.io/badge/React_Router_7-CA4245?style=for-the-badge&logo=react-router&logoColor=white" />
  <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" />
</div>

---

### [Arabic / العربية] 🇪🇬

**داوايا (DAWAYA)** هي منصة رقمية متكاملة للرعاية الصحية وإدارة الصيدليات والوصفات الطبية، وتتميز بواجهة مستخدم حديثة واستثنائية مخصصة لإدارة الملف الشخصي للأعضاء (User Profile). يجمع النظام بين القوة والجمال البصري لتقديم تجربة مستخدم سلسة وتفاعلية بالكامل تدعم اللغة العربية والخطوط العصرية مثل **Cairo**.

---

### [English] 🇬🇧

**DAWAYA** is an integrated, state-of-the-art digital healthcare, pharmacy, and prescription management platform, featuring a premium and modern User Profile dashboard. The application blends technical performance with rich, fluid visual aesthetics to offer a seamless, fully-responsive interactive experience utilizing **Cairo typography** and dynamic dark/light HSL palettes.

---

## ✨ الميزات الرئيسية / Key Features

### 👤 إدارة الملف الشخصي المتقدمة | Premium Profile Dashboard
- **معلومات العضو الموثق**: عرض متكامل لبيانات العضوية بالكامل (اسم المستخدم الفريد، البريد الإلكتروني، رقم الهاتف المصري الموثق، الجنس، والعمر) في بطاقات عصرية مدعومة بتأثيرات بصرية ممتازة.
- **التفاعل الفوري**: واجهة مستخدم ناعمة تعتمد على نظام الألوان المخصص والمؤثرات الانتقالية الفائقة (Micro-interactions) وتجاوب كامل مع مختلف مقاسات الشاشات.

### 📍 إدارة المواقع الجغرافية المحفوظة | Saved Locations (CRUD)
- **التحكم الكامل (CRUD)**: إضافة، تعديل، وحذف العناوين الجغرافية المفضلة (المنزل، العمل، العيادة، إلخ) مباشرة من خلال نافذة منبثقة تفاعلية.
- **أيقونات متكيفة**: تمييز تلقائي للمواقع وتحديد الأيقونات المناسبة (سكنية/حقيبة عمل) بطريقة بصرية ذكية عبر مكتبة **Lucide Icons**.

### 🔒 أمان الحساب والتحقق الحيوي | Advanced Security & Real-Time Validation
- **تحديث كلمة المرور**: نظام متطور لتغيير كلمات المرور داخل الملف الشخصي مباشرة.
- **مقياس قوة كلمة المرور (Strength Meter)**: شريط تفاعلي حيوي لحساب قوة كلمة المرور وعرضها بالسرعة والألوان المناسبة (ضعيفة، متوسطة، قوية جداً).
- **قائمة التحقق الحية (Criteria Checklist)**: واجهة فحص فوري للمتطلبات الأمنية (أن تحتوى على 8 أحرف على الأقل، رمز خاص واحد مثل @$!%*?&، وحرف واحد كبير على الأقل) تضيء باللون الأزرق الموثق عند التحقق.

### 🔌 الربط مع السحابة والتحقق من المدخلات | API Integration & Data Integrity
- **خادم سحابي حيوي**: متكامل بشكل كامل وفوري مع خادم سحابي خلفي مستضاف على **Vercel** (`https://dawaya-back-end.vercel.app`).
- **رمز التفويض الموحد (`userToken`)**: دعم كامل للأمان والحفاظ على الجلسات؛ حيث يتم تخزين الرمز بشكل آمن والتحقق التلقائي من انتهاء صلاحية الجلسة وعرض تنبيهات ذكية وتوجيه المستخدم لصفحة تسجيل الدخول بأمان.
- **تحقق متقدم من النماذج**: استخدام **Formik & Yup** في النوافذ المنبثقة للتأكد التام من صحة البيانات (التحقق من صيغة البريد الإلكتروني، التحقق الصارم من أرقام الهواتف المصرية المكونة من 11 رقماً وتبدأ ببادئة صحيحة، والتحقق من العمر المنطقي).

---

## 🛠️ التقنيات المستخدمة / Tech Stack

- **Framework**: [React 19](https://react.dev) & [Vite](https://vitejs.dev) (لتطوير وبناء فائق السرعة والاستجابة).
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com) مدمج مع [Flowbite](https://flowbite.com) لتقديم تنسيق مدمج وجذاب.
- **Routing**: [React Router v7](https://reactrouter.com) (لإدارة مسارات التطبيق والتنقلات السلسة والآمنة).
- **Icons**: [Lucide React](https://lucide.dev) & [FontAwesome 7](https://fontawesome.com) لتوفير أيقونات متناسقة وتفاعلية.
- **Forms & Validation**: [Formik](https://formik.org) & [Yup](https://github.com/jquense/yup) لإدخال آمن وتجربة خالية من الأخطاء.
- **HTTP Client**: [Axios](https://axios-http.com) و Fetch API للتواصل السلس مع خادم البيانات.

---

## 📂 هيكلية المشروع / File Structure

```text
dawaya-profile/
├── public/                 # الملفات العامة والثابتة
├── src/
│   ├── assets/             # الصور والخطوط المخصصة
│   ├── components/         # المكونات التفاعلية القابلة لإعادة الاستخدام
│   │   ├── Footer/         # شريط التذييل السفلي
│   │   ├── Navbar/         # شريط التنقل العلوي الأنيق
│   │   ├── Modals.jsx      # النوافذ المنبثقة لإدارة الحساب والعناوين
│   │   ├── UserProfile.jsx # لوحة التحكم الرئيسية ومعلومات الأمان
│   │   └── Toast.jsx       # نظام الإشعارات والتنبيهات المخصصة
│   ├── Pages/              # الصفحات الأساسية (الرئيسية، من نحن، إلخ)
│   ├── services/
│   │   └── api.js          # خدمات الربط المباشر مع واجهات البرمجة (API)
│   ├── App.css             # التنسيقات المخصصة والأنيميشن التفاعلي
│   ├── index.css           # النظام اللوني والمتغيرات الأساسية للمنصة
│   ├── App.jsx             # محرك التوجيه الأساسي وإدارة الحالة المشتركة
│   └── main.jsx            # نقطة انطلاق التطبيق الفهرسية
├── package.json            # الاعتمادات ومكتبات التشغيل
├── vite.config.js          # إعدادات أداة البناء الفائقة Vite
└── README.md               # دليل التوثيق الحالي
```

---

## 🔌 تفاصيل واجهات API المربوطة / API Endpoints Integrated

تتصل المنصة مباشرة بالخلفية السحابية الموثقة عبر العمليات التالية:

| العملية | المسار (Endpoint) | الطريقة (Method) | الغرض |
| :--- | :--- | :---: | :--- |
| **جلب الملف الشخصي** | `/api/user/profile` | `GET` | تحميل بيانات المستخدم الحالي (يتطلب `Authorization` token) |
| **تحديث الملف الشخصي** | `/api/user/profile` | `PUT` | تعديل (اسم المستخدم، الهاتف، العمر، الجنس) |
| **تغيير كلمة المرور** | `/api/user/changepassword` | `PATCH` | تحديث كلمة المرور القديمة بأخرى جديدة آمنة |

---

## 🚀 طريقة التثبيت والتشغيل / Installation & Setup

1. **نسخ المستودع (Clone the Repository):**
   ```bash
   git clone https://github.com/SalmaAmr2/Dawaya-UserProfile.git
   cd Dawaya-UserProfile
   ```

2. **تثبيت الاعتمادات (Install Dependencies):**
   ```bash
   npm install
   ```

3. **تشغيل بيئة التطوير (Run Development Server):**
   ```bash
   npm run dev
   ```
   *سيعمل التطبيق افتراضياً على الرابط المحلي: [http://localhost:5173](http://localhost:5173)*

4. **بناء نسخة الإنتاج (Build for Production):**
   ```bash
   npm run build
   ```

---

## 🎨 النظام اللوني والجمالي للمنصة / UI/UX Design System

تتبنى المنصة مظهرًا معاصرًا يتميز بالآتي:
- **نظام الألوان HSL Tailored**: استخدام تدرج لوني أزرق سماوي نابض بالحياة (`#0284c7` إلى `#3b82f6`) كعلامة مميزة للمنصة الطبية.
- **بطاقات Glassmorphism**: استخدام خلفيات شبه شفافة مدعومة بتأثير غشاوة وتظليل ناعم يمنح عمقًا بصريًا.
- **تأثيرات حركية (Micro-Animations)**: تأثيرات تحويم وانتقالات سلسة على البطاقات والأزرار لزيادة التفاعل مع المستخدم.
=======
منصة متكاملة للرعاية الصحية وإدارة الصيدليات والوصفات الطبية بكل سهولة وأمان، مدمجة مع نظام الملف الشخصي المتميز للأعضاء.
>>>>>>> 636cdf5cd0c3fa8377d2c5bef70c1630d627487b
