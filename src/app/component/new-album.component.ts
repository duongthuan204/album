import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Album } from 'src/app/model/album.model';

@Component({
  selector: 'app-new-album',
  templateUrl: './new-album.component.html',
  styleUrls: ['./new-album.component.css']
})
export class NewAlbumComponent implements OnInit {

  @Input() isDisplay: boolean;
  @Output() OutputEvent: EventEmitter<boolean> = new EventEmitter();
  @Output() AddNewAlbum: EventEmitter<Album> = new EventEmitter();

  album: Album = new Album();
  fileName: string;

  constructor() { }

  ngOnInit(): void {
  }

  closeDialog() {
    this.album = new Album();
    this.fileName = null;
    this.isDisplay = false;
    this.OutputEvent.emit(false);
    (<HTMLInputElement>document.getElementById('fileInput')).value = "";
  }

  createNewAlbum() {
    if (this.album.albumName == null || this.album.albumName.trim() == ''){
      this.album.albumName = 'My Album';
    }
    if(this.fileName == null || this.fileName == '') {
      this.album.coverImage = 'assets/default.png'
    }
    this.album.createDate = new Date();
    this.AddNewAlbum.emit(this.album);
    this.closeDialog();
  }

  validateImage(fileName) {
    let idxDot = fileName.lastIndexOf(".") + 1;
    let extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
    return (extFile == "jpg" || extFile == "jpeg" || extFile == "png")
  }

  uploadImage(event) {
    let file = event.target.files[0];
    if (!this.validateImage(file.name)) {
      alert('Only accept jpg/jpeg/png file!');
      (<HTMLInputElement>document.getElementById('fileInput')).value = "";
      return;
    }
    let reader = new FileReader();
    reader.onload = (() => {
      return () => {
        let result: string = reader.result as string;
        this.album.coverImage = result;
        this.fileName = file.name;
      }
    })();
    reader.readAsDataURL(file);
  }

}
