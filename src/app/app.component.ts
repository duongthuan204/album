import { Component } from '@angular/core';
import { Album } from 'src/app/model/album.model';
import { Image } from 'src/app/model/image.model';
import * as faker from 'src/app/lib/faker.js';
import { DataService } from 'src/app/services/data.service';
import { config } from 'src/assets/config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'album';
  albumList: Array<Album> = new Array;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.seedData();
    this.updateAlbumListData(this.albumList);
    this.dataService.albumListData.subscribe(data => this.albumList = data);
  }

  seedData() {
    function generateImage() {
      let image: Image = new Image();
      let imageName = faker.system.fileName();
      imageName = imageName.substring(0, imageName.lastIndexOf('.'));
      image.imageName = imageName + '.jpg';
      image.imageUrl = faker.image.image();
      image.like = faker.random.number(30);
      image.star = faker.random.boolean();
      return image;
    }
    function generateAlbum() {
      let album: Album = new Album();
      //album.albumName = faker.name.findName();
      album.albumName = faker.commerce.productName();
      let date = new Date(faker.date.past());
      album.createDate = date;
      album.description = faker.lorem.paragraphs();
      album.coverImage = faker.image.image();
      album.star = faker.random.boolean();
      let imageFrom = config.imageFrom || 50;
      let imageTo = config.imageTo || 100;
      let numberOfImage = Math.floor(Math.random() * (imageTo - imageFrom)) + imageFrom;
      for (let i = 0; i < numberOfImage; i++) {
        let image = generateImage();
        album.like += image.like;
        album.imageList.push(image);
      }
      return album;
    }
    let albumFrom = config.albumFrom || 30;
    let albumTo = config.albumTo || 50;
    let numberOfAlbum = Math.floor(Math.random() * (albumTo - albumFrom)) + albumFrom;
    for (let i = 0; i < numberOfAlbum; i++) {
      this.albumList.push(generateAlbum());
    }
  }

  updateAlbumListData(albumList) {
    this.dataService.updateAlbumList(albumList);
  }
}
