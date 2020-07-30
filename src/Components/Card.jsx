import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import Loader from "react-loader-spinner"
import axios from 'axios';
import { GrNext, GrPrevious } from 'react-icons/gr'
import { FcCheckmark } from 'react-icons/fc'

const Card = () => {
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [data, setData] = useState(null);
    const [idData, setIdData] = useState(1);
    const [query, setQuery] = useState("")

    const characterLimit = 600;

    // the request to the api can be by the pokemon id (idData) or by its name (query).
    useEffect(() => {

        setIsLoading(true);
        setIsError(false);

        axios

            .get(`https://pokeapi.co/api/v2/pokemon/${query ? query : idData}`)

            .then((response) => {
                console.log(response.data);
                setData(response.data);
                setIdData(response.data.id)
                setIsLoading(false);
            })

            .catch(() => {
                setIsLoading(false);
                setIsError(true);
            });
    }, [idData, query]);

    const nextCharacter = () => {
        setQuery("");
        (idData === characterLimit)
            ? setIdData(1)
            : setIdData(idData + 1);
    };

    const previousCharacter = () => {
        setQuery("");
        (idData === 1)
            ? setIdData(characterLimit)
            : setIdData(idData - 1);
    }

    return (
        <div className="d-flex flex-column justify-content-center align-items-center">

            <div className="input-normal my-3 mx-5 w-30">
                <input
                    onChange={(e) => setQuery(e.target.value === " " ? 1 : e.target.value)}
                    type="text"
                    className="form-control"
                    placeholder="Buscador "
                    aria-label="Buscador por nombre"
                    aria-describedby="button-addon2" />
            </div>

            {isError && (
                <div className="alert alert-danger" role="alert">
                    Escriba un nombre o id de Pókemon válido!
                </div>
            )}

            {isLoading && (
                <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />
            )}

            {data && !isLoading && !isError && (
                <div>

                    <div className="container my-2 d-flex justify-content-center" >
                        <div >
                            <div className="display">
                                <img src={data.sprites.front_default} className="image" alt="pokemon-img" />
                            </div>
                            <div className="card-body d-flex flex-column justify-content-center">
                                <h5 className="card-title">{data.name}</h5>
                                <div className="card-description">
                                    <p className="title-description">Types:</p>

                                    {
                                        data.types.map(info => {
                                            return <span key={`key_${info.slot}`} > <FcCheckmark /> {info.type.name}</span>
                                        })
                                    }

                                    <p className="title-description">Abilities:</p>

                                    {
                                        data.abilities.map((info, index) => {
                                            return <span key={`key_${index}`} > <FcCheckmark /> {info.ability.name}</span>
                                        })
                                    }
                                </div>
                            </div>
                            <div className="btn-group" role="group" aria-label="Basic example">
                                <button
                                    title="Previous"
                                    type="button"
                                    className="btn-grey mx-1"
                                    onClick={previousCharacter}
                                >
                                    <GrPrevious />
                                </button>
                                <button
                                    title="Next"
                                    type="button"
                                    className="btn-grey"
                                    onClick={nextCharacter}
                                >
                                    <GrNext />
                                </button>
                            </div>
                        </div>

                    </div>

                </div>
            )}

        </div>
    );
}



export default Card