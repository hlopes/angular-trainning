import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

import { environment } from '../../../environments/environment.development'

@Injectable({ providedIn: 'root' })
export class ArticleService {
  constructor(private http: HttpClient) {}

  deleteArticle(slug: string): Observable<unknown> {
    const fullUrl = `${environment.apiUrl}/articles/${slug}`

    return this.http.delete(fullUrl)
  }
}
