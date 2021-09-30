import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ClipLoader from "react-spinners/ClipLoader";
import { useGlobalState, GlobalContext } from './components/globals';
import Pokemon from './components/Pokemon';
import Button from './components/Button';
import './App.css';

function App() {
  //prep all states
  const globalState = useGlobalState();
  const [data, setData] = useState([]);
  const [endpoint, setEndpoint] = useState('https://pokeapi.co/api/v2/pokemon/');


  useEffect(() => {
    /**
     * Fetches the pokemon data
     */
    const fetchData = async () => {
      //clean error before a new fetch
      globalState.setLoader(true);
      globalState.setError(false);
      //fetch the api data with axios based on the given endpoint URL(string)
      await axios.get(endpoint)
        .then(({ data }) => {
          //if data is recieved store it in the data state
          setData(data);
        })
        .catch((err) => {
          //if an error occurs log it and set the error state
          console.error(err);
          globalState.setError(true);
        });

      globalState.setLoader(false);
    }

    fetchData();
  }, [endpoint]); //fetch data when the endpoint has changed


  // Page content
  return (
    // GlobalContext provider usage to use some states globally across multiple child pages.
    <GlobalContext.Provider value={globalState}>
      {/* if there are results load the buttons and pokemons */}
      {data.results &&
        <>
          <div id='buttonWrapper'>
            <Button
              disabled={!data.previous}
              clickHandler={() => setEndpoint(data.previous)}
            >
              Vorige
            </Button>
            <Button
              disabled={!data.next}
              clickHandler={() => setEndpoint(data.next)}
            >
              Volgende
            </Button>
          </div>
          <div id='pokemonWrapper'>
            {data.results.map((pokemon) => {
              return <Pokemon key={pokemon.name} url={pokemon.url} />
            })}
          </div>
        </>
      }
      <div id='notice'>
        {/* while the loading is true show the spinner */}
        {globalState.loading &&
          <ClipLoader color={'red'} loading={globalState.loading} size={150} />
        }
        {/* if there are errors in the state from an api fetch failure show error message */}
        {globalState.error &&
          <>
            <h2>Missed the pokeball to catch pokemons.</h2>
            <br />
            <h3>Please try again by refreshing the page.</h3>
            <br />
            <h4>If this keeps happening please report this to pokemaster@pikapika.poke</h4>
          </>
        }
      </div>
    </GlobalContext.Provider>
  );
}

export default App;
