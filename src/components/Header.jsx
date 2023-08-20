import React from 'react'
import ModeSwitcher from './ModeSwitcher'

const Header = ({ darkMode, onToggleMode }) => {
  return (
    <div className= 'py-6 px-5 bg-white text-sm dark:bg-dark-blue  shadow-md flex items-center justify-between'>
      <h1 className='font-semibold'>Where in the world?</h1>
      <ModeSwitcher  darkMode={darkMode} onToggleMode={onToggleMode}/>
    </div>
  )
}

export default Header