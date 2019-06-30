import { WaterinfoService } from './../services/waterinfo.service';
import { Component, OnInit } from '@angular/core';
import { WaterInfo } from '../models/water-info';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-manage-water-info',
  templateUrl: './manage-water-info.component.html',
  styleUrls: ['./manage-water-info.component.css']
})
export class ManageWaterInfoComponent implements OnInit {

  isReadOnly = true;
  id: string;
  waterInfo: WaterInfo = new WaterInfo();

  constructor(
    private route: ActivatedRoute,
    private waterInfoService: WaterinfoService
  ) { }

  ngOnInit() {

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.waterInfoService.get(this.id).subscribe((data: WaterInfo) => {
        this.waterInfo = data;
      });
    }
    else {
      this.isReadOnly = false;
    }
  }

  onSubmit() {
    this.waterInfoService.addOrUpdate(this.waterInfo).subscribe(data => {
      console.log(data);
      this.isReadOnly = true;
    });
  }

  edit() {
    this.isReadOnly = false;
  }

}