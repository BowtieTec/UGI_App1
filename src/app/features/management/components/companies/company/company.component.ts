import {environment} from 'src/environments/environment';
import {PermissionsService} from './../../../../../shared/services/permissions.service';
import {AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {UtilitiesService} from "../../../../../shared/services/utilities.service";
import {CompaniesService} from "../../users/services/companies.service";
import {AuthService} from "../../../../../shared/services/auth.service";
import {Subject} from "rxjs";
import {NewUserModel} from "../../users/models/newUserModel";
import {DataTableDirective} from "angular-datatables";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DataTableOptions} from "../../../../../shared/model/DataTableOptions";
import {CompaniesModel} from "../../users/models/companies.model";
import {ParkingService} from "../../../../parking/services/parking.service";
import {ParkingModel} from "../../../../parking/models/Parking.model";
import {MessageService} from "../../../../../shared/services/message.service";

@Component({
  selector: 'app-company', templateUrl: './company.component.html', styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit, AfterViewInit, OnDestroy {
  idCompanyToEdit: string = '';
  companiesForm: FormGroup;
  companies: CompaniesModel[] = [];
  states: Array<any> = this.companyService.states;
  allParkingLot: ParkingModel[] = [];
  @ViewChild(DataTableDirective) dtElement!: DataTableDirective;
  /*Table*/
  @Input() subject: Subject<NewUserModel> = new Subject<NewUserModel>();
  private parkingId: string = this.authService.getParking().id;
  dtTrigger: Subject<any> = new Subject();
  formGroup: FormGroup;

  /* Permissions */
  create: string = environment.createLocal;
  disable: string = environment.disableLocal;
  edit: string = environment.editLocal;

  constructor(private utilitiesService: UtilitiesService,
              private companyService: CompaniesService,
              private authService: AuthService,
              private formBuilder: FormBuilder,
              private parkingService: ParkingService,
              private messageService: MessageService,
              private permissionService: PermissionsService) {
    this.formGroup = formBuilder.group({filter: ['']});
    this.companiesForm = this.createCompanyForm();
    this.getInitialData();
  }

  get dtOptions() {
    return DataTableOptions.getSpanishOptions(10);
  }

  get formCompanyValues(): CompaniesModel {
    return {
      name: this.companiesForm.get('name')?.value,
      parking: this.parkingId,
      place: this.companiesForm.get('place')?.value,
      status: this.companiesForm.get('status')?.value,
    }
  }

  get isSudo() {
    return this.authService.isSudo;
  }

  ifHaveAction(action: string) {
    return this.permissionService.ifHaveAction(action);
  }

  ngOnInit(): void {
  }

  editTheCompany(company: CompaniesModel) {
    if (!company.id) {
      this.messageService.error('Esta compañía no existe o no se seleciono una correcta.');
      return;
    }
    this.idCompanyToEdit = company.id;
    this.companiesForm.get('name')?.setValue(company.name);
    this.companiesForm.get('place')?.setValue(company.place);
    this.companiesForm.get('status')?.setValue(company.status ? 1 : 0);
    this.companiesForm.get('parking')?.setValue(company.parking.id);
  }

  getAndRerender = () => {
    this.getCompanies();
    this.rerender();
  }

  async saveCompany() {
    if (this.companiesForm.invalid) {
      this.messageService.error('', 'Datos no válidos o faltantes');
      return;
    }
    let newCompany = this.formCompanyValues;
    if (this.idCompanyToEdit) {
      newCompany.id = this.idCompanyToEdit;
      await this.companyService.editCompany(newCompany, this.getAndRerender).toPromise();
      this.idCompanyToEdit = '';
      return;
    }
    await this.companyService.createCompany(newCompany, this.getAndRerender).toPromise();
  }

  async deleteTheCompany(company: CompaniesModel) {
    if (!company.id) {
      this.messageService.errorTimeOut('Esta compañía no existe o no se seleciono una correcta.');
      return;
    }
    const response = await this.messageService.areYouSure(`¿Esta seguro que desea deshabilitar ${company.name}?`, 'Si', 'No').then(x => x);
    if (response.isConfirmed) {
      await this.companyService.deleteCompany(company.id, this.getAndRerender).toPromise();
    }
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  private getAllParkingLot() {
    return this.parkingService.getAllParking().then(x => {
      if (x.success) {
        this.allParkingLot = x.data.parkings;
      }
    })
  }

  private async getInitialData() {
    await this.getAllParkingLot();
    this.getCompanies();
  }

  private getCompanies(parkingId: string = this.parkingId) {
    return this.companyService.getCompanies(this.parkingId)
      .subscribe(data => {
        this.companies = data;
      });
  }

  private createCompanyForm() {
    return this.formBuilder.group({
      id: [],
      parking: [this.parkingId, [Validators.required]],
      name: ['', [Validators.required]],
      place: ['', [Validators.required]],
      status: [0, [Validators.required]],
      created_at: ['']
    })
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
