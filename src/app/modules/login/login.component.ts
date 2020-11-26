import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import * as FileSaver from 'file-saver'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  name: string;
  admitcard: string;

  constructor(private routerActive: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
  }
  startExam() {
    this.router.navigate(['/question'],{queryParams:{name:this.name,ticket: this.admitcard}})
  }

}
