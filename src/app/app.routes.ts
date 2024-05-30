import { Routes } from '@angular/router';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';
import { MoviesListComponent } from './components/movies-list/movies-list.component';

export const routes: Routes = [
  {
    path: 'movies/:id',
    component: MovieDetailComponent,
  },
  {
    path: 'movies',
    component: MoviesListComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'movies',
  },
  {
    path: '**',
    redirectTo: 'movies',
  },
];
