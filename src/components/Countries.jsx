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
  handlePageChange,
}) => {
  const filteredCountries = data.filter(
    (country) =>
      country.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedRegion === null || country.region === selectedRegion.value)
  );

  const itemsPerPage = 9;
  const totalPages = Math.ceil(filteredCountries.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const countriesToDisplay = filteredCountries.slice(startIndex, endIndex);

  const displayPageNumbers = [];
  const maxDisplayPagesWithOneEllipsis = 4;
  const maxDisplayPagesWithTwoEllipses = 3;

  let startPage = Math.max(
    1,
    currentPage - Math.floor((maxDisplayPagesWithTwoEllipses - 1) / 2)
  );
  let endPage = Math.min(
    startPage + maxDisplayPagesWithTwoEllipses - 1,
    totalPages
  );

  if (totalPages > maxDisplayPagesWithOneEllipsis) {
    if (startPage > 1) {
      displayPageNumbers.push(1);
    }

    if (Math.abs(currentPage - startPage) >= 2) {
      displayPageNumbers.push('...');
    }

    for (let i = startPage; i <= endPage; i++) {
      displayPageNumbers.push(i);
    }

    if (Math.abs(currentPage - endPage) >= 2) {
      displayPageNumbers.push('...');
    }

    if (endPage < totalPages) {
      displayPageNumbers.push(totalPages);
    }
  } else {
    for (let i = 1; i <= totalPages; i++) {
      displayPageNumbers.push(i);
    }
  }

  console.log(displayPageNumbers);

  const paginationButtons = displayPageNumbers.map((pageNumber) => (
    <button
      key={pageNumber}
      onClick={() => handlePageChange(pageNumber)}
      className={`px-3 py-2 shadow-md rounded overflow-hidden ${
        currentPage === pageNumber ? 'bg-dark-gray text-very-light-gray' : ''
      }`}
    >
      {pageNumber}
    </button>
  ));

  const renderedCountries = countriesToDisplay.map((country) => {
    return (
      <Link to={`/country/${country.name}`} key={country.name}>
        <Country country={country} />
      </Link>
    );
  });

  return (
    <div className="relative w-full">
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
            <div className="sm:flex items-center justify-between flex-wrap">
              {renderedCountries}
            </div>
        </div>
        <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2  mt-5 text-very-dark-blue-text dark:text-white bg-white dark:bg-dark-blue mx-auto shadow-md rounded-md text-sm">
          {paginationButtons}
        </div>
      </div>
    </div>
  );
};

export default Countries;
