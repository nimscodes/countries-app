import { useState } from "react";
import useDarkMode from './hooks/useDarkMode'
import Search from "./components/Search";
import Header from "./components/Header";
import FilterByRegion from "./components/FilterByRegion";
import data from '../data.json'
import Countries from "./components/Countries";

  function App() {
  const [colorTheme, setTheme] = useDarkMode();
  const [darkMode, setDarkMode] = useState(colorTheme === 'light' ? true : false);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [term, setTerm] = useState('');

  
  const handleSearchChange = (event) => {
    setTerm(event.target.value)
  }

  const onRegionChange = (option) => {
    setSelectedRegion(option)
  }

  const onToggleMode = (checked) => {
    setTheme(colorTheme);
    setDarkMode(!checked);
  }

  const albania = data[2];
  const countries = data;

  return (
   <div className="min-h-screen font-nunito-sans  bg-very-light-gray dark:bg-very-dark-blue text-very-dark-blue-text dark:text-white">
    <Header darkMode={darkMode} onToggleMode={onToggleMode} />
    <div className="w-full flex flex-col gap-5 md:flex-row justify-between p-5 mx-auto">
      <Search term={term} handleSearchChange={handleSearchChange} />
      <FilterByRegion selectedRegion={selectedRegion} onRegionChange={onRegionChange} />
    </div>
    <div className="w-full p-5 mx-auto mb-5">
      <Countries data={countries} selectedRegion={selectedRegion} searchQuery={term} />
    </div>
   </div>
  )
}

export default App
