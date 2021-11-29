import { useEffect, useState } from "react"
import Loader from "react-loader-spinner"
import { List } from "../List/List"
import s from '../Homepage/Homepage.module.css'
// import Spinner from "../Spinner/Spinner"
export function Homepage({ headertext }) {
    const [popular, setPopular] = useState([])
    const [status, setStatus] = useState('idel')
    
    useEffect(() => {
        if (popular === []) {
           return
       }
        fetch('https://api.themoviedb.org/3/trending/all/day?api_key=fcc0ef14475399017866116cc9439b8c')
            .then(res => res.json()
                .then((result) => {
                    setStatus('loading')
                    setPopular(result)
                    setStatus('success')
                })
                .catch(err => {
                    console.log(err)
                    setStatus('error')
            })
            
        )
    }, [])
    return (<div className={s.Conteiner}>
     
        {status === 'loading' && <Loader
            className={s.Loader}
            type="TailSpin"
            color="#b2c4c4"
            height={100}
            width={100}/>}
        {status === 'error' && <p>somthint wrong, please try later</p>}
        {status === 'success' &&
            <>
                <h1>{headertext}</h1>
                <List array={popular} /></>}
        
    </div>
        )
}




// https://api.themoviedb.org/3/search/movie?api_key=fcc0ef14475399017866116cc9439b8c&query=popular