import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { map, Observable } from 'rxjs'

import { ArticleRequestInterface } from '../../../shared/types/articleRequest.interface'
import { ArticleInterface } from '../../../shared/types/article.interface'
import { environment } from '../../../../environments/environment'
import { ArticleResponseInterface } from '../../../shared/types/articleResponse.interface'
import { ActivatedRoute } from '@angular/router'

@Injectable({
  providedIn: 'root',
})
export class UpdateArticleService {
  slug = this.route.snapshot.paramMap.get('slug')

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
  ) {}

  updateArticle(
    slug: string,
    articleRequest: ArticleRequestInterface,
  ): Observable<ArticleInterface> {
    const fullUrl = `${environment.apiUrl}/articles/${slug}`

    return this.http
      .put<ArticleResponseInterface>(fullUrl, articleRequest)
      .pipe(map((response) => response.article))
  }
}
