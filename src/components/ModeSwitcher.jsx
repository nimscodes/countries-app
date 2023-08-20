import {IoSunnyOutline,IoMoonOutline} from 'react-icons/io5'

const ModeSwitcher = ({ darkMode, onToggleMode }) => {
  return (
    <div className='transition-opacity duration-200 flex items-center gap-3'>
      <div className='cursor-pointer' type='checkbox'  onClick={() => onToggleMode(darkMode)}>
      { darkMode ? <IoSunnyOutline size={20} /> : <IoMoonOutline /> }
      </div>
      <p>{darkMode ? 'Dark Mode' : 'Light Mode'}</p>
    </div>
  )
}

export default ModeSwitcher