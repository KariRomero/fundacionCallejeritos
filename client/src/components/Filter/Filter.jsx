import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { filterAdoptions, getAdoptions } from '../../redux/adoptions/adoptionsActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSliders, faCat, faDog, faChildReaching } from '@fortawesome/free-solid-svg-icons';

const Filter = () => {
  const initialFilters = {
    gender: '',
    getsAlongWithDogs: false,
    getsAlongWithCats: false,
    getsAlongWithChildren: false
  };

  const [filters, setFilters] = useState(initialFilters);
  const dispatch = useDispatch();

  const handleToggle = (name) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: !prevFilters[name]
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }));
  };

  const handleFilter = () => {
    const cleanedFilters = {
      ...filters,
      getsAlongWithDogs: filters.getsAlongWithDogs ? 'true' : '',
      getsAlongWithCats: filters.getsAlongWithCats ? 'true' : '',
      getsAlongWithChildren: filters.getsAlongWithChildren ? 'true' : ''
    };
    dispatch(filterAdoptions(cleanedFilters));
  };

  const handleClearFilters = () => {
    setFilters(initialFilters);
    dispatch(getAdoptions()); 
  };

  return (
    <section className='flex justify-around items-center'>

      <div className='flex justify-center items-center'>
        <button
          onClick={() => handleToggle('getsAlongWithDogs')}
          className={`menu-btn border rounded-full ${filters.getsAlongWithDogs ? 'rounded-full bg-primary text-secondary' : 'bg-white text-secondary'}`}
        >
          <FontAwesomeIcon icon={faDog} size="xl" className="mr-2" />
          <span>Se lleva bien con perros</span>
        </button>
      </div>

      <div className='flex justify-center items-center'>
        <button
          onClick={() => handleToggle('getsAlongWithCats')}
          className={`menu-btn border rounded-full ${filters.getsAlongWithCats ? 'rounded-full bg-primary text-secondary' : 'bg-white text-secondary'}`}
        >
          <FontAwesomeIcon icon={faCat} size="xl" className="mr-2" />
          <span>Se lleva bien con gatos</span>
        </button>
      </div>

      <div className='flex justify-center items-center'>
        <button
          onClick={() => handleToggle('getsAlongWithChildren')}
          className={`menu-btn border rounded-full ${filters.getsAlongWithChildren ? 'rounded-full bg-primary text-secondary' : 'bg-white text-secondary'}`}
        >
          <FontAwesomeIcon icon={faChildReaching} size="xl" className="mr-2" />
          <span>Se lleva bien con niños</span>
        </button>
      </div>
      
      <select name="gender" value={filters.gender} onChange={handleChange} className='paragraph bg-white'>
        <option value="">Hembra-Macho</option>
        <option value="hembra">Hembra</option>
        <option value="macho">Macho</option>
      </select>

      <div>
        <button className='menu-btn border border-secondary rounded-full hover:bg-secondary' onClick={handleFilter}>
          Aplicar filtros
          <FontAwesomeIcon icon={faSliders} className='ml-2' />
        </button>
        <button className='menu-btn border border-secondary rounded-full hover:bg-secondary' onClick={handleClearFilters}>
          Limpiar filtros
        </button>
      </div>

    </section>
  );
};

export default Filter;
