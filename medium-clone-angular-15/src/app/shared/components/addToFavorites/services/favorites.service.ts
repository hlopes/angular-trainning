import { Injectable } from '@angular/core'
import { map, Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'

import { ArticleInterface } from '../../../types/article.interface'
import { environment } from '../../../../../environments/environment'
import { ArticleResponseInterface } from '../../../types/articleResponse.interface'

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  constructor(private http: HttpClient) {}

  addToFavorites(slug: string): Observable<ArticleInterface> {
    const url = this.getUrl(slug)

    return this.http
      .post<ArticleResponseInterface>(url, {})
      .pipe(map(this.getArticle))
  }

  removeFromFavorites(slug: string): Observable<ArticleInterface> {
    const url = this.getUrl(slug)
    return this.http
      .delete<ArticleResponseInterface>(url)
      .pipe(map(this.getArticle))
  }

  getUrl(slug: string): string {
    return `${environment.apiUrl}/articles/${slug}/favorite`
  }

  getArticle(response: ArticleResponseInterface): ArticleInterface {
    return response.article
  }
}
