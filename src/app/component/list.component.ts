import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Album } from 'src/app/model/album.model';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  album: Album = new Album();
  albumList: Array<Album> = new Array;
  isDisplayNewAlbum: boolean;
  defaultImage: string;
  isSorting: boolean;
  isSearching: boolean;
  isFiltering: boolean;
  searchText: string;
  totalAlbum: number;

  constructor(
    private dataService: DataService,
    private router: Router) { }

  ngOnInit(): void {
    this.defaultImage = 'assets/loading.gif';
    this.dataService.albumListData.subscribe(data => this.albumList = data);
    (<HTMLInputElement>document.getElementById('loading')).style.display = "none";
    this.search('');
    this.scrollToTop();
  }

  ngAfterViewChecked() {
    //ng-lazy-load-image need scroll event to load image when view changed
    window.dispatchEvent(new CustomEvent('scroll', {}));
  }

  scrollToTop() {
    window.scrollTo(0, 0);
  }

  goToDetail(i) {
    (<HTMLInputElement>document.getElementById('loading')).style.display = "";
    setTimeout(() => {
      this.router.navigate(['album/' + (i + 1)]);
    }, 100);
  }

  updateAlbumData(album) {
    this.dataService.updateAlbum(album);
  }

  updateAlbumListData(albumList) {
    this.dataService.updateAlbumList(albumList);
  }

  addNewAlbum(album) {
    this.albumList.unshift(album);
    this.updateAlbumListData(this.albumList);
    setTimeout(() => {
      (<HTMLInputElement>document.getElementById('album_0')).classList.add('fade');
    });
    setTimeout(() => {
      (<HTMLInputElement>document.getElementById('album_0')).classList.remove('fade');
    }, 2000);
  }

  displayNewAlbum() {
    this.isDisplayNewAlbum = true;
  }

  receiveValue($event) {
    this.isDisplayNewAlbum = $event;
  }

  search(searchText) {
    this.isFiltering = false;
    this.isSearching = !(searchText == null || searchText == '' || searchText.length == 0);
    this.totalAlbum = this.albumList.length;
    for (let album of this.albumList) {
      album.isHide = (album.albumName.toLowerCase().indexOf(searchText.toLowerCase()) < 0);
      if (album.isHide) this.totalAlbum--;
    }
    this.scrollToTop();
  }

  showFavoriteAlbum() {
    this.isSearching = false;
    this.isFiltering = !this.isFiltering;
    this.searchText = '';
    this.totalAlbum = this.albumList.length;
    for (let album of this.albumList) {
      if (this.isFiltering) {
        album.isHide = !album.star;
        if (album.isHide) this.totalAlbum--;
      } else {
        album.isHide = false;
      }
    }
    this.scrollToTop();
  }

  markFavorite (album) {
    album.star = !album.star;
    if(this.isFiltering && !album.star) {
      album.isHide = true;
      this.totalAlbum--;
    }
  }
}
