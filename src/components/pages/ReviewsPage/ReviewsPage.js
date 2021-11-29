// import { Cast } from "../../Cast/Cast";
import { Reviews } from "../../Reviews/Reviews";
import { useParams } from "react-router";
export function ReviewsPage({ id }) {
    const params = useParams()
    // console.log(params.movieId)
    return <>
        <Reviews id={params.movieId}/>  
    </>
}