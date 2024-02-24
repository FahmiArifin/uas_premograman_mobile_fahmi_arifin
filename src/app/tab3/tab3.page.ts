import { Component, OnInit } from '@angular/core';
import { PostProvider } from '../../providers/post-providers';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  acaras: any = [];
  limit: number = 10;
  start: number = 0;

  constructor(
    private postPvdr: PostProvider,
    public toastController: ToastController
  ) {}

  ngOnInit() {
    this.loadacara();
  }

  ionViewWillEnter() {
    this.acaras = [];
    this.start = 0;
    this.loadacara();
  }

  doRefresh(event: any) {
    this.ionViewWillEnter();
    event.target.complete();
  }

  loadData(event: any) {
    this.start += this.limit;
    this.loadacara().then(() => {
      event.target.complete();
    });
  }

  loadacara() {
    return new Promise((resolve) => {
      let body = {
        aksi: 'getdata', // Sesuaikan dengan aksi yang diharapkan pada backend
        limit: this.limit,
        start: this.start,
      };

      this.postPvdr.postData(body, 'action.php').subscribe((data) => {
        for (let acara of data.result) {
          this.acaras.push(acara);
        }
        resolve(true);
      });
    });
  }
}
