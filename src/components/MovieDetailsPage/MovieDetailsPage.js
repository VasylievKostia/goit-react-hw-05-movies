import { Suspense, useEffect, useState } from "react"
import { Link, Route, Switch } from 'react-router-dom'
import s from './MovieDetailsPage.module.css'
// import { Cast } from "../Cast/Cast"
// import { Reviews } from "../Reviews/Reviews"
// import Loader from "react-loader-spinner"
import Spinner from '../Spinner/Spinner'
// import { useParams } from "react-router"
import { CastPage } from "../pages/CastPage/CastPage"
import { ReviewsPage } from "../pages/ReviewsPage/ReviewsPage"

export function MovieDetailsPage({id}) {
    const [status, setStatus] = useState('idel')
    const [details, setDetails] = useState('')
    // console.log(id)
    const [baseImgUrl] = useState('https://image.tmdb.org/t/p/w500')
    // const params = useParams()
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=fcc0ef14475399017866116cc9439b8c&language=en-US`)
            .then(res =>
                res.json()
                    .then((result) => {
                        if (result.status_code === 34) {
                            // console.log('VSE PROPALO')
                            setStatus('error')
                    
                    }
                        else {
                            setStatus('loading')
                    setDetails(result)
                    // console.log(result)
                    setStatus('success')
                    }
                })
                .catch(err => {
                    console.log(err)
                    setStatus('error')
            })
            
        )
    }, [])

    return (<>
        {status === 'loading' && <Spinner />}
        {status === 'error' && <p>The resource you requested could not be found.</p>}
        {status === 'success' && <>
        <h2>{details.title}</h2>
        <div className={s.conteiner}>
            <img src={baseImgUrl + details.poster_path} alt={details.title} width='300' height='400' />
            <div className={s.info}>
                <div className={s.subConteiner}>
                    <h3 className={s.subTitle}>Rating</h3> 
                    <p>{details.vote_average} ({details.vote_count} votes)</p>
                </div>
                <div className={s.subConteiner}>
                    <h3 className={s.subTitle}>Release date</h3>
                    <p> {details.release_date }</p>
                </div>
                <h3>Owerview</h3>
                <p>{details.overview}</p>
                <div className={s.subConteiner}>
                <h3>Genres</h3>
                <ul className={s.list}>
                    {details?.genres?.map(el => {
                       return(<li key={el.id} className={s.item}><p>{el.name}</p></li>) 
                    }
                    )}
                </ul>
                </div>
            </div>
            </div>
            <Link to={`/movies/${id}/cast`} className={s.link}>Cast</Link>
            <Link to={`/movies/${id}/reviews`} className={s.link}>Reviews</Link>
            <Suspense fallback={<Spinner/>}>
                <Switch>
                    <Route path='/movies/:movieId/cast' component={CastPage} />
                    <Route path='/movies/:movieId/reviews' component={ReviewsPage} />
                </Switch>
            </Suspense>
        {/* <Reviews id={id}/> */}
    </>}
       </> )
}