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
  const [showFilter, setShowFilter] = useState(false);
  const dispatch = useDispatch();

  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };

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
    <section className='flex justify-start px-8 xl:justify-around xl:px-2 items-center'>
      {/*Desktop Filter */}
      <div className='hidden xl:flex justify-around items-center'>
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
      </div>

      {/** Mobile Filter */}
      <div className='xl:hidden'>
        <button onClick={toggleFilter} className='menu-btn border rounded-full text-secondary'>
          Filtros
          <FontAwesomeIcon icon={faSliders} className="cursor-pointer ml-6" size='sm' />
        </button>

        {showFilter && (
          <div className='absolute top-56 left-0 w-96 bg-white shadow-md py-2 px-8 rounded-md flex flex-col space-y-2 z-50'>

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

            <div className='flex'>
              <button className='menu-btn border border-secondary rounded-full hover:bg-secondary' onClick={handleFilter}>
                Aplicar filtros
              </button>
              <button className='menu-btn border border-secondary rounded-full hover:bg-secondary' onClick={handleClearFilters}>
                Limpiar filtros
              </button>
            </div>
          </div>

        )}
      </div>




    </section>
  );
};

export default Filter;
