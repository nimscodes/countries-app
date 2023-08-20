import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import useDarkMode from './hooks/useDarkMode';
import Header from './components/Header';
import data from '../data.json';
import Countries from './components/Countries';
import CountryDetail from './components/CountryDetail';

function App() {
  const [colorTheme, setTheme] = useDarkMode();
  const [darkMode, setDarkMode] = useState(
    colorTheme === 'light' ? true : false
  );
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [term, setTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const handleSearchChange = (event) => {
    setTerm(event.target.value);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const onRegionChange = (option) => {
    setSelectedRegion(option);
  };

  const onToggleMode = (checked) => {
    setTheme(colorTheme);
    setDarkMode(!checked);
  };

  const countries = data;

  return (
    <Router>
      <div className="min-h-screen font-nunito-sans  bg-very-light-gray dark:bg-very-dark-blue text-very-dark-blue-text dark:text-white">
        <Header darkMode={darkMode} onToggleMode={onToggleMode} />
        <div className="w-full p-5 mx-auto">
          <Routes>
            <Route
              path="/"
              element={
                <Countries
                  data={countries}
                  selectedRegion={selectedRegion}
                  onRegionChange={onRegionChange}
                  searchQuery={term}
                  handleSearchChange={handleSearchChange}
                  currentPage={currentPage}
                  handlePageChange={handlePageChange}
                />
              }
            />
            <Route
              path="/country/:name"
              element={<CountryDetail countries={countries} currentPage={currentPage} />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
