import { Component, OnInit, Input } from '@angular/core';
import { CentersServiceService } from '../centers-service.service';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Session, Slots } from 'src/models';

@Component({
  selector: 'app-form-details',
  templateUrl: './form-details.component.html',
  styleUrls: ['./form-details.component.css'],
})
export class FormDetailsComponent implements OnInit {
  detailsForm!: FormGroup;
  slotList: any;
 

  constructor(
    private formBuilder: FormBuilder,
    private service: CentersServiceService
  ) {}

  childName: string;

  ngOnInit(): void {
    this.detailsForm = this.formBuilder.group({
      name: [''],
      address: [''],
      phone: [''],
    });
    this.childName=this.service.name; //interaction between two unrelated components

    //   this.service.getSlotList().subscribe((slot: Slots[]) =>
    //     (this.slot = slot))
    //   }

    

  
  }
}
