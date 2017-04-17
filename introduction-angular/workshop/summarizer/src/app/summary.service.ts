import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class SummaryService {
  constructor(private http: Http) { }

  private endpoint = 'https://en.wikipedia.org/w/api.php?origin=*&format=json&action=query&exintro=&explaintext=';

  getSummary(searchText) {
    return this.http.get(`${this.endpoint}&prop=extracts&titles=${searchText}`)
      .map(result => result.json())
      .map(this.getFirstExtract);
  }

  // private helper function to extract desired Wikipedia data
  private getFirstExtract(response: any) {
    const pageId = Object.keys(response.query.pages)[0];
    const pageObject = response.query.pages[pageId];
    return pageObject.extract;
  }
}
