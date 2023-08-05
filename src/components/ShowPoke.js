import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Card from './Card';

function ShowPoke() {

    const [pokemon, setPokemon] = useState([]);
    const [pokemonDetails, setPokemonDetails] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedType, setSelectedType] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const [pokemonPerPage] = useState(21);

    const fetchTodosUser = async () => {
        await axios.get('https://pokeapi.co/api/v2/pokemon?limit=500&offset=0')
            .then((response) => {
                getPokemon(response.data.results)
            });
    }

    const getPokemon = async (res) => {
        const promises = res.map(async (item) => {
            const result = await axios.get(item.url);
            return result.data;
        });

        const pokemonData = await Promise.all(promises);
        setPokemonDetails([...pokemonData]);
    }

    useEffect(() => {
        fetchTodosUser();
    }, []);

    const searchedPokemons = pokemonDetails.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredPokemons =
        selectedType === "all"
            ? searchedPokemons
            : searchedPokemons.filter((pokemon) =>
                pokemon.types.some((type) => type.type.name === selectedType)
            );

    const indexOfLastPokemon = currentPage * pokemonPerPage;
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonPerPage;
    const currentPokemons = filteredPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);
    const totalPages = Math.ceil(filteredPokemons.length / pokemonPerPage);

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };

    const handleSearchName = (event) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1);
    };

    const handleTypeChange = (event) => {
        setSelectedType(event.target.value);
        setCurrentPage(1);
    };

    return (
        <div>
            <h1>Pokémon</h1>
            <div className="search-poke">
                <input type="text" onChange={handleSearchName} />
                <button>Search</button>
                <select value={selectedType} onChange={handleTypeChange}>
                    <option value="all">All Types</option>
                    <option value="bug">Bug</option>
                    <option value="dark">Dark</option>
                    <option value="dragon">Dragon</option>
                    <option value="electric">Electric</option>
                    <option value="flying">Flying</option>
                    <option value="ghost">Ghost</option>
                    <option value="ground">Ground</option>
                    <option value="ice">Ice</option>
                    <option value="normal">Normal</option>
                    <option value="psychic">Psychic</option>
                    <option value="rock">Rock</option>
                    <option value="steel">Steel</option>
                    <option value="water">Water</option>
                    <option value="fairy">Fairy</option>
                    <option value="grass">Grass</option>
                    <option value="poison">Poison</option>
                    <option value="fire">Fire</option>
                    <option value="fighting">Fighting</option>

                </select>
            </div>
            <Card pokemon={currentPokemons} handlePrev={handlePrevPage} handleNext={handleNextPage} currentPage={currentPage} totalPages={totalPages} />
            
        </div>
    )
}

export default ShowPoke
