import React from "react";
import { getUpcomingMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateUpcomingMovies';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddToWatchListIcon from '../components/cardIcons/addToWatchList'



const UpcomingMoviesPage = (props) => {

  const {  data, error, isLoading, isError }  = useQuery('upcoming', getUpcomingMovies)

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  

  const upcomingMovies = data.results;

  // Redundant, but necessary to avoid app crashing.
  const upcomingList = upcomingMovies.filter(m => m.upcomingList)
  localStorage.setItem('watchList', JSON.stringify(upcomingList))
  const addToWatchList = (movieId) => true 

  return (
    <PageTemplate
      title="Upcoming Movies"
      upcomingMovies={upcomingMovies}
      action={(movie) => {
        return <AddToWatchListIcon movie={movie} />
      }}
    />
  );
};
export default UpcomingMoviesPage;