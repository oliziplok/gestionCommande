import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-error-promp',
  templateUrl: './error-promp.component.html',
  styleUrls: ['./error-promp.component.css']
})
export class ErrorPrompComponent implements OnInit {

  receivedError: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.receivedError = data.msg;
  }

  ngOnInit() {
  }

}
