import { Cast } from "../../Cast/Cast";
import { useParams } from "react-router";
export function CastPage({ id }) {
    const params = useParams()
    // console.log(params.movieId)
    return <>
        <Cast id={params.movieId}/>  
    </>
}