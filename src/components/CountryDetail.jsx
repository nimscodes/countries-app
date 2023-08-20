import { Link, useParams } from 'react-router-dom';
import { MdKeyboardBackspace } from 'react-icons/md';

const CountryDetail = ({ countries, currentPage }) => {
  const { name } = useParams();
  const country = countries.find((country) => country.name === name);

  if (!country) {
    return <div>Country not found.</div>;
  }
  const handleGoBack = () => {
    window.history.back(); // Go back to the previous page
  };

  const getCountry = (code) => {
    return countries.find((country) => country.alpha3Code === code);
  };

  

    const renderedBorders = country.borders?.map((border) => {
    const country = getCountry(border);
    return (
    <Link key={country.name} to={`/country/${country.name}?page=${currentPage}`} className="rounded flex cursor-pointer justify-center items-center  bg-white dark:bg-dark-blue px-5 py-2 shadow-md">
      {country.name}
    </Link>
    )
})

  return (
    <div className="w-full sm:w-5/6 lg:w-full xl:w-5/6 mx-auto text-very-dark-blue-text dark:text-white">
      <Link
        onClick={handleGoBack}
        className="mb-[60px] inline-flex cursor-pointer justify-center items-center gap-2 bg-white dark:bg-dark-blue px-6 py-2 shadow-md"
      >
        <MdKeyboardBackspace /> Back
      </Link>
      <div className="flex flex-col gap-[60px] md:items-center lg:flex-row lg:justify-between">
        <figure className="flex items-cemter w-full h-[260px] sm:h-[350px] lg:h-[420px] lg:flex-1">
          <img
            src={country.flag}
            alt={country.name}
            className="w-full h-full object-cover"
          />
        </figure>
        <div className="w-full flex flex-col gap-[50px] lg:flex-1">
          <div className="flex flex-col gap-8">
            <h1 className="text-2xl font-bold">{country.name}</h1>
            <div className="flex flex-col gap-[50px] md:flex-row  md:justify-between">
              <div className="flex flex-col gap-4">
                <p>
                  <span className="font-semibold mr-2">Native Name:</span>
                  {country.nativeName}
                </p>
                <p>
                  <span className="font-semibold mr-2">Population:</span>
                  {country.population.toLocaleString()}
                </p>
                <p>
                  <span className="font-semibold mr-2">Region:</span>
                  {country.region}
                </p>
                <p>
                  <span className="font-semibold mr-2">Sub Region:</span>
                  {country.subregion}
                </p>
                <p>
                  <span className="font-semibold mr-2">Capital:</span>
                  {country.capital}
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <p>
                  <span className="font-semibold mr-2">Top Level Domain:</span>
                  {country.topLevelDomain}
                </p>
                <p>
                  <span className="font-semibold mr-2">{country.currencies.length < 2 ? 'Currency' : 'Currencies'}:</span>
                  {country.currencies.map((currency, index) =>
                    index ? `, ${currency.name}` : currency.name
                  )}
                </p>
                <p>
                  <span className="font-semibold mr-2">{country.languages.length < 2 ? 'Language' : 'Languages'}:</span>
                  {country.languages.map((language, index) =>
                    index ? `, ${language.name}` : language.name
                  )}
                </p>
              </div>
            </div>
          </div>
          <div className="flex md:items-start flex-col gap-5 md:flex-row">
            { country.borders &&  <h2 className="flex  py-2 font-semibold">Border{country.borders.length >= 2 ? 'Countries' : 'Country'}:</h2>}
            <div className="flex flex-1 flex-wrap gap-2">
              {renderedBorders}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryDetail;
