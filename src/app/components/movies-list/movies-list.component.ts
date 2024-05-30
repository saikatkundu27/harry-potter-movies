import { CommonModule } from '@angular/common';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { MovieListDetail } from '../../models/app.model';
import { MovieApiService } from '../../services/movie-api.service';
import { MovieListItemComponent } from '../movie-list-item/movie-list-item.component';

@Component({
  selector: 'app-movies-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MovieListItemComponent,
  ],

  templateUrl: './movies-list.component.html',
  styleUrl: './movies-list.component.css',
})
export class MoviesListComponent implements OnInit, OnDestroy {
  searchForm: FormGroup;
  movieApiService: MovieApiService;
  subcription!: Subscription;
  moviesList: MovieListDetail[] = [];
  filteredMoviesList: MovieListDetail[] = [];

  constructor() {
    this.movieApiService = inject(MovieApiService);
    this.searchForm = new FormGroup({
      title: new FormControl(''),
      releaseYear: new FormControl(''),
    });
  }
  ngOnInit() {
    this.getAllMovies();
    this.addSubscriptions();
  }
  ngOnDestroy() {
    this.subcription?.unsubscribe();
  }
  getAllMovies(): void {
    this.subcription = this.movieApiService.getAllMovies().subscribe({
      next: (data: HttpResponse<MovieListDetail[]>) => {
        if (data.status == 200) {
          this.moviesList = data.body || [];
          this.filteredMoviesList = data.body || [];
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  addSubscriptions(): void {
    this.searchForm.controls['title'].valueChanges.subscribe({
      next: (data: string) => {
        this.filterData(data ?? '', this.searchForm.value.releaseYear);
      },
    });
    this.searchForm.controls['releaseYear'].valueChanges.subscribe({
      next: (data: string) => {
        this.filterData(this.searchForm.value.title, data ?? '');
      },
    });
  }
  filterData(title: string, year: string): void {
    this.moviesList = this.filteredMoviesList.filter((el) => {
      return (
        el.title.toLocaleLowerCase().includes(title.toLocaleLowerCase()) &&
        el.release_date.split('-')[0].startsWith((year ?? '').toString())
      );
    });
  }
}
