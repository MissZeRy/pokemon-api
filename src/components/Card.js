import React from 'react'

function Card({ pokemon, handlePrev, handleNext, currentPage, totalPages }) {
    return (
        <div>
            <div className="pokemon-list">
                {pokemon.map((pokemon) => {
                    return (
                        <div key={pokemon.name} className='card'>
                            <div className="pokemon-image">
                                <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`} alt="" />
                            </div>
                            <div className="card-contenner">
                                <div className="card-details">
                                    <p className='id'>#00{pokemon.id}</p>
                                    <p className='name'>{pokemon.name.toUpperCase()}</p>
                                </div>
                                <div className="pokemon-type">
                                    {pokemon.types.map((type) => (
                                        <p className={`type ${type.type.name}`}>{type.type.name}</p>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )
                })}

            </div>
            <div>
                <div className="pagination">
                    <button className='btn-page' onClick={handlePrev} disabled={currentPage === 1}>Previous</button>
                    <button className='btn-page' onClick={handleNext} disabled={currentPage === totalPages}>Next</button>
                </div>
            </div>
        </div>

    )
}

export default Card