import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root',
  })
  export class PlaidService {
    static readonly CoinResource = 'https://api.coincap.io/v2';
    
    constructor(private http: HttpClient) {}

    getLinkToken(): Observable<any> {
        let params = new HttpParams({fromObject: {
            "client_id": environment.plaid_client_id,
            "secret": environment.plaid_secret,
            "client_name": "This Application",
            "country_codes": ["US"],
            "language": "en",
            "user.client_user_id": "unique_user_id",
            "products": ["auth"]
          }});


        return this.http.post<any>(`${environment.plaid_endpoint}/link/token/create`, {
        params: params,
        });
    }
  }