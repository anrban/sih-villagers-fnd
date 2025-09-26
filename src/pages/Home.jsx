import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { MapPin, Search, Wind, Droplet, Waves, AlertTriangle } from "lucide-react";
import AvatarCanvas from "../components/AvatarCanvas";
import { useLocation } from "../hooks/useLocation";
import { fetchAlerts, searchCityWaterQuality } from "../utils/mockApi";
import LanguageSelector from "../components/LanguageSelector";

const InfoCard = ({ icon, title, value, color }) => (
  <div className="flex-1 flex items-center gap-3 p-4">
    <div className={`text-${color}-500`}>
      {React.cloneElement(icon, { size: 28 })}
    </div>
    <div>
      <h3 className="font-semibold text-text-dark/80">{title}</h3>
      <p className="font-bold text-lg text-primary">{value}</p>
    </div>
  </div>
);

export default function Home({ isLoggedIn }) {
  const { t } = useTranslation();
  const { city } = useLocation();
  const [alerts, setAlerts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [searchError, setSearchError] = useState(null);

  useEffect(() => {
    fetchAlerts().then(setAlerts);
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm) return;
    const result = await searchCityWaterQuality(searchTerm);
    if (result) {
      setSearchResult(result);
      setSearchError(null);
    } else {
      setSearchResult(null);
      setSearchError(`Data not found for "${searchTerm}".`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12 md:space-y-16">
      
      {/* --- LANGUAGE SELECTOR & HERO --- */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative text-center pt-8"
      >
        {/* The Language Selector is now part of the flow */}
        <div className="mb-8 flex justify-center">
            <LanguageSelector />
        </div>

        <div className="absolute inset-x-0 top-0 h-96 z-0 opacity-20 md:opacity-30">
          <AvatarCanvas modelUrl={'/character.glb'} />
        </div>

        <div className="relative z-10">
          <div className="flex justify-center items-center gap-2">
            <MapPin className="text-secondary" />
            <h1 className="text-2xl md:text-4xl font-bold text-primary">{city}</h1>
          </div>
          <p className="mt-2 text-3xl md:text-5xl font-black text-primary">
            {t('water_quality_title')}
            <span className="text-green-600">{t('water_quality_status')}</span>
          </p>
          <p className="mt-2 text-text-dark/70 max-w-lg mx-auto">
            {t('water_quality_subtitle')}
          </p>
        </div>
      </motion.div>

      {/* --- LIVE ALERTS --- */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-xl font-bold text-primary mb-4 text-center md:text-left">{t('live_alerts_title')}</h2>
        <div className="space-y-3">
          {alerts.map(alert => (
            <div key={alert.id} className="flex items-start gap-3 p-4 rounded-xl bg-red-500/10">
              <AlertTriangle className="text-red-500 mt-1 flex-shrink-0" />
              <p className="text-sm font-medium text-text-dark">{alert.message}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* --- CITY SEARCH --- */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-xl font-bold text-primary mb-4 text-center md:text-left">{t('search_title')}</h2>
        <form onSubmit={handleSearch} className="flex gap-2 mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t('search_placeholder')}
            className="w-full p-3 bg-white/50 rounded-lg border-2 border-transparent focus:border-accent focus:outline-none transition"
          />
          <button type="submit" className="p-3 bg-primary text-white rounded-lg hover:bg-secondary transition-colors">
            <Search />
          </button>
        </form>
        {searchResult && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 p-4 rounded-xl bg-white/50"
          >
            <h3 className="font-bold text-lg mb-2 text-center">{searchResult.city}</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <InfoCard icon={<Wind />} title={t('search_ph')} value={searchResult.pH} color="blue" />
              <InfoCard icon={<Droplet />} title={t('search_tds')} value={`${searchResult.tds} ppm`} color="green" />
              <InfoCard icon={<AlertTriangle />} title={t('search_contamination')} value={searchResult.contamination} color="yellow" />
              <InfoCard icon={<Waves />} title={t('search_smell')} value={searchResult.smell} color="purple" />
            </div>
          </motion.div>
        )}
        {searchError && <p className="text-red-500 text-sm mt-2 text-center">{searchError}</p>}
      </motion.div>
    </div>
  );
}