import React, { useEffect, useContext, useState } from 'react';
import { GlobalContext } from './globals';
import axios from 'axios';

/**
 * 
 * @param {String} contains the string to fetch the pokemon data 
 * @returns render of the pokemon data in a nice manner
 */
function Pokemon({ url }) {
    // get and set the state hooks
    const globalState = useContext(GlobalContext);
    const [pokemon, setPokemon] = useState(null);

    useEffect(() => {
        const fetchPokemon = async () => {
            // when loading pokemons set the loader on true
            globalState.setLoader(true);

            // fetch the pokemon
            await axios.get(url)
                .then(({ data: pokemon }) => {
                    // when pokemon are found set the current found pokemon
                    setPokemon(pokemon);
                })
                .catch((err) => {
                    //if an error occurs log it and set the error state
                    console.error(err);
                    globalState.setError(true);
                });
            //the loading of the pokemons has finished and we set the loader to false.
            globalState.setLoader(false);
        }
        fetchPokemon();
    }, [url]); // fetch the new pokemen when the given url changes


    // render of the pokemon data
    return (
        <>
            {/* if there is a pokemon present we wanna show its data */}
            {pokemon &&
                <div class='pokemon'>
                    {/* show the pokemon name */}
                    <h2>{pokemon.name}</h2>
                    {/* show the pokemon image */}
                    <img
                        class='pokemonImage'
                        alt='pokemon'
                        src={pokemon.sprites.front_default}
                    />
                    {/* show pokemon metaData */}
                    <span><b>Weight: </b>{pokemon.weight}</span>
                    <span><b>Moves: </b>{pokemon.moves.length}</span>
                    <span><b>Abilities: </b></span>
                    <ul id='abilityList'>
                        {/* loop over all the pokemon's abilities and render them in a list */}
                        {pokemon.abilities.map((ability) => {
                            return (
                                //render list item with an always unique key, pokemon name followed by the ability
                                // see https://reactjs.org/docs/lists-and-keys.html#keys
                                <li class='ability' key={`${pokemon.name}-${ability.ability.name}`}>
                                    {ability.ability.name}
                                </li>
                            )
                        })}
                    </ul>
                </div>
            }
        </>
    );
}

export default Pokemon;
