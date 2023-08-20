import { Link } from 'react-router-dom';
import Country from './Country';
import FilterByRegion from './FilterByRegion';
import Search from './Search';

const Countries = ({
  data,
  selectedRegion,
  searchQuery,
  handleSearchChange,
  onRegionChange,
  currentPage,
  handlePageChange
}) => {
  

  const filteredCountries = data.filter(
    (country) =>
      country.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedRegion === null || country.region === selectedRegion.name)
  );

  const itemsPerPage = 9;
  const totalPages = Math.ceil(filteredCountries.length / itemsPerPage);


  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const countriesToDisplay = filteredCountries.slice(startIndex, endIndex);

  const paginationButtons = [];
  for (let i = 1; i <= totalPages; i++) {
    paginationButtons.push(
      <button
        key={i}
        onClick={() => handlePageChange(i)}
        className={`px-2 py-1 ${
          currentPage === i
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 text-gray-700'
        }`}
      >
        {i}
      </button>
    );
  }

  const renderedCountries = filteredCountries.map((country) => {
    return (
      <Link to={`/country/${country.name}`} key={country.name}>
        <Country country={country} />
      </Link>
    );
  });

  return (
    <div className="w-full">
      <div className="flex flex-col h-full">
        <div>
          <div className="flex flex-col gap-5 md:flex-row justify-between mb-10">
            <Search
              term={searchQuery}
              handleSearchChange={handleSearchChange}
            />
            <FilterByRegion
              selectedRegion={selectedRegion}
              onRegionChange={onRegionChange}
            />
          </div>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {renderedCountries}
          </div>
        </div>
        {/* <div className=" mt-5 text-very-dark-blue-text dark:text-white bg-white dark:bg-dark-blue mx-auto shadow-md rounded-md text-sm">
          {paginationButtons}
        </div> */}
      </div>
    </div>
  );
};

export default Countries;
