import React, { useState } from "react"
import "./Sidebar.css"

const Sidebar = ({ onFilterChange }) => {
  const [selectedFilters, setSelectedFilters] = useState({
    category: '',
    priceRange: '',
    rarity: '',
    status: '',
    onSale: false,
    chains: '',
  })
  const [openFilters, setOpenFilters] = useState({})

  const handleFilterChange = (key, value) => {
    const newFilters = { 
      ...selectedFilters, 
      [key]: selectedFilters[key] === value ? '' : value 
    }
    setSelectedFilters(newFilters)
    onFilterChange(newFilters)
  }

  const toggleFilter = (filter) => {
    setOpenFilters((prevState) => ({
      ...prevState,
      [filter]: !prevState[filter],
    }))
  }

  return (
    <div className="sidebar">
      <div className="filters-header">
        <span className="filter-icon">☰</span>
        <h2>Filters</h2>
      </div>
      {["category", "rarity", "status", "onSale", "chains"].map((filter) => (
        <div key={filter} className="filter-item">
          <div className="filter-title" onClick={() => toggleFilter(filter)}>
            <span>{filter.charAt(0).toUpperCase() + filter.slice(1)}</span>
            <span className="chevron">
              {openFilters[filter] ? "▲" : "▼"}
            </span>
          </div>
          <div className={`filter-options ${openFilters[filter] ? 'show' : ''}`}>
            {filter === "category" && (
              <>
                {['Shoes', 'Dresses', 'Coats', 'Shirts', 'Pants'].map(category => (
                  <div className="filter-option" key={category} onClick={() => handleFilterChange('category', category)}>
                    {category}
                  </div>
                ))}
              </>
            )}
            {filter === "rarity" && (
              <>
                {['Secret Rare', 'Uncommon Rare', 'Ultra Rare'].map(rarity => (
                  <div className="filter-option" key={rarity} onClick={() => handleFilterChange('rarity', rarity)}>
                    {rarity}
                  </div>
                ))}
              </>
            )}
            {filter === "status" && (
              <>
                {['New', 'Available', 'Not Available'].map(status => (
                  <div className="filter-option" key={status} onClick={() => handleFilterChange('status', status)}>
                    {status}
                  </div>
                ))}
              </>
            )}
            {filter === "onSale" && (
              <label>
                <input
                  type="checkbox"
                  checked={selectedFilters.onSale}
                  onChange={(e) => handleFilterChange('onSale', e.target.checked)}
                />
                Product on Sale
              </label>
            )}
            {filter === "chains" && (
              <input
                type="text"
                placeholder="Chain Reference"
                value={selectedFilters.chains}
                onChange={(e) => handleFilterChange('chains', e.target.value)}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default Sidebar
