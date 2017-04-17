import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class SummaryService {
  constructor(private http: Http) { }

  private endpoint = 'https://en.wikipedia.org/w/api.php?origin=*&format=json&action=query';

  getSummary(searchText) {
    return this.http.get(`${this.endpoint}&exintro=&explaintext=&prop=extracts&titles=${searchText}`)
      .map(result => result.json())
      .map(this.getFirst);
  }

  getImage(searchText) {
    return this.http.get(`${this.endpoint}&prop=pageimages&pithumbsize=200&titles=${searchText}`)
      .map(result => result.json())
      .map(this.getFirst);
  }

  // private helper function to extract desired Wikipedia data
  private getFirst(response: any) {
    const pageId = Object.keys(response.query.pages)[0];
    const pageObject = response.query.pages[pageId];
    return pageObject;
  }
}
