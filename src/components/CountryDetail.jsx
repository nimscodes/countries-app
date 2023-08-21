import { Link, useParams } from 'react-router-dom';
import { MdKeyboardBackspace } from 'react-icons/md';

const CountryDetail = ({ countries, currentPage }) => {
  const { name } = useParams();
  const country = countries.find((country) => country?.name.common === name);

  if (!country) {
    return <div>Country not found.</div>;
  }
  const handleGoBack = () => {
    window.history.back(); // Go back to the previous page
  };

  const getCountry = (code) => {
    return countries.find((country) => country?.cca3 === code);
  };

  const curr = Object.keys(country?.currencies).map((currencyCode, index) => {
    const currency = country?.currencies[currencyCode];
    return (
      <span key={currencyCode}>
        {index ? `, ${currency.name}` : currency.name}
      </span>
    );
  });

  const lang = Object.keys(country?.languages).map((langCode, index) => {
    const language = country?.languages[langCode];
    return <span key={langCode}>{index ? `, ${language}` : language}</span>;
  });

  const capitals = country?.capital.map((capital, index) => {
    return <span key={index}>{index ? `, ${capital}` : capital}</span>;
  });

  const renderedBorders = country.borders?.map((border) => {
    const country = getCountry(border);
    return (
      <Link
        key={country?.name.common}
        to={`/country/${country?.name.common}?page=${currentPage}`}
        className="rounded flex cursor-pointer justify-center items-center  bg-white dark:bg-dark-blue px-5 py-2 shadow-md"
      >
        {country?.name.common}
      </Link>
    );
  });

  return (
    <div className="w-full sm:w-5/6 lg:w-full text-[14px] xl:w-[90%] mx-auto text-very-dark-blue-text dark:text-white">
      <Link
        onClick={handleGoBack}
        className="mb-[60px] inline-flex cursor-pointer justify-center items-center gap-2 bg-white dark:bg-dark-blue px-6 py-2 shadow-md"
      >
        <MdKeyboardBackspace /> Back
      </Link>
      <div className="flex flex-col gap-[60px] md:items-center lg:flex-row lg:justify-between">
        <figure className="flex items-cemter w-full h-[260px] sm:h-[350px] lg:h-[420px] lg:flex-1">
          <img
            src={country?.flags.svg}
            alt={country?.name.common}
            className="w-full h-full object-cover"
          />
        </figure>
        <div className="w-full flex flex-col gap-[50px] lg:flex-1">
          <div className="flex flex-col gap-8">
            <h1 className="text-2xl font-bold">{country?.name.common}</h1>
            <div className="flex flex-col gap-[50px] md:flex-row  md:justify-between">
              <div className="flex flex-col gap-4">
                <p>
                  <span className="font-semibold mr-2">Official Name:</span>
                  {country?.name.official}
                </p>
                <p>
                  <span className="font-semibold mr-2">Population:</span>
                  {country?.population.toLocaleString()}
                </p>
                <p>
                  <span className="font-semibold mr-2">Region:</span>
                  {country?.region}
                </p>
                <p>
                  <span className="font-semibold mr-2">Sub Region:</span>
                  {country.subregion}
                </p>
                <p>
                  <span className="font-semibold mr-2">
                    {capitals.length > 1 ? 'Capitals' : 'Capital'}:
                  </span>
                  {capitals}
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <p>
                  <span className="font-semibold mr-2">UN Member:</span>
                  {country?.unMember ? 'Yes' : 'No'}
                </p>
                <p>
                  <span className="font-semibold mr-2">
                    {curr.length < 2 ? 'Currency' : 'Currencies'}:
                  </span>
                  {curr}
                </p>
                <p>
                  <span className="font-semibold mr-2">
                    {lang.length < 2 ? 'Language' : 'Languages'}:
                  </span>
                  {lang}
                </p>
              </div>
            </div>
          </div>
          <div className="flex md:items-start flex-col gap-5 md:flex-row">
            {country.borders && (
              <h2 className="flex  py-2 font-semibold">
                Border{country.borders.length >= 2 ? 'Countries' : 'Country'}:
              </h2>
            )}
            <div className="flex flex-1 flex-wrap gap-2">{renderedBorders}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryDetail;
