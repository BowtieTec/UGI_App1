import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../../shared/services/auth.service";
import {ParkingModel} from "../../../parking/models/Parking.model";
import {ParkingService} from "../../../parking/services/parking.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {
  allMonthsObject,
  DayTransitDashboardModel,
  MonthTransitDashboardModel,
  YearTransitDashboardModel
} from "../../model/Dashboard.model";
import {SelectModel} from "../../../../shared/model/CommonModels";

@Component({
  selector: 'app-transit',
  templateUrl: './transit.component.html',
  styleUrls: ['./transit.component.css']
})
export class TransitComponent implements OnInit {
  nowDateTime = new Date()
  allParking: ParkingModel[] = []
  transitForm: FormGroup
  transitByDay: DayTransitDashboardModel
  transitByMonth: MonthTransitDashboardModel
  transitByYear: YearTransitDashboardModel
  years: SelectModel[] = []
  monthFiltered: SelectModel[] = [];

  constructor(private authService: AuthService, private parkingService: ParkingService, private formBuilder: FormBuilder) {
    this.getInitialData()
    this.transitForm = this.dayTransitForm()
    this.transitByDay = new DayTransitDashboardModel(this.nowDateTime, this.getParkingId())
    this.transitByMonth = new MonthTransitDashboardModel(this.nowDateTime, this.getParkingId())
    this.transitByYear = new YearTransitDashboardModel(this.nowDateTime, this.getParkingId())
    this.fillYear()
  }

  getInitialData() {
    this.getAllParking()

  }

  fillYear() {
    const currentYear: number = new Date().getFullYear()
    for (
      let iAnio = currentYear - 5;
      iAnio <= currentYear;
      iAnio++
    ) {
      if (iAnio >= 2022) {
        this.years.push({
          id: iAnio,
          name: iAnio.toString()
        })
      }
    }
    this.filterMonth()
  }

  ngOnInit(): void {
    this.transitForm.get('monthSelectedByMonth')?.setValue(this.monthFiltered[this.monthFiltered.length - 1].id)
  }

  getParkingId() {
    return this.authService.getParking().id
  }

  searchByDay() {
    const {parkingId, dateStartByDay} = this.transitForm.getRawValue()
    this.transitByDay = new DayTransitDashboardModel(dateStartByDay, parkingId)
  }

  searchByMonth() {
    const {parkingId, yearSelectedByMonth, monthSelectedByMonth} = this.transitForm.getRawValue()
    const newDate: Date = new Date(yearSelectedByMonth, monthSelectedByMonth - 1, 1)
    this.transitByMonth = new MonthTransitDashboardModel(newDate, parkingId)
  }

  searchByYear() {
    const {parkingId, yearSelectedByYear} = this.transitForm.getRawValue()
    const newDate: Date = new Date(yearSelectedByYear, 0, 1)
    this.transitByYear = new YearTransitDashboardModel(newDate, parkingId)
  }

  getIsSudo() {
    return this.authService.isSudo;
  }

  getAllParking() {
    this.allParking = this.parkingService.allParkingLot
  }

  dayTransitForm() {
    return this.formBuilder.group({
      dateStartByDay: [this.nowDateTime],
      parkingId: [this.authService.getUser().user.parking.id],
      yearSelectedByMonth: [this.nowDateTime.getFullYear()],
      monthSelectedByMonth: [],
      yearSelectedByYear: [this.nowDateTime.getFullYear()],
    })
  }

  filterMonth() {
    const {yearSelectedByMonth} = this.transitForm.getRawValue()
    const allMonths: SelectModel[] = allMonthsObject()
    if (yearSelectedByMonth == new Date().getFullYear()) {
      this.monthFiltered = allMonths.filter(x => Number(x.id) <= Number(new Date().getMonth()) + 1)
    } else {
      this.monthFiltered = allMonths
    }
    console.log(this.monthFiltered[this.monthFiltered.length - 1])
    this.transitForm.get('monthSelectedByMonth')?.setValue(this.monthFiltered[this.monthFiltered.length - 1].id)
  }
}
