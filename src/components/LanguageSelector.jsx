import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

// You can easily add more Indian languages here
const languages = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'हिन्दी' },      // Hindi
  { code: 'bn', name: 'বাংলা' },      // Bengali
  { code: 'ta', name: 'தமிழ்' },      // Tamil
  { code: 'te', name: 'తెలుగు' },      // Telugu
  { code: 'mr', name: 'मराठी' },      // Marathi
  { code: 'gu', name: 'ગુજરાતી' },  // Gujarati
  { code: 'kn', name: 'ಕನ್ನಡ' },      // Kannada
  { code: 'pa', name: 'ਪੰਜਾਬੀ' },      // Punjabi
];

export default function LanguageSelector() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="relative max-w-xs">
      <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
      <select
        value={i18n.language}
        onChange={(e) => changeLanguage(e.target.value)}
        className="w-full pl-10 pr-4 py-2 bg-white/50 rounded-lg border-2 border-transparent focus:border-accent focus:outline-none transition appearance-none cursor-pointer"
        aria-label="Select language"
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
}