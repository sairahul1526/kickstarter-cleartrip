import { Component, OnInit, Inject } from '@angular/core';
import {HttpClient} from "@angular/common/http";

import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  projects: any;
  allProjects: any;
  sort = 'SORT BY';
  states;
  names = [];
  formControl = new FormControl();
  selectedStates = [];

  myControl: FormControl = new FormControl();

  filteredOptions: Observable<string[]>;

  constructor(private http:HttpClient, public dialog: MatDialog) { }

  ngOnInit() {
    this.http.get('http://starlord.hackerearth.com/kickstarter').subscribe(res => this.load(res));
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(val => this.filter(val))
      );
  }

  filter(val: string): string[] {
    return this.names.filter(option =>
      option.toLowerCase().indexOf(val.toLowerCase()) === 0);
  }

  load(res) {
    this.projects = res;
    this.allProjects = res;
    let temp = new Set();
    let temp2 = new Set();
    for(var i = 0; i < this.projects.length; i++) {
      temp.add(this.projects[i]["state"]);
      temp2.add(this.projects[i]["title"]);
      this.projects[i]["end"] = new Date(this.projects[i]["end.time"]).toUTCString();
    }
    this.states = Array.from(temp).sort();
    this.names = Array.from(temp2).sort();
  }

  logg(name) {
    console.log(name);
    let temp;
    for(var i = 0; i < this.allProjects.length; i++) {
      if(this.allProjects[i].title == name) {
        temp = this.allProjects[i];
        break;
      }
    }
    
    let dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '450px',
      data: { project: temp }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("closed");
      
    });
  }

  sortChanged() {
    if(this.sort == "Percenatage Funded") {
      this.projects.sort(function(a, b) {
        return b["percentage.funded"] - a["percentage.funded"];
      });
    } else {
      this.projects.sort(function(a, b) {
        var keyA = new Date(a["end.time"]),
        keyB = new Date(b["end.time"]);

        if(keyA < keyB) return -1;
        if(keyA > keyB) return 1;
        return 0;
      });
    }
  }

  statesChanged() {
    console.log(this.selectedStates);
    let temp = new Set(this.selectedStates);
    if(this.selectedStates.length > 0) {
      this.projects = this.allProjects.filter(project => temp.has(project["state"]));
    } else {
      this.projects = this.allProjects;
    }
    this.sortChanged();
  }

}


@Component({
  selector: 'dialog-overview-example-dialog',
  template: `
  <mat-card class="item" style="margin: 10px">
        <h4>{{ data.project.title}}</h4>
        <div>
          <mat-icon style="display: inline-block;margin-right:10px;vertical-align: middle;">person</mat-icon>
          <small style="display: inline-block;vertical-align: middle;">{{ data.project.by }}</small>
        </div>
        <br>
        <p style="margin-bottom:20px;">{{ data.project.blurb }}</p>
        <p style="text-align:center;width:100%;padding:10px;margin:-10px;background-color:black; color:white;">{{ data.project["end"] }}</p>
        <div style="margin-top:10px;">
          <mat-icon style="display: inline-block;margin-right:10px;vertical-align: middle;">location_on</mat-icon>
          <p style="display: inline-block;vertical-align: middle;">{{ data.project.location }}</p>
        </div>
        <div>
          <table class="table" style="width:100%">
              <thead>
                <tr>
                  <th scope="col">{{ data.project["percentage.funded"] }}%<br>funded</th>
                  <th scope="col">{{ data.project["amt.pledged"] }}<br>pledged</th>
                  <th scope="col">{{ data.project["num.backers"] }}<br>backers</th>
                </tr>
              </thead>
            </table>
        </div>
      </mat-card>
  `,
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }


}