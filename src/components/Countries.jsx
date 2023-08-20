import Country from "./Country"

const Countries = ({ data, selectedRegion, searchQuery }) => {

  // const filteredCountries = selectedRegion
  //   ? data.filter(country => country.region === selectedRegion.name)
  //   : data;

  const filteredCountries = data.filter(country =>
    (country.name.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (selectedRegion === null || country.region === selectedRegion.name)
  );

  const renderedCountries = filteredCountries.map(country => {
    return <Country country={country} key={country.name} />
  })
  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {renderedCountries}
    </div>
  )
}

export default Countries