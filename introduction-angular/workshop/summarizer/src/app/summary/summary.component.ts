import { Component, OnInit } from '@angular/core';
import { SummaryService } from '../summary.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  private summary = 'Search for a summary';
  private imgUrl = '';

  constructor(private summaryService: SummaryService) { }

  ngOnInit() {
  }

  getSummary(searchText) {
    this.summaryService.getSummary(searchText).subscribe(result => {
      this.summary = result.extract;
    });

    this.summaryService.getImage(searchText).subscribe(result => {
      this.imgUrl = result.thumbnail.source;
    })
  }
}
