import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  apiBase:string = 'http://localhost:8080/'
  title: object | undefined | null
  constructor(private http: HttpClient) {}
  createTour() {
    this.http.post(`${this.apiBase}tours`,{title: 'Tours', description: 'My first tour'}).subscribe((data)=>{
        this.title = data;
    })
  }
}
