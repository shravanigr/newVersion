import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import * as Highcharts from 'highcharts';
import { Center, Reports, Session, Slots } from 'src/models';
import { CentersServiceService } from '../centers-service.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormDetailsComponent } from '../form-details/form-details.component';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.css'],
  providers: [CentersServiceService]
})
export class SessionsComponent implements OnInit {
  ELEMENT_DATA!: Session[];
  displayedColumns: string[] = [
    'session_id',
    'date',
    'available_capacity',
    'min_age_limit',
    'vaccine',
    'action',
  ];
  dataSource = new MatTableDataSource<Session>(this.ELEMENT_DATA);
  centerId: number;
  sessions: Session[];
  displayChart: boolean = false;

  highcharts = Highcharts;
  chartOptions: Highcharts.Options;

  @ViewChild('charts') public chartEl: ElementRef;
  detailsForm: FormGroup
 

  constructor(
    private service: CentersServiceService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
  
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.centerId = Number(params['center_id']);
      this.getAllSessionDetails(this.centerId);
    });
  }

  public getAllSessionDetails(id: number) {
    this.service.centersDetails().subscribe({
      next: (res: Reports) => {
        let center = res?.centers.find((center) => center.center_id === id);

        if (center?.sessions) {
          this.dataSource = new MatTableDataSource(center.sessions);
        }
      },
      error: (err) => {},
    });
  }

  getAllSlotDetails(row: Session) {
    console.log(row.slots);
    this.displayChart = true;
    this.loadChart(row.slots, row.vaccine);
  }

  loadChart(slot: Slots[], vaccine: string) {
    const seats: number[] = slot.map((slot) => slot.seats);
    const slotTimings: string[] = slot.map((slot) => slot.time);
    const title: string = vaccine;
    this.chartOptions = {
      chart: {
        type: 'bar',
      },
      title: {
        text: 'Slot Details',
      },

      xAxis: {
        categories: slotTimings,
        title: {
          text: 'Slot Timings',
        },
      },
      yAxis: {
        title: {
          text: 'Seats',
          align: 'high',
        },
        labels: {
          overflow: 'justify',
        },
      },

      plotOptions: {
        bar: {
          dataLabels: {
            enabled: true,
          },
        },
        series: {
          stacking: 'normal',
        },
      },
      credits: {
        enabled: false,
      },
      series: [
        {
          name: title,
          type: 'bar',
          data: seats,
        },
      ],
    };
  }

 

  onCreate(){
     this.dialog.open(FormDetailsComponent)
    
    }
    
    
  }


