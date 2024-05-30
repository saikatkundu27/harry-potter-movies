import { HttpResponse } from '@angular/common/http';
import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MovieDetail } from '../../models/app.model';
import { MillionDollarPipe } from '../../pipes/million-dollar.pipe';
import { MovieDurationPipe } from '../../pipes/movie-duration.pipe';
import { MovieApiService } from '../../services/movie-api.service';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [MovieDurationPipe, MillionDollarPipe],
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.css',
})
export class MovieDetailComponent implements OnInit, OnDestroy {
  @Input()
  id!: string;
  movieApiService: MovieApiService;
  subcription!: Subscription;
  movieDetails!: MovieDetail;
  router: Router;
  constructor() {
    this.movieApiService = inject(MovieApiService);
    this.router = inject(Router);
  }
  ngOnInit() {
    if (this.id) this.getMovieById(this.id);
  }
  ngOnDestroy() {
    this.subcription?.unsubscribe();
  }
  getMovieById(id: string): void {
    this.subcription = this.movieApiService.getMovieById(id).subscribe({
      next: (response: HttpResponse<MovieDetail>) => {
        if (response.status == 200 && response.body) {
          this.movieDetails = response.body;

        }
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
  navigateToMovieList(): void {
    this.router.navigate(['movies']);
  }
}
