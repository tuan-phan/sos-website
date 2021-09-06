import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {noop} from 'rxjs';
import {VolunteerGroupService} from "../../../core/http/volunteer-group.service";

@Component({
  selector: 'sos-select-group-volunteer',
  templateUrl: './sos-select-group-volunteer.component.html',
  styleUrls: ['./sos-select-group-volunteer.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SosSelectGroupVolunteerComponent),
      multi: true,
    },
  ],
})
export class SosSelectGroupVolunteerComponent implements ControlValueAccessor, OnInit {
  @Input() label: string = '';
  @Input() required = false;

  innerValue = '';
  options: IVolunteerGroup[] = []

  triggerOnChange = (_: string) => noop;
  triggerOnTouched = () => noop();

  constructor(private volunteerGroupService: VolunteerGroupService) {
    this.cloneGroup()
  }

  get value(): string {
    return this.innerValue
  }

  set value(value: string) {
    this.innerValue = value;
    this.triggerOnChange(value)
  }

  ngOnInit(): void {

  }

  cloneGroup() {
    this.volunteerGroupService.findAll().subscribe(groups => {
      if (Array.isArray(groups)) {
        this.options = groups
      }
    }, error => {
      //todo: handle error
    })
  }

  writeValue(obj: any) {
    this.innerValue = obj
  }

  registerOnChange(fn: any) {
    this.triggerOnChange = fn;
  }

  registerOnTouched(fn: any) {
    this.triggerOnTouched = fn;
  }

}
