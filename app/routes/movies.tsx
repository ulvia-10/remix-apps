import { useLoaderData, useLocation } from "@remix-run/react";
import axios from "axios";
import CardList from "~/components/cardlist/cardlist";



export async function loader() {
    const response = await axios.get('https://api.themoviedb.org/3/movie/now_playing', {
        headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzOWExYjkxNjU3MGI0YjViOTAwNjMxOTE3ZDcxODRjNyIsIm5iZiI6MTY2MTg0MjMxMi4xMzY5OTk4LCJzdWIiOiI2MzBkYjM4ODIyNmM1NjAwOTJjYjk3NzQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.e5h5_lSw5O_ch5D2_pmDitFTDn9J89tb12VTNc_hjYU`
        }
    });
    return response.data;
}


export default function movies() {
    const movieData = useLoaderData<typeof loader>();

    return (
        <>
            <h1 className="capitalize text-center text-3xl">List Movies</h1><div className="p-10">
                <div className="grid grid-cols-6 ml-6 gap-5 ">
                    {movieData.results.map((item, key) =>
                        <CardList key={key} title={item.original_title} name={item.name} image={`https://image.tmdb.org/t/p/w500${item.backdrop_path}`} release={item.release_date} />
                    )
                    }
                </div>
            </div>
        </>
    )
}