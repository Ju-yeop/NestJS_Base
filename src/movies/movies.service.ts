/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
    private movies: Movie[] = [];

    getAll(): Movie[]{
        return this.movies;
    }

    getMovie(id: number): Movie{
        const movie = this.movies.find((movie) => movie.id === id);
        if(!movie){
            throw new NotFoundException(`Movie with ID ${id} not Found`);
        }
        return movie;
    }

    deleteMovie(id: number){
        this.getMovie(id);
        this.movies = this.movies.filter((movie) => movie.id !== id);
    }

    createMovie(movieData: CreateMovieDto){
        this.movies.push({
            id: this.movies.length + 1,
            ...movieData
        })
    }

    patchMovie(id: number, updateData: UpdateMovieDto){
        const movie = this.getMovie(id);
        this.deleteMovie(id);
        // console.log({...movie});
        // console.log({...updateData});
        // console.log({...movie, ...updateData});
        this.movies.push({...movie, ...updateData}); //자동병합?
    }
}
