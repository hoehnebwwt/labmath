import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from './i18n';
import './App.css';
import Simple from './simple';
import Pharmacy from './pharmacy';

function App() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('iv');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleLanguageToggle = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'es' : 'en');
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">{t('appTitle')}</h1>
        <div className="tab-navigation">
          <button 
            className={`tab-button ${activeTab === 'iv' ? 'active' : ''}`}
            onClick={() => handleTabChange('iv')}
          >
            {t('tabIV')}
          </button>
          <button 
            className={`tab-button ${activeTab === 'pharmacy' ? 'active' : ''}`}
            onClick={() => handleTabChange('pharmacy')}
          >
            {t('tabPharmacy')}
          </button>
          <button 
            className="lang-toggle"
            onClick={handleLanguageToggle}
          >
            {t('switchLang')}
          </button>
        </div>
      </header>
      <div className="App-intro">
        {activeTab === 'iv' && <Simple />}
        {activeTab === 'pharmacy' && <Pharmacy />}
      </div>
    </div>
  );
}

export default App;
