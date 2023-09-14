import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomtooltipDirective } from './customtooltip.directive';
import { TooltipCompComponent } from './tooltip-comp/tooltip-comp.component';
import { TagComponent } from './tag/tag.component';
import { ButtontagComponent } from './buttontag/buttontag.component';
import { HttpClientModule } from '@angular/common/http';
import { PlaylistComponent } from './playlist/playlist.component';
import { AudioplayerComponent } from './audioplayer/audioplayer.component';
import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './error/error.component';
import { SliderComponent } from './slider/slider.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { PlaylistpageComponent } from './playlistpage/playlistpage.component';
import { AddplaylistComponent } from './addplaylist/addplaylist.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    CustomtooltipDirective,
    TooltipCompComponent,
    TagComponent,
    ButtontagComponent,
    PlaylistComponent,
    AudioplayerComponent,
    HomeComponent,
    ErrorComponent,
    SliderComponent,
    SearchPageComponent,
    PlaylistpageComponent,
    AddplaylistComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule, ReactiveFormsModule

    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
