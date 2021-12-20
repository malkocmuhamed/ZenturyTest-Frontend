import { Component, OnInit } from '@angular/core';
import { Song } from '../_models/song.model';
import { SongService } from '../_services/song.service';
// import { CategoryService } from '../_services/category.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  selected: string = '';
  totalRecords: string;
  page: Number = 1;
  songs: Song[];
  name: any;

  constructor(private songService: SongService) { }

  ngOnInit(): void {
    this.getSongsList();
  }

  getSongsList(): void {
    this.songService.getAllSongs().subscribe(data => {
      this.songs = data;
      console.log(data);
    })
  }

  searchSong(): any {
    if ((this.name == "")) {
      this.ngOnInit();
    }
    else {
      this.songs = this.songs.filter(res => {
        return res.songName.toLocaleLowerCase().match(this.name.toLocaleLowerCase());
      });
    }
  }

  removeSong(id: number): void {
    let songsArray: Song[] = Array.from(this.songs);
    this.songService.deleteSong(id);
  }

}

