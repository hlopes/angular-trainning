import { Component, Input } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Store } from '@ngrx/store'
import { addToFavoritesActions } from './store/actions'

@Component({
  selector: 'mc-add-to-the-favorites',
  standalone: true,
  templateUrl: './addToFavorites.component.html',
  imports: [CommonModule],
})
export class AddToFavoritesComponent {
  @Input()
  isFavorited = false

  @Input()
  favoritesCount = 0

  @Input()
  articleSlug = ''

  constructor(private store: Store) {}

  handleLike() {
    this.store.dispatch(
      addToFavoritesActions.addToFavorites({
        isFavorited: this.isFavorited,
        slug: this.articleSlug,
      }),
    )

    if (this.isFavorited) {
      --this.favoritesCount
    } else {
      ++this.favoritesCount
    }

    this.isFavorited = !this.isFavorited
  }
}
