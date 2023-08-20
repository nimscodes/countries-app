import { AiOutlineSearch } from 'react-icons/ai'

const Search = ({ term, handleSearchChange }) => {


  return (
    <div className='md:w-2/5 py-4 bg-white dark:bg-dark-blue flex items-center shadow-md rounded-md text-sm'>
      <figure className='flex items-center jusify-center px-5'>
        <AiOutlineSearch size={25} className='text-dark-gray dark:text-white' /> 
      </figure>
      <input value={term} onChange={handleSearchChange} type="text" placeholder='Search for a country...' className='flex-1 bg-transparent outline-none' />
    </div>
  )
}

export default Search