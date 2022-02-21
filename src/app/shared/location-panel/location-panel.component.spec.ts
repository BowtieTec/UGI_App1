import { ComponentFixture, TestBed } from '@angular/core/testing'

import { LocationPanelComponent } from './location-panel.component'

describe('LocationPanelComponent', () => {
  let component: LocationPanelComponent
  let fixture: ComponentFixture<LocationPanelComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LocationPanelComponent]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationPanelComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
