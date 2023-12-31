import { useState, useEffect, useRef } from 'react'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'

const FilterByRegion = ({ selectedRegion, onRegionChange }) => {
  const options = [
    {name: 'Africa', value: 'Africa' },
    {name: 'Americas', value: 'Americas' },
    {name: 'Asia', value: 'Asia' },
    {name: 'Europe', value: 'Europe' },
    {name: 'Oceania', value: 'Oceania' },
  ]

  const [isOpen, setIsOpen] = useState(false);
  const divEl = useRef();

  useEffect(() => {
    const handler = (event) => {
      if(!divEl.current){
        return;
      }

      if(!divEl.current.contains(event.target)){
        setIsOpen(false);
      }
    }

    document.addEventListener('click', handler, true);

    return () => {
      document.removeEventListener('click', handler);
    }

  }, [])

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleRegionSelect = (option) => {
    setIsOpen(false);
    onRegionChange(option)
  }

  const renderedOptions = options.map(option => {
    return <span onClick={() => handleRegionSelect(option)} className="cursor-pointer" key={option.value}>{option.name}</span>
  })

  return (
    <div ref={divEl} className='relative w-[200px] p-4 text-very-dark-blue-text dark:text-white bg-white dark:bg-dark-blue flex items-center shadow-md rounded-md text-sm'>
      <div onClick={handleToggle} className='w-full flex items-center justify-between gap-2 cursor-pointer '>
        {selectedRegion?.name || <span>Filter By Region</span>}
        {isOpen ? <FiChevronDown /> : <FiChevronUp />}
      </div>
     {isOpen && <div className='w-full p-5 absolute top-[68px] left-0 bg-white dark:bg-dark-blue rounded-md flex flex-col gap-3 shadow-md z-40'>
        {renderedOptions}
      </div>}
    </div>
  )
}

export default FilterByRegion