import {Component, Input} from "@angular/core";
import {CommonModule} from "@angular/common";

import {PopularTagType} from "../types/popularTag.type";

@Component({
  selector: 'mc-tag-list',
  templateUrl: './tagList.component.html',
  standalone: true,
  imports: [CommonModule]
})
export class TagListComponent {
  @Input()
  tags:PopularTagType[] = []
}
