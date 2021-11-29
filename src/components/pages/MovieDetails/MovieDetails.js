import { useHistory, useLocation, useParams } from "react-router"
// import { Link } from "react-router-dom"
import { MovieDetailsPage } from "../../MovieDetailsPage/MovieDetailsPage"
// import { CastPage } from "../CastPage/CastPage"
export default function MoviesDetails() {
    const params = useParams()
    const history = useHistory()
    const location = useLocation()
    // console.log(params.movieId, "PARAMS")
    const handleClick = () => {
        history.push(location?.state?.from?.pathname ?? '/')
    }
    return (<>
        <button type='button' onClick={handleClick}>back</button>
        <MovieDetailsPage id={params.movieId} />
        {/* <Link id={params.movieId} component={CastPage}>CAST</Link> */}
        {/* <CastPage id={params.movieId }>Cast</CastPage> */}
    </>)
}