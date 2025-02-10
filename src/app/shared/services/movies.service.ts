import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';


const options={
  params:
  {
    include_adult:'false',
    include_video:'true',
    language:'en-US',
    page:'1',
    sort_by:'popularity.desc'
  },
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwN2UyOTA1ZTMxMGFkNWY0YzQ2MjlmMmQ5NTM1Yjk0OSIsIm5iZiI6MTczNjA1MTMyOS45NCwic3ViIjoiNjc3YTBhODEyYjA5N2IxNWEyNzRkMmUwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.pQNTC7RZuI-j3U7dV-X_IHRPwCo_UKHg1XWQo8_FybI'
  }
}
@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor() { }
  https=inject(HttpClient)

  getMovies()
  {
    return this.https.get<any>('https://api.themoviedb.org/3/discover/movie',options)
  }
  getTvShows() {
    return this.https.get('https://api.themoviedb.org/3/discover/tv', options)
  }

  getRatedMovies() {
    return this.https.get('https://api.themoviedb.org/4/account/677a0a812b097b15a274d2e0/movie/rated?page=1&language=en-US&sort_by=created_at.asc', options)
  }

  getBannerImage(id: number) {
    return this.https.get(`https://api.themoviedb.org/3/movie/${id}/images`, options)
  }

  getBannerVideo(id: number) {
    return this.https.get(`https://api.themoviedb.org/3/movie/${id}/videos`, options);
  }

  getBannerDetail(id: number) {
    return this.https.get(`https://api.themoviedb.org/3/movie/${id}`, options);
  }

  getNowPlayingMovies() {
    return this.https.get('https://api.themoviedb.org/3/movie/now_playing', options)
  }

  getPopularMovies() {
    return this.https.get('https://api.themoviedb.org/3/movie/popular', options)
  }

  getTopRated() {
    return this.https.get('https://api.themoviedb.org/3/movie/top_rated', options)
  }

  getUpcomingMovies() {
    return this.https.get('https://api.themoviedb.org/3/movie/upcoming', options)
  }
}
