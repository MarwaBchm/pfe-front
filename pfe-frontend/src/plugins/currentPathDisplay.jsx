
import { useLocation } from 'react-router-dom';
import routeMap from './routesMap';

const CurrentPathDisplay = () => {
  const location = useLocation();
  
  const path = routeMap[location.pathname] || 'Unknown Path';
  const link = location.pathname || 'Unknown Path';


  return (
    <div className="current-path">
      <h6 className='text-gray-2 text-xs font-sans font-semibold'>{link}</h6>

      <h2 className=' text-2xl font-semibold font-sans text-blue-2 pt-1'>{path}</h2>

    </div>
  );
};

export default CurrentPathDisplay;
