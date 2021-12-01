import { useEffect, useState } from "react"
import Loader from "react-loader-spinner"
import { List } from "../List/List"
import s from '../Searchpage/Searchpage.module.css'
export function Searchpage() {
    const [searchValue, setSearchValue] = useState('')
    const [serchedMovies, setSearchedMovies] = useState([])
    const [status, setStatus] = useState('idel')
    const handleCange = e => {
        setSearchValue(e.target.value)
    }
    const handleSubmit = e => {
        e.preventDefault()
        if (searchValue === '') {
            return alert('nothing to search!')
        }
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=fcc0ef14475399017866116cc9439b8c&language=en-US&query=${searchValue}&page=1&include_adult=false`)
            .then(res => res.json())
            .then(result => {
                setStatus('loading')
                setSearchedMovies(result)
                setStatus('success')
                
                localStorage.setItem('data', JSON.stringify(result))   
            })
            .catch(err => {
                console.log(err)
                setStatus('error')
            })
    }
    useEffect(() => {
        setSearchedMovies(JSON.parse(localStorage.getItem('data')))
    }, [])
     useEffect(() => {
         
         setStatus('success')
    }, [serchedMovies])

    return (<>
    <form onSubmit={handleSubmit} className={s.Form}> 
        <input
                name='searchValue'
                value={searchValue}
                type='text'
                placeholder='search movie'
                onChange={handleCange}
                className={s.searchForm}
                autoComplete="off"
                />
        </form>
        
        {status === 'loading' && <Loader
            className={s.Loader}
            type="TailSpin"
            color="#b2c4c4"
            height={100}
            width={100}/>}
        {status === 'error' && <p>somthint wrong, please try later</p>}
        {status === 'success' && serchedMovies && <List array={serchedMovies} />}
    </>)
}