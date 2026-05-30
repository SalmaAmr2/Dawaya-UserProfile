import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { UserContext } from "../../Context/UserContext";
import { useContext } from "react";

export default function Navbar() {
  let { userLogin, setUserLogin } = useContext(UserContext);
  let navigate = useNavigate();
  function logout() {
    localStorage.removeItem("userToken");
    setUserLogin(null);
    navigate("/");
  }

  return (
    <>
      <header className="fixed w-full z-20 top-0 start-0">
        <nav className="bg-neutral-primary">
          <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
            <NavLink
              to="/"
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <img src={logo} className="w-35" alt="Flowbite Logo" />
            </NavLink>

            <div className="flex items-center space-x-6 rtl:space-x-reverse">
              {userLogin == null ? (
                <>
                  <NavLink
                    to="/register"
                    className="text-sm font-medium pl-5 hover:underline"
                  >
                    إنشاء حساب
                  </NavLink>
                  <NavLink
                    to="/login"
                    className="text-sm font-medium text-fg-brand hover:underline"
                  >
                    تسجيل الدخول
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink
                    to="/profile"
                    className="text-sm font-medium pl-5 hover:underline text-fg-brand"
                  >
                    الملف الشخصي
                  </NavLink>
                  <span
                    onClick={logout}
                    className="text-sm font-medium pl-5 hover:underline cursor-pointer"
                  >
                    تسجيل الخروج
                  </span>
                </>
              )}
            </div>
          </div>
        </nav>

        <nav className="bg-neutral-secondary-soft border-y border-default">
          <div className="max-w-screen-xl px-4 py-3 mx-auto">
            <div className="flex items-center">
              <ul className="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm">
                <li>
                  <NavLink
                    to="/"
                    className="text-heading hover:underline"
                    aria-current="page"
                  >
                    الرئيسيه
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/about" className="text-heading hover:underline">
                    من نحن{" "}
                  </NavLink>
                </li>
                <li>
                  <NavLink to="" className="text-heading hover:underline">
                    الصيدليات
                  </NavLink>
                </li>
                <li>
                  <NavLink to="" className="text-heading hover:underline">
                    خدمات{" "}
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>


        </nav>
      </header>
    </>
  );
}
