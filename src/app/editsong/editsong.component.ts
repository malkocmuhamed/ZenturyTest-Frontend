import { Component, OnInit } from '@angular/core';
import { Song } from '../_models/song.model';
import { SongService } from '../_services/song.service';
import { Category } from '../_models/category.model';
import { CategoryService } from '../_services/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-editsong',
  templateUrl: './editsong.component.html',
  styleUrls: ['./editsong.component.css']
})
export class EditsongComponent implements OnInit {

  loading = false;
  songModel = <Song>{};
  categories: Category[];
  songId: number;
  tempData: [];
  song: Song;


  constructor(
    private songService: SongService, 
    private categoryService: CategoryService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.params.subscribe((params) => {
      this.songId = params['id'];
    });

    this.getSongById(this.songId).subscribe((data: any) => {
      this.song = data;
      this.song = this.song;
    });
    this.getCategoriesList();
  }

  getSongById(id: number): Observable<Song> {
    return this.songService.getSongById(id);
  }

  getCategoriesList() {
    this.loading = true;
    this.categoryService.getAllCategories().subscribe(data => {
      this.categories = data;
      console.log(data);
    })
  }

  updateSong(): void {
    this.songService.editSong(this.songModel).subscribe(
      data => {
        alert("Song successfully edited!");
      })
  }

  radioGroupChange(event) {
    this.songModel.songRating = Number(event.value);
  }

  changeClient(event) {
    this.songModel.songId = Number(event.value);
  }

}

 
