import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator, MatSort } from "@angular/material";
import { MatTableDataSource } from "@angular/material/table";
import * as SecureLS from "secure-ls";
import { HttpService } from "src/app/http.service";

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.scss']
})
export class TransactionHistoryComponent implements OnInit {
  displayedColumns = ["name", "amount", "currency", "reference"];
  dataSource: MatTableDataSource<Transactions>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private service: HttpService) {
    var transactions: Transactions[] = [];
    var ls = new SecureLS();
    transactions = ls.get("transactions").data;

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(transactions);

  }

  ngOnInit() {
  }

  /**
   * Set the paginator and sort after the view init since this component will
   * be able to query its view for the initialized paginator and sort.
   */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }


}



export interface Transactions {
  name: string;
  amount: string;
  currency: string;
  reference: string;
}


