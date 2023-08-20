import React from 'react'

const Country = ({ country }) => {
  return (
    <div className='w-[290px] mb-10 h-[320px] text-sm mx-auto justify-between text-very-dark-blue-text dark:text-white bg-white dark:bg-dark-blue flex flex-col gap-3 shadow-md rounded-md overflow-hidden'>
      <figure className='w-full h-1/2 shadow-md overlow-hidden'>
        <img className='w-full h-full object-cover' src={country.flag}  alt={country.name}/>
      </figure>
      <div className='flex flex-col p-4 gap-3 flex-1'>
        <h1 className='font-bold text-md'>{country.name}</h1>
        <div className='flex flex-col gap-2'>
          <p><span className='font-semibold'>Population:</span> {country.population.toLocaleString()}</p>
          <p><span className='font-semibold'>Region:</span> {country.region}</p>
          <p><span className='font-semibold'>Capital:</span> {country.capital}</p>
        </div>

      </div>
    </div>
  )
}

export default Country