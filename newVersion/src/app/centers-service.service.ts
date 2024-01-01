import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as Highcharts from 'highcharts';
import { map, Subject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { Center, Reports, Session, Slots } from 'src/models';

const url: string =
  'https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=560103&date=30-09-2021';

@Injectable({
  providedIn: 'root',
})
export class CentersServiceService {
  private subject = new Subject<any>();

  public report: Reports | undefined;
  name: string = "shravani";
  constructor(private http: HttpClient) {}

  public centersDetails(): Observable<Reports> {
    return this.http.get<Reports>(url);
  }

  public slotDetails(id: number): Slots[] {
    let slot = this.report?.centers.find((slot) => slot.session_id === id);
    if (slot?.slots) {
      return slot.slots;
      console.log(slot?.slots);
    }
    return [];
  }

  // sendFormDetails(){
  //   this.subject.next(true);
  // }

  // getFormDetails(){
  //   return this.subject.asObservable();

  // }
}
