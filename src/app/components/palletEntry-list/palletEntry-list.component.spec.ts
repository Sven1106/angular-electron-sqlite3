/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PalletEntryListComponent } from './palletEntry-list.component';

describe('PalletEntryListComponent', () => {
  let component: PalletEntryListComponent;
  let fixture: ComponentFixture<PalletEntryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PalletEntryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PalletEntryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
