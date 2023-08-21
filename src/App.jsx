import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios'
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
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then((response) => setCountries(response.data))
      .catch(error => console.error('Error fetching data:', error)) 
  }, []);

  const handleSearchChange = (event) => {
    setTerm(event.target.value);
  };

  const handlePageChange = (newPage) => {
    if (typeof newPage === 'number'){
      setCurrentPage(newPage);
    } 
  };

  const onRegionChange = (option) => {
    setSelectedRegion(option);
  };

  const onToggleMode = (checked) => {
    setTheme(colorTheme);
    setDarkMode(!checked);
  };

  console.log(countries)
  

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
