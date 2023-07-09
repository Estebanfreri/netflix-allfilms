import {useState, useEffect} from 'react'
import './Buscador.css'

const Buscador = () => {
  
    const [peliculas, setPeliculas] = useState([]);
    const [busqueda, setBusqueda] = useState ('');

    const MI_KEY = "79156668"

    useEffect(()=>{
        fetch (`http://www.omdbapi.com/?apikey=${MI_KEY}&s=${busqueda}`)
        .then (response => response.json())
        .then (data =>{
            setPeliculas(data.Search);
        })
        .catch (error =>{
            console.log(error);
        })
    },[busqueda])

    const handleSumbit = event =>{
        event.preventDefault();
        setBusqueda(event.target.busqueda.value)
    }
  
    return (
    <div>
        <form onSubmit={handleSumbit}>
<input type="text" name="busqueda" />
    <button type='submit'>Buscar</button>     
        </form>   
        <ul>
            {
                peliculas === undefined ? <h2>La pelicula no esta disponible en nuestra base de datos</h2> : peliculas.map(peli => (<li key={peli.imdbID}><img src={peli.Poster} alt={peli.Title} />{peli.Title}</li>))
}
        </ul>
      
    </div>
  )
}

export default Buscador