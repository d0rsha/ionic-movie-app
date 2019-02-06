import { MovieService } from './../../services/movie.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FavoriteService } from './../../services/favorite.service';
import { ApiService } from './../../services/api.service';
import { EmailComposer } from '@ionic-native/email-composer/ngx';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
})
export class MovieDetailsPage implements OnInit {

  film: any;
  information = null;
  isFavorite = false;
  filmId = null;

  /**
  * Constructor of our details page
  * @param activatedRoute Information about the route we are on
  * @param movieService The movie Service to get data
  */
  constructor(private activatedRoute: ActivatedRoute,
    private api: ApiService,
    private emailComposer: EmailComposer,
    private favoriteService: FavoriteService,
    private movieService: MovieService) { }

  ngOnInit() {
    /* this.filmId = this.activatedRoute.snapshot.paramMap.get('id');

    this.api.getFilm(this.filmId).subscribe(res => {
      this.film = res;
    });

    this.favoriteService.isFavorite(this.filmId).then(isFav => {
      this.isFavorite = isFav;
    }); */

    // Get the ID that was passed with the URL
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    // Get the information from the API
    this.movieService.getDetails(id).subscribe(result => {
      this.information = result;
    });

    this.favoriteService.isFavorite(this.filmId).then(isFav => {
      this.isFavorite = isFav;
    });
  }

  favoriteFilm() {
    this.favoriteService.favoriteFilm(this.filmId).then(() => {
      this.isFavorite = true;
    });
  }

  unfavoriteFilm() {
    this.favoriteService.unfavoriteFilm(this.filmId).then(() => {
      this.isFavorite = false;
    });
  }

  openWebsite() {
    window.open(this.information.Website, '_blank');
  }
}
