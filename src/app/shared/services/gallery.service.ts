import { Injectable } from '@angular/core';
import {
  AngularFireList,
  AngularFireObject,
  AngularFireDatabase,
} from '@angular/fire/compat/database';
import { Image } from '../image';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GalleryService {
  imagesRef: AngularFireList<any>;
  imageRef: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase) {}

  AddImage(img: any) {
    this.imagesRef = this.db.list('images');
    this.imagesRef.push(img);
  }
  GetImage(id: string) {
    this.imageRef = this.db.object('images/' + id);
    return this.imageRef;
  }
  GetImageList() {
    return this.db
      .list<Image>('images')
      .snapshotChanges()
      .pipe(
        map((snapshot) =>
          snapshot.map((action) => {
            const key = action.payload.key; // Get the key from snapshot
            const data = action.payload.val() as Image;
            return { key, ...data } as Image;
          })
        )
      );
  }
  UpdateImage(img: Image) {
    this.imageRef = this.db.object('images/' + img.key);
    this.imageRef.update({
      filepath: img.filepath,
      url: img.url,
    });
  }
  DeleteImage(id: string) {
    this.imageRef = this.db.object('images/' + id);
    this.imageRef.remove();
  }
}
