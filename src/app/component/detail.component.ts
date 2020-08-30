import { Component, OnInit } from '@angular/core';
import { Album } from 'src/app/model/album.model';
import { Image } from 'src/app/model/image.model';
import { DataService } from 'src/app/services/data.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  album: Album = new Album();
  image: Image = new Image();
  albumIndex: number;
  isDisplay: boolean;
  currentIndex: number;
  defaultImage: string;
  isExpanded: boolean;
  isEditting: boolean;
  inputAlbumName: string;
  inputDescription: string;

  constructor(
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.defaultImage = 'assets/loading.gif';
    this.albumIndex = parseInt(this.route.snapshot.paramMap.get('index')) - 1;
    this.dataService.getAlbumByIndex(this.albumIndex);
    this.dataService.albumData.subscribe(data => this.album = data);
    if (this.album == null) {
      this.router.navigate(['']);
    }
  }

  updateAlbumData(album) {
    this.dataService.updateAlbum(album);
  }

  displayImage(image, index) {
    this.image = image;
    this.isDisplay = true;
    this.currentIndex = index;
  }

  moveToImage(index) {
    if (index == -1) {
      index = this.album.imageList.length - 1;
    } else if (index == this.album.imageList.length) {
      index = 0;
    }
    this.currentIndex = index;
    this.displayImage(this.album.imageList[index], index);
  }

  closeImage() {
    this.isDisplay = false;
  }

  likeImage(image) {
    image.like++;
    this.album.like++;
  }

  enableEdit() {
    this.isEditting = true;
    this.inputAlbumName = this.album.albumName;
    this.inputDescription = this.album.description;
  }

  saveEdit() {
    this.isEditting = false;
    if (this.inputAlbumName == null || this.inputAlbumName.trim() == ''){
      this.inputAlbumName = 'My Album';
    }
    this.album.albumName = this.inputAlbumName;
    this.album.description = this.inputDescription;
  }

  deleteImage(index, like) {
    if (confirm('Are you sure you want to delete this image?')) {
      this.album.imageList.splice(index, 1);
      this.album.like -= like;
      this.updateAlbumData(this.album);
    }
  }

  deleteAlbum() {
    if(confirm('Are you sure you want to delete this album and all the images?')) {
      this.router.navigate(['']);
      this.dataService.deleteAlbumByIndex(this.albumIndex);
    }
  }

  validateImage(fileName) {
    let idxDot = fileName.lastIndexOf(".") + 1;
    let extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
    return (extFile == "jpg" || extFile == "jpeg" || extFile == "png")
  }

  getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  uploadImage(event) {
    let file = event.target.files[0];
    if (!this.validateImage(file.name)) {
      alert('Only accept jpg/jpeg/png file!');
      (<HTMLInputElement>document.getElementById('fileInputImage')).value = "";
      return;
    }
    this.getBase64(file).then(
      data => {
        let image: Image = new Image();
        image.imageUrl = data as string;
        image.imageName = file.name;
        this.album.imageList.unshift(image);
        this.updateAlbumData(this.album);
        (<HTMLInputElement>document.getElementById('fileInputImage')).value = "";
      }
    );
  }

  uploadCover(event) {
    let file = event.target.files[0];
    if (!this.validateImage(file.name)) {
      alert('Only accept jpg/jpeg/png file!');
      (<HTMLInputElement>document.getElementById('fileInputCover')).value = "";
      return;
    }
    this.getBase64(file).then(
      data => {
        this.album.coverImage = data as string;
        this.updateAlbumData(this.album);
        (<HTMLInputElement>document.getElementById('fileInputCover')).value = "";
      }
    );
  }

  shortenParagraph(str, isExpanded) {
    if (isExpanded) return str;
    let maxLength = 250;
    if (str == null || str.length <= maxLength) {
      this.isExpanded = true;
      return str;
    }
    return str.substr(0, str.lastIndexOf(' ', maxLength)) + '... ';
  }

}
