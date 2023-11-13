import {Component, Input, OnInit} from '@angular/core';
import {UtilsService} from "../../services/utils.service";
import {CommonModule} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'mc-pagination',
  templateUrl: './pagination.component.html',
  imports: [
    CommonModule,
    RouterLink
  ],
  standalone: true
})
export class PaginationComponent implements OnInit{
  @Input()
  total = 0

  @Input()
  limit = 20

  @Input()
  currentPage = 1

  @Input()
  url = ''

  pagesCount = 0
  pages: number[] = []

  constructor(private utilsService: UtilsService) {
  }

  ngOnInit(): void {
    this.pagesCount = Math.ceil(this.total / this.limit)
    this.pages = this.pagesCount > 0 ? this.utilsService.range(1, this.pagesCount) : []
  }
}
