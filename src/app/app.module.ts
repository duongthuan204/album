import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListComponent } from './component/list.component';
import { DetailComponent } from './component/detail.component';
import { NewAlbumComponent } from './component/new-album.component';
import { LazyLoadImageModule, ScrollHooks } from 'ng-lazyload-image';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    DetailComponent,
    NewAlbumComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    LazyLoadImageModule.forRoot(ScrollHooks)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
