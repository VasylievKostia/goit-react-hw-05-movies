import { useState } from "react"
import { useLocation } from "react-router"
import { Link } from "react-router-dom"
import s from './List.module.css'
export function List({ array }) {
    const [baseImgUrl] = useState('https://image.tmdb.org/t/p/w500')
    const location = useLocation()
    return (
        
        <ul className={s.list }>
            {array.results.map(el => {
                return (<li key={el.id} className={s.listItem}>
                    <Link to={{
                        pathname: `/movies/${el.id}`,
                        state: {
                            from: location
                        }
                    }}>
                    <h2>{ el.title ?? el.name}</h2>
                    <img src={baseImgUrl + el.poster_path} alt={el.title ?? el.name} className={ s.img}/>
                    </Link>
             </li>)   
                
            }) }
        </ul>
        
    )
}