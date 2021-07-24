import React, { useEffect, useContext, useState } from 'react';
import { GlobalContext } from './globals';
import axios from 'axios';

function Pokemon({ url }) {
    const globalState = useContext(GlobalContext);
    const [pokemon, setPokemon] = useState(null);

    useEffect(() => {
        const fetchPokemon = async () => {
            globalState.setLoader(true);

            await axios.get(url)
                .then(({ data: pokemon }) => {
                    setPokemon(pokemon);
                })
                .catch((err) => {
                    //if an error occurs log it and set the error state
                    console.error(err);
                    globalState.setError(true);
                });

            globalState.setLoader(false);
        }
        fetchPokemon();
    }, [url]);


    return (
        <>
            {pokemon &&
                <div class='pokemon'>
                    <h2>{pokemon.name}</h2>
                    <img
                        class='pokemonImage'
                        alt='pokemon'
                        src={pokemon.sprites.front_default}
                    />
                    <span><b>Weight: </b>{pokemon.weight}</span>
                    <span><b>Moves: </b>{pokemon.moves.length}</span>
                    <span><b>Abilities: </b></span>
                    <ul id='abilityList'>
                        {pokemon.abilities.map((ability) => {
                            return (
                                <li class='ability' key={`${ability.ability.name}-${pokemon.name}`}>
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
