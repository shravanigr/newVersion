import { Component, OnInit, ViewChild } from '@angular/core';
import { Center, Reports } from 'src/models';
import { CentersServiceService } from '../centers-service.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';



@Component({
  selector: 'app-centers',
  templateUrl: './centers.component.html',
  styleUrls: ['./centers.component.css']
})
export class CentersComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ELEMENT_DATA!: Center[];
  displayedColumns: string[] = ['select', 'center_id', 'name', 'address', 'state_name', 'district_name', 'action'];
  dataSource = new MatTableDataSource<Center>(this.ELEMENT_DATA)
  selection = new SelectionModel<Center>(true, []);

  constructor(private service: CentersServiceService) { }

  ngOnInit(): void {
    this.getAllCenterDetails()
  }

  getAllCenterDetails() {
    this.service.centersDetails()
      .subscribe({
        next: (res: Reports) => {
          this.service.report = res;
          // console.log(res);
          this.dataSource = new MatTableDataSource(res.centers);
          this.dataSource.paginator = this.paginator;
          this.paginator.firstPage()
          this.dataSource.sort = this.sort;

        },
        error: (err) => {
          alert("error while getting the details")
        }
      })
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  checkboxLabel(row?: Center): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.center_id}`;
  }

  deleteSelectedRow() {
    console.log(this.selection.selected)
    this.selection.selected.forEach(row => {
      const index = this.dataSource.data.indexOf(row);
      console.log(index)
      this.dataSource.data.splice(index, 1);
      this.dataSource._updateChangeSubscription();


    })

  }



}



