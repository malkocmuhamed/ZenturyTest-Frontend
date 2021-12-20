import { Component, OnInit } from '@angular/core';
import { Song } from '../_models/song.model';
import { SongService } from '../_services/song.service';
import { Category } from '../_models/category.model';
import { CategoryService } from '../_services/category.service';

@Component({
  selector: 'app-addsong',
  templateUrl: './addsong.component.html',
  styleUrls: ['./addsong.component.css']
})
export class AddsongComponent implements OnInit{

  loading = false;
  songModel = <Song>{};
  categories: Category[];


  constructor(private songService: SongService, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getCategoriesList();
  }

  getCategoriesList() {
    this.loading = true;
    this.categoryService.getAllCategories().subscribe(data => {
      this.categories = data;
      console.log(data);
    })
  }

  addSong(): void {
    this.songService.postSong(this.songModel).subscribe(
      data => {
        alert("Song successfully added!");
      })
  }

  radioGroupChange(event) {
    this.songModel.songRating = Number(event.value);
  }

  
  changeClient(event) {
    this.songModel.songId = Number(event.value);
  }


}
