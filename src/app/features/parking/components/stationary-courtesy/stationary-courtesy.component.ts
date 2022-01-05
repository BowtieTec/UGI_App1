import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from '../../../../shared/services/message.service';
import { ParkingService } from '../../services/parking.service';
import { UtilitiesService } from '../../../../shared/services/utilities.service';
import { AuthService } from '../../../../shared/services/auth.service';
import { PermissionsService } from '../../../../shared/services/permissions.service';
import { environment } from '../../../../../environments/environment';
import { ParkingModel } from '../../models/Parking.model';
import { CourtesyService } from '../../../courtesy/services/courtesy.service';
import { StationsCourtesyModel } from '../../models/StationaryCourtesy.model';

@Component({
  selector: 'app-stationary-courtesy',
  templateUrl: './stationary-courtesy.component.html',
  styleUrls: ['./stationary-courtesy.component.css'],
})
export class StationaryCourtesyComponent {
  loading: boolean = true;
  @Input() parkingId: string = this.authService.getParking().id;
  stationaryForm: FormGroup;

  idEditAntenna: string = '';
  allParking: ParkingModel[] = Array<ParkingModel>();
  typeCourtesies: Array<{ id: number; name: string }> = [];
  stations: StationsCourtesyModel[] = [];
  /* Permissions */
  editAntennaAction = environment.editAntennas;
  deleteAntennaAction = environment.deleteAntennas;
  createAntennaAction = environment.createAntennas;
  downloadQRAntennaAction = environment.downloadQRAntenna;
  private actions: string[] = this.permissionService.actionsOfPermissions;

  constructor(
    private formBuilder: FormBuilder,
    private message: MessageService,
    private parkingService: ParkingService,
    private utilitiesService: UtilitiesService,
    private authService: AuthService,
    private permissionService: PermissionsService,
    private courtesyService: CourtesyService
  ) {
    this.stationaryForm = this.createForm();

    this.getInitialData();
  }

  async getTypeCourtesies(): Promise<Array<{ id: number; name: string }>> {
    return this.courtesyService
      .getTypes()
      .toPromise()
      .then((x) => {
        return x.data.type.map((item: any) => {
          return {
            id: item.id,
            name: item.description,
          };
        });
      });
  }

  ifHaveAction(action: string) {
    return !!this.actions.find((x) => x == action);
  }

  createForm(): FormGroup {
    return this.formBuilder.group({
      parkingId: [this.parkingId],
      value: [],
      type: ['0'],
      name: [],
      stationId: ['0'],
    });
  }

  async searchAntennasByParking() {
    if (this.authService.isSudo && !this.idEditAntenna) {
      this.message.showLoading();
      this.parkingId = this.stationaryForm.controls['parkingId']?.value;
      this.stations =
        await this.parkingService.getAntennasWithStationaryCourtesy(
          this.parkingId
        );
      if (this.stations) {
        //this.rerender();
      }
      this.message.hideLoading();
    }
    return this.stations;
  }

  assignAntennasSearched() {
    this.parkingService
      .searchAntennasByParking(this.parkingId)
      .then((data) => (this.stations = data));
  }

  async getInitialData() {
    try {
      this.message.showLoading();
      Promise.all([
        this.parkingService.getAllParking().then((data) => data.data.parkings),
        this.getTypeCourtesies(),
        this.parkingService.getAntennasWithStationaryCourtesy(this.parkingId),
      ])
        .then((resp) => {
          this.allParking = resp[0];
          this.typeCourtesies = resp[1];
          this.stations = resp[2];
        })
        .catch((x) => {
          this.message.errorTimeOut(
            '',
            'Hubo un error al recuperar la información inicial.'
          );
        })
        .then(() => {
          this.message.hideLoading();
        });
      this.loading = false;
    } catch (ex) {
      throw new Error(ex.message);
    } finally {
      setTimeout(() => {
        this.message.hideLoading();
      }, 3000);
    }
  }
}
