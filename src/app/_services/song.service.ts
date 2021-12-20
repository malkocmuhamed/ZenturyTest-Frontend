import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { Song } from "../_models/song.model";
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class SongService {

    songsUrl = environment.baseUrl + '/api/song';

    constructor(private _http: HttpClient) { }

    postSong(song: Song) {
        return this._http.post<any>(this.songsUrl, song);
    }

    editSong(song: Song) {
        return this._http.put<any>(this.songsUrl, song);
    }
   
    getSongById(id: number): Observable<Song> {
        return this._http.get<Song>(this.songsUrl + '/' + id);
    }

    getAllSongs(): Observable<Song[]> {
        return this._http.get<Song[]>(this.songsUrl);
    }

    deleteSong(id: number) {
        this._http.delete(this.songsUrl + '/' + id).subscribe(data => {
            alert("Song with ID " + id + ": Successfully removed!");
        });     
    }
}