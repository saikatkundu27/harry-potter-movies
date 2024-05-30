import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MovieListDetail } from '../../models/app.model';
import { MillionDollarPipe } from '../../pipes/million-dollar.pipe';
import { MovieDurationPipe } from '../../pipes/movie-duration.pipe';

@Component({
  selector: 'app-movie-list-item',
  standalone: true,
  imports: [CommonModule, MovieDurationPipe, MillionDollarPipe],
  templateUrl: './movie-list-item.component.html',
  styleUrl: './movie-list-item.component.css',
})
export class MovieListItemComponent {
  @Input('movie') movie!: MovieListDetail;
  router: Router;
  constructor() {
    this.router = inject(Router);
  }
  navigateToMovieDetail(id: string): void {
    this.router.navigate(['movies', id]);
  }
}
