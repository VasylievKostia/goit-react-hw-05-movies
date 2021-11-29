import { useState, useEffect } from "react/cjs/react.development"
import Spinner from "../Spinner/Spinner"
import s from './Reviews.module.css'

export function Reviews({ id }) {
    const [reviewsArr, setReviewsArr] = useState([])
    const [status, setStatus] = useState('init')
    const [baseImgUrl] = useState('https://image.tmdb.org/t/p/w500')

    useEffect(() => {
        // if(castArr !== []){return}
        fetch(`https://api.themoviedb.org/3/movie/${id}/reviews?api_key=fcc0ef14475399017866116cc9439b8c&language=en-US&page=1`)
        .then(res => res.json())
            .then(response => {
                if (response.total_results === 0 ) {
                    setStatus('error')
                    console.log("VSE PROPALO!!")
                }
            setStatus('loading')
            setReviewsArr(response)
            setStatus('success')
            // console.log(response.total_results)
            })
        .catch(err => {
                    console.log(err)
                    setStatus('error')
            })
    }, [])
    // console.log(reviewsArr)
    return (<>
        {status === 'loading' && <Spinner />}
        {status === 'error' && <p>The resource you requested could not be found.</p>}
        {reviewsArr.total_results === 0 && <p>No Reviews</p>}
        {reviewsArr !== [] && status === 'success' && <ul className={s.list}>
            {reviewsArr.results.map(el => {
                return (<li className={s.item} key={el.id}>
                    <div className={s.userDataThomb}> 
                        {el.author_details.avatar_path && <div className={s.imgThomb}>
                            <img src={baseImgUrl + el.author_details.avatar_path} alt={el.author_details.username} width='80' height='80' />
                        </div>}
                    <div className={s.username}>{el.author_details.username}</div>
                    </div>
                    <p className={s.content}>{el.content}</p>
            </li>)
            
        })}
        </ul>}
    </>)
}