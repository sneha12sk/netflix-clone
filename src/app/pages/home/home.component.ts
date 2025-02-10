import { Component, inject, OnInit } from '@angular/core';
import { TmdbService } from '../../services/tmdb.service';
import { AuthService } from '../../shared/services/auth.service';
import { HeaderComponent } from '../../core/components/header/header.component';
import { CommonModule } from '@angular/common';
import { BannerComponent } from '../../core/components/banner/banner.component';
import { MoviesService } from '../../shared/services/movies.service';
import { MovieCarouselComponent } from "../../shared/component/movie-carousel/movie-carousel.component";
import { IVideoContent } from '../../shared/models/view-content.interface';
import { forkJoin, map, Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeaderComponent, BannerComponent, MovieCarouselComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'], // Corrected property name
})
export class HomeComponent implements OnInit {
  auth = inject(AuthService);
  movieService=inject(MoviesService)
  name: string | null = null;
  userProfileImg: string | null = null;
  bannerDetails=new Observable<any>();
  bannerVideo=new Observable<any>();


  sources=[this.movieService.getMovies(),
           this.movieService.getTvShows(),
           this.movieService.getRatedMovies(),
           this.movieService.getNowPlayingMovies(),
           this.movieService.getUpcomingMovies(),
           this.movieService.getPopularMovies(),
           this.movieService.getTopRated()
  ];
  
  movies: IVideoContent[] = [];
  tvShows: IVideoContent[] = [];
  ratedMovies: IVideoContent[] = [];
  nowPlayingMovies: IVideoContent[] = [];
  popularMovies: IVideoContent[] = [];
  topRatedMovies: IVideoContent[] = [];
  upcomingMovies: IVideoContent[] = [];

  ngOnInit(): void {
    // Ensure `sessionStorage` is accessed only in the browser
    if (typeof window !== 'undefined' && sessionStorage) {
      const loggedInUser = sessionStorage.getItem('loggedInUser');
      if (loggedInUser) {
        const user = JSON.parse(loggedInUser);
        this.name = user?.name || 'Guest User';
        this.userProfileImg = user?.picture || 'assets/default-profile.png';
      }
    }
  
    // Fetch Movies and TV Shows Data
    forkJoin(this.sources)
      .pipe(
        map(([movies, tvShows, ratedMovies, nowPlaying, upcoming, popular, topRated])=>{
          this.bannerDetails=this.movieService.getBannerDetail(movies.results[1].id);
          this.bannerVideo=this.movieService.getBannerVideo(movies.results[1].id);
          return {movies, tvShows, ratedMovies, nowPlaying, upcoming, popular, topRated}
        }))
      .subscribe({
        next: (res:any) => {
          this.movies = res.movies.results as IVideoContent[];
          this.tvShows = res.tvShows.results as IVideoContent[];
          this.ratedMovies = res.ratedMovies.results as IVideoContent[];
          this.nowPlayingMovies = res.nowPlaying.results as IVideoContent[];
          this.upcomingMovies = res.upcoming.results as IVideoContent[];
          this.popularMovies = res.popular.results as IVideoContent[];
          this.topRatedMovies = res.topRated.results as IVideoContent[];
          this.getMovieKey();
        },
        error: (err) => {
          console.error('Error fetching movie data', err);
        },
        
      });
  }
  
  getMovieKey()
        {
          this.movieService.getBannerVideo(this.movies[1].id)
          .subscribe(res=>
          {
            console.log(res);
          }
          )
        }

  signOut(): void {
    sessionStorage.removeItem('loggedInUser');
    this.auth.signOut();
  }
}
