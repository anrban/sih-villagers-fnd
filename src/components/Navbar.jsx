// import React from "react";
// import { NavLink } from "react-router-dom";
// import { useTranslation } from "react-i18next"; // Import the hook
// import { Home, BarChart2, Trophy, User } from "lucide-react";

// export default function Navbar({ isLoggedIn }) {
//   const { t } = useTranslation(); // Use the hook to get the translation function

//   // The labels are now dynamic and will change based on the selected language
//   const navItems = [
//     { path: "/", label: t('home'), icon: <Home /> },
//     { path: "/reports", label: t('report'), icon: <BarChart2 /> },
//     { path: "/gamification", label: t('rewards'), icon: <Trophy /> },
//     { path: "/account", label: t('account'), icon: <User /> },
//   ];

//   const activeLinkStyle = {
//     color: '#0a9396', // Using a more vibrant color from your palette for active state
//     transform: 'scale(1.05)',
//   };

//   return (
//     <>
//       {/* Mobile Bottom Navbar */}
//       <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-gray-200/50 z-50">
//         <ul className="flex justify-around items-center h-16">
//           {navItems.map((item) => (
//             <li key={item.path}>
//               <NavLink 
//                 to={item.path} 
//                 style={({ isActive }) => isActive ? activeLinkStyle : undefined} 
//                 className="flex flex-col items-center justify-center w-20 text-gray-500 transition-all"
//               >
//                 {item.icon}
//                 <span className="text-xs mt-1">{item.label}</span>
//               </NavLink>
//             </li>
//           ))}
//         </ul>
//       </nav>

//       {/* Desktop Top Navbar */}
//       <nav className="hidden md:flex bg-primary text-text-light p-4 shadow-lg justify-between items-center">
//         <h1 className="text-2xl font-black">WaterGuard</h1>
//         <ul className="flex space-x-8 items-center">
//           {navItems.map((item) => (
//             <li key={item.path}>
//               <NavLink 
//                 to={item.path} 
//                 className={({ isActive }) => 
//                   `font-semibold hover:text-accent transition-colors pb-1 ${isActive ? 'text-accent border-b-2 border-accent' : ''}`
//                 }
//               >
//                 {item.label}
//               </NavLink>
//             </li>
//           ))}
//         </ul>
//       </nav>
//     </>
//   );
// }

import React from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next"; // 1. Import the hook
import { Home, BarChart2, Trophy, User } from "lucide-react";

export default function Navbar({ isLoggedIn }) {
  const { t } = useTranslation(); // 2. Use the hook to get the translation function

  // 3. The labels are now dynamic from your i18n.js file
  const navItems = [
    { path: "/", label: t('home'), icon: <Home /> },
    { path: "/reports", label: t('report'), icon: <BarChart2 /> },
    { path: "/gamification", label: t('rewards'), icon: <Trophy /> },
    { path: "/account", label: t('account'), icon: <User /> },
  ];

  return (
    <>
      {/* Mobile Bottom Navbar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-gray-200/50 z-50">
        <ul className="flex justify-around items-center h-16">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink 
                to={item.path} 
                // Use className function for cleaner active state styling
                className={({ isActive }) => 
                  `flex flex-col items-center justify-center w-20 transition-all ${isActive ? 'text-secondary font-bold' : 'text-gray-500'}`
                }
              >
                {item.icon}
                <span className="text-xs mt-1">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Desktop Top Navbar */}
      <nav className="hidden md:flex bg-primary text-text-light p-4 shadow-lg justify-between items-center">
        <h1 className="text-2xl font-black">{t('waterguard_title')}</h1>
        <ul className="flex space-x-8 items-center">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink 
                to={item.path} 
                className={({ isActive }) => 
                  `font-semibold hover:text-accent transition-colors pb-1 ${isActive ? 'text-accent border-b-2 border-accent' : ''}`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      {/* Add padding to the bottom of the page content to prevent overlap with the mobile nav */}
      <div className="md:hidden h-16" />
    </>
  );
}