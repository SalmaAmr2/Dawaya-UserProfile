import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import * as yup from "yup";
import logo from "../../assets/11111.jpg";

export default function Register() {
  let navigate = useNavigate();

  const [apiError, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handelRegester(formValues) {
    setIsLoading(true);

    let { rePassword, ...dataToSend } = formValues;

    try {
      let { data } = await axios.post(
        `https://dawaya-back-end.vercel.app/api/auth/register`,
        dataToSend,
      );

      if (data.success) {
        setIsLoading(false);
        console.log(data.message);
        navigate("/verifyotp");
      }
    } catch (error) {
      setIsLoading(false);
      setApiError(error.response.data.message);
    }
  }

  let validationSchema = yup.object().shape({
    username: yup
      .string()
      .min(2, "الاسم يجب ألا يقل عن حرفين")
      .max(12, "الاسم يجب ألا يزيد عن 12 حرف")
      .required("الاسم مطلوب"),
    phone: yup
      .string()
      .matches(/^01[0125][0-9]{8}$/, "رقم الهاتف غير صحيح")
      .required("رقم الهاتف مطلوب"),
    email: yup
      .string()
      .email("البريد الإلكتروني غير صحيح")
      .required("البريد الإلكتروني مطلوب"),
    password: yup
      .string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
        "يجب أن تحتوي كلمة المرور على 8 أحرف على الأقل وحرف كبير ورقم",
      )
      .required("كلمة المرور مطلوبة"),
    rePassword: yup
      .string()
      .oneOf([yup.ref("password")], "كلمة المرور غير متطابقة")
      .required("تأكيد كلمة المرور مطلوب"),
  });

  let formik = useFormik({
    initialValues: {
      username: "",
      phone: "",
      email: "",
      password: "",
      rePassword: "",
      gender: "",
    },
    validationSchema,
    onSubmit: handelRegester,
  });

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-[#f6f7fb] py-10 px-4">
        <div className="w-full max-w-6xl bg-white rounded-[32px] overflow-hidden shadow-2xl flex flex-col lg:flex-row">
          <div
            className="hidden lg:flex flex-1 relative bg-cover bg-center min-h-[750px]"
            style={{ backgroundImage: `url(${logo})` }}
          >
            <div className="absolute inset-0 bg-sky-900/60"></div>

            <div className="relative z-10 flex flex-col justify-center items-center text-center text-white p-10 w-full">
              <span className="mb-4 text-lg font-light tracking-widest">
                دوايا
              </span>

              <h2 className="text-5xl font-extrabold leading-tight mb-6">
                رفيقك الصحي الرقمي الآمن
              </h2>

              <p className="text-lg text-sky-100 leading-8 max-w-md">
                منصة متكاملة لإدارة الصيدليات وتقديم الخدمات الطبية بسهولة
                واحترافية عالية.
              </p>

              <div className="flex gap-4 mt-10">
                <button className="px-6 py-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 hover:bg-white/30 duration-300">
                  دعم 24 ساعة
                </button>

                <button className="px-6 py-3 rounded-full bg-white text-sky-900 font-semibold hover:bg-sky-100 duration-300">
                  ابدأ الآن
                </button>
              </div>
            </div>
          </div>

          <div className="flex-1 bg-[#fcfbff] flex items-center justify-center px-6 py-12 lg:px-14">
            <div className="w-full max-w-md">
              <h2 className="text-4xl font-extrabold text-sky-700 mb-3 text-center">
                إنشاء حساب جديد
              </h2>

              <p className="text-gray-500 text-center mb-10">
                قم بإنشاء حسابك للبدء في استخدام منصة دوايا
              </p>

              <form onSubmit={formik.handleSubmit}>
                <div className="mb-5">
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    اسم المستخدم
                  </label>

                  <input
                    type="text"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    name="username"
                    value={formik.values.username}
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-sky-500"
                    placeholder="أدخل اسم المستخدم"
                  />
                </div>

                {formik.errors.username && formik.touched.username ? (
                  <div className="mb-5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm p-3">
                    {formik.errors.username}
                  </div>
                ) : null}

                <div className="mb-5">
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    رقم الهاتف
                  </label>

                  <input
                    type="text"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    name="phone"
                    value={formik.values.phone}
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-sky-500"
                    placeholder="أدخل رقم الهاتف"
                  />
                </div>

                {formik.errors.phone && formik.touched.phone ? (
                  <div className="mb-5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm p-3">
                    {formik.errors.phone}
                  </div>
                ) : null}
                
                <div className="mb-5">
                  <label className="block mb-3 text-sm font-medium text-gray-700">
                    النوع
                  </label>

                  <div className="flex gap-4">
                    <label className="flex-1 flex items-center justify-center gap-2 border border-gray-200 rounded-xl py-3 cursor-pointer hover:border-sky-500 transition">
                      <input
                        type="radio"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value="male"
                        name="gender"
                        checked={formik.values.gender === "male"}
                      />
                      ذكر
                    </label>

                    <label className="flex-1 flex items-center justify-center gap-2 border border-gray-200 rounded-xl py-3 cursor-pointer hover:border-sky-500 transition">
                      <input
                        type="radio"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value="female"
                        name="gender"
                        checked={formik.values.gender === "female"}
                      />
                      أنثى
                    </label>
                  </div>
                </div>

                <div className="mb-5">
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    البريد الإلكتروني
                  </label>

                  <input
                    type="email"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    name="email"
                    value={formik.values.email}
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-sky-500"
                    placeholder="name@example.com"
                  />
                </div>

                {formik.errors.email && formik.touched.email ? (
                  <div className="mb-5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm p-3">
                    {formik.errors.email}
                  </div>
                ) : null}

                <div className="mb-5">
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    كلمة المرور
                  </label>

                  <input
                    type="password"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    name="password"
                    value={formik.values.password}
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-sky-500"
                    placeholder="********"
                  />
                </div>

                {formik.errors.password && formik.touched.password ? (
                  <div className="mb-5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm p-3">
                    {formik.errors.password}
                  </div>
                ) : null}

                <div className="mb-6">
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    تأكيد كلمة المرور
                  </label>

                  <input
                    type="password"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    name="rePassword"
                    value={formik.values.rePassword}
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-sky-500"
                    placeholder="********"
                  />
                </div>

                {formik.errors.rePassword && formik.touched.rePassword ? (
                  <div className="mb-5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm p-3">
                    {formik.errors.rePassword}
                  </div>
                ) : null}
                {apiError ? (
                  <div className="mb-5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm p-3">
                    {apiError}
                  </div>
                ) : null}

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-700 text-white font-bold text-lg hover:scale-[1.01] duration-300 shadow-lg cursor-pointer"
                >
                  {isLoading ? (
                    <i className="fas fa-spinner fa-spin"></i>
                  ) : (
                    "إنشاء حساب"
                  )}
                </button>

                <p className="text-center text-gray-500 mt-6">
                  هل لديك حساب {" ؟ "}
                  <NavLink
                    to="/login"
                    className="text-sky-700 font-bold hover:underline"
                  >
                    تسجيل الدخول
                  </NavLink>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
