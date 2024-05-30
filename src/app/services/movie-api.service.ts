import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { MovieDetail, MovieListDetail } from '../models/app.model';

@Injectable({
  providedIn: 'root',
})
export class MovieApiService {
  constructor(private http: HttpClient) {}

  getAllMovies(): Observable<HttpResponse<MovieListDetail[]>> {
    return this.http.get<MovieListDetail[]>('/movies', {
      observe: 'response',
    });
  }
  getMovieById(id: string): Observable<HttpResponse<MovieDetail>> {
    return this.http.get<MovieDetail>(`/movies/${id}`, {
      observe: 'response',
    });
  }
}
