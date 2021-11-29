import { useEffect, useState } from "react"
import Loader from "react-loader-spinner"
// import { List } from "../List/List"

import s from './Cast.module.css'

export  function Cast({id}) {
    const [status, setStatus] = useState('init')
    const [castArr, setCastArr] = useState([])
    const [baseImgUrl] = useState('https://image.tmdb.org/t/p/w500')
    
    useEffect(() => {
        // if(castArr !== []){return}
        fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=fcc0ef14475399017866116cc9439b8c&language=en-US`)
        .then(res => res.json())
            .then(response => {
            setStatus('loading')
            setCastArr(response)
            setStatus('success')
            // console.log(castArr)
        })
    }, [id])
    
    // console.log(id,'id in CAST')
    // console.log(castArr)
    return (<>
        
        {status === 'loading' && <Loader
            className={s.Loader}
            type="TailSpin"
            color="#b2c4c4"
            height={100}
            width={100}/>}
        {castArr !== [] && status === 'success' && id  && <ul className={s.list}>
            {castArr.cast.map(el => {
                return(<li key={el.id}>
                    <p className={s.name}>{el.name}</p>
                    <p>Character:{el.character}</p>
                    <div className={s.imgWraper}>
                        <img src={baseImgUrl + el.profile_path} alt={el.name} className={s.img }/>
                    </div>
                </li>)
        })}
        </ul>}
    </>
    )
}