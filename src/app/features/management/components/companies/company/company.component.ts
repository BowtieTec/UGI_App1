import {AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {UtilitiesService} from "../../../../../shared/services/utilities.service";
import {CompaniesService} from "../../users/services/companies.service";
import {AuthService} from "../../../../../shared/services/auth.service";
import {Subject} from "rxjs";
import {NewUserModel} from "../../users/models/newUserModel";
import {DataTableDirective} from "angular-datatables";
import {FormBuilder, FormGroup} from "@angular/forms";
import {DataTableOptions} from "../../../../../shared/model/DataTableOptions";
import {CompaniesModel} from "../../users/models/companies.model";

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit, AfterViewInit, OnDestroy {
  parkingId: string = this.authService.getParking().id;
  companies: CompaniesModel[] = [];
  /*Table*/
  @Input() subject: Subject<NewUserModel> = new Subject<NewUserModel>();
  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;
  dtTrigger: Subject<any> = new Subject();
  formGroup: FormGroup;

  constructor(private utilitiesService: UtilitiesService,
              private companyService: CompaniesService,
              private authService: AuthService,
              private formBuilder: FormBuilder) {
    this.formGroup = formBuilder.group({filter: ['']});
    this.getInitialData();
  }

  get dtOptions() {
    return DataTableOptions.getSpanishOptions(10);
  }

  ngOnInit(): void {
  }

  getInitialData() {

    this.getCompanies();
  }

  getCompanies(parkingId: string = this.parkingId) {
    return this.companyService.getCompanies(this.parkingId)
      .subscribe(data => {
        this.companies = data;
      });
  }


  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  editTheCompany(company: CompaniesModel) {

  }

  deleteTheCompany(company: CompaniesModel) {

  }

  private rerender() {
    if (this.dtElement != undefined) {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
        this.dtTrigger.next();
      });
    }
  }
}
