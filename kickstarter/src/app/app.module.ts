import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {MatToolbarModule, MatProgressSpinnerModule, MatAutocompleteModule, MatCardModule, MatButtonModule, MatIconModule, MatTableModule, MatSelectModule, MatInputModule, MatDialogModule, MatDialogRef} from '@angular/material';


import { MainPageComponent } from './main-page/main-page.component';
import { DialogOverviewExampleDialog } from './main-page/main-page.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    DialogOverviewExampleDialog
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule, MatAutocompleteModule, MatProgressSpinnerModule, MatCardModule, MatButtonModule, MatIconModule, MatTableModule, MatSelectModule, MatInputModule, MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [DialogOverviewExampleDialog]
})
export class AppModule { }
