import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AnalysisService {
  uri = environment.api_url + '/analysis';

  constructor(private http: HttpClient) {}

  getSentimentOverTime(): Observable<any> {
    return this.http.get(`${this.uri}/sentimentOverTime`, {
      withCredentials: true // <=========== important!
    });
  }

  getSentimentTrend(): Observable<any> {
    return this.http.get(`${this.uri}/sentimentTrend`, {
      withCredentials: true // <=========== important!
    });
  }

  getSentimentSummary(): Observable<any> {
    return this.http.get(`${this.uri}/sentimentSummary`, {
      withCredentials: true // <=========== important!
    });
  }

  getKeywordsSummary(): Observable<any> {
    return this.http.get(`${this.uri}/keywordsSummary`, {
      withCredentials: true // <=========== important!
    });
  }

  getEmotionalToneOverTime(): Observable<any> {
    return this.http.get(`${this.uri}/emotionalToneOverTime`, {
      withCredentials: true // <=========== important!
    });
  }

  getPostsByDate(limit, skip): Observable<any> {
    return this.http.get(`${this.uri}/listByPostDate`, {
      withCredentials: true,
      params: new HttpParams().set('skip', skip).set('limit', limit)
    });
  }
}
