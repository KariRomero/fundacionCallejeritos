import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { filterAdoptions, getAdoptions } from '../../redux/adoptions/adoptionsActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSliders, faCat, faDog, faChildReaching, faSuitcaseMedical } from '@fortawesome/free-solid-svg-icons';

const Filter = () => {
  const initialFilters = {
    gender: '',
    getsAlongWithDogs: false,
    getsAlongWithCats: false,
    getsAlongWithChildren: false
  };

  const [filters, setFilters] = useState(initialFilters);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: type === 'checkbox' ? checked : value
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
    dispatch(getAdoptions()); // Restablecer filtros a su estado inicial
  };

  return (
    <section className='flex justify-around items-center'>

      <div className='flex justify-center items-center'>
        <FontAwesomeIcon icon={faDog} size="xl" className="w-8 h-8 p-2 text-primary bg-secondary rounded-full mr-2" />
        <label className='paragraph'>
          Se lleva bien con perros
        </label>
        <input
          type="checkbox"
          name="getsAlongWithDogs"
          checked={filters.getsAlongWithDogs}
          onChange={handleChange}
        />
      </div>

      <div className='flex justify-center items-center'>
        <FontAwesomeIcon icon={faCat} size="xl" className="w-8 h-8 p-2 text-primary bg-secondary rounded-full mr-2" />
        <label className='paragraph'>
          Se lleva bien con gatos
        </label>

        <input
          type="checkbox"
          name="getsAlongWithCats"
          checked={filters.getsAlongWithCats}
          onChange={handleChange}
        />
      </div>

      <div className='flex justify-center items-center'>
        <FontAwesomeIcon icon={faChildReaching} size="xl" className="w-8 h-8 p-2 text-primary bg-secondary rounded-full mr-2" />
        <label className='paragraph'>
          Se lleva bien con niños
        </label>
        <input
          type="checkbox"
          name="getsAlongWithChildren"
          checked={filters.getsAlongWithChildren}
          onChange={handleChange}
        />
      </div>
      
      <select name="gender" value={filters.gender} onChange={handleChange} className='paragraph bg-white'>
        <option value="">Hembra-Macho</option>
        <option value="hembra">Hembra</option>
        <option value="macho">Macho</option>
      </select>

      <div>
        <button className='menu-btn border border-secondary rounded-full hover:bg-secondary ' onClick={handleFilter}>
          Filtrar
          <FontAwesomeIcon icon={faSliders} className='ml-2' />
        </button>
        <button className='menu-btn border border-secondary rounded-full hover:bg-secondary' onClick={handleClearFilters}>Limpiar filtros</button>
      </div>

    </section>
  );
};

export default Filter;
