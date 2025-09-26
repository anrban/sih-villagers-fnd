import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "water_quality_title": "Water Quality: ",
      "water_quality_status": "Good",
      "water_quality_subtitle": "The water in your area is safe and meets all quality standards.",
      "live_alerts_title": "Live Alerts",
      "search_title": "Search Water Quality in India",
      "search_placeholder": "Enter a city name...",
      "search_ph": "pH Level",
      "search_tds": "TDS",
      "search_contamination": "Contamination",
      "search_smell": "Smell"
    }
  },
  hi: {
    translation: {
      "water_quality_title": "पानी की गुणवत्ता: ",
      "water_quality_status": "अच्छा",
      "water_quality_subtitle": "आपके क्षेत्र में पानी सुरक्षित है और सभी गुणवत्ता मानकों को पूरा करता है।",
      "live_alerts_title": "लाइव अलर्ट",
      "search_title": "भारत में पानी की गुणवत्ता खोजें",
      "search_placeholder": "शहर का नाम दर्ज करें...",
      "search_ph": "पीएच स्तर",
      "search_tds": "टीडीएस",
      "search_contamination": "संदूषण",
      "search_smell": "गंध"
    }
  },
  bn: {
    translation: {
      "water_quality_title": "জলের গুণমান: ",
      "water_quality_status": "ভালো",
      "water_quality_subtitle": "আপনার এলাকার জল নিরাপদ এবং সমস্ত গুণমানের মান পূরণ করে।",
      "live_alerts_title": "লাইভ সতর্কতা",
      "search_title": "ভারতে জলের গুণমান অনুসন্ধান করুন",
      "search_placeholder": "শহরের নাম লিখুন...",
      "search_ph": "পিএইচ স্তর",
      "search_tds": "টিডিএস",
      "search_contamination": "দূষণ",
      "search_smell": "গন্ধ"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;