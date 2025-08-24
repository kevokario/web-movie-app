import {Component, OnInit} from '@angular/core';
import {LoaderService} from "../../services/loader.service";

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.css'
})
export class LoaderComponent implements OnInit{

  showLoader = false;
  constructor(private loaderService: LoaderService) {

  }

  ngOnInit() {
    this.initLoadingStatus();
  }

  initLoadingStatus(){
    this.loaderService.getLoadingStatus().subscribe({
      next:(status)=>{
        this.showLoader = status;
        console.log(`Status: ${status}`)
      }
    })
  }


}
