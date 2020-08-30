import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Album } from 'src/app/model/album.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  album = new BehaviorSubject<Album>(null);
  albumData = this.album.asObservable();
  albumList = new BehaviorSubject<Array<Album>>(null);
  albumListData = this.albumList.asObservable();

  constructor() { }

  updateAlbumList(data) {
    this.albumList.next(data);
  }

  updateAlbum(data) {
    this.album.next(data);
  }

  getAlbumByIndex(i) {
    this.albumListData.subscribe(data => {
      this.updateAlbum(data[i]);
    })
  }
  deleteAlbumByIndex(i) {
    let list: Array<Album> = new Array;
    this.albumListData.subscribe(data => list = data);
    list.splice(i, 1);
    this.albumList.next(list);
  }
}
