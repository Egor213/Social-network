import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewFriendsComponent } from './add-new-friends.component';

describe('AddNewFriendsComponent', () => {
  let component: AddNewFriendsComponent;
  let fixture: ComponentFixture<AddNewFriendsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddNewFriendsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewFriendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
