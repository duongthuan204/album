import { Image } from 'src/app/model/image.model';

export class Album {
    albumName: string;
    createDate: Date;
    description: string;
    coverImage: string;
    like: number;
    star: boolean;
    isHide: boolean;
    imageList: Array<Image>;

    constructor() {
        {
          this.albumName = null;
          this.createDate = null;
          this.description = null;
          this.coverImage = null;
          this.like = 0;
          this.star = false;
          this.isHide = false;
          this.imageList = [];
        }
    }
}
