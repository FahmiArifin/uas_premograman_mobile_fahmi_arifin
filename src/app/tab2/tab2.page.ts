import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { PostProvider } from '../../providers/post-providers';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  isCategoryVisible = false;

  nama_Acara: string = '';
  deskripsi_Acara: string = '';
  lokasi_Acara: string = '';
  tanggal_Mulai: string = '';
  tanggal_Selesai: string = '';
  jenis_Acara: string = '';
  kontak_Person: string = '';

  kategori_Acara: string = '';

  constructor(
    private router: Router,
    public toastController: ToastController,
    private postPvdr: PostProvider
  ) {}

  ngOnInit() {}

  async addregister() {
    if (this.nama_Acara == '') {
      await this.presentToast('Nama Acara harus diisi');
    } else if (this.deskripsi_Acara == '') {
      await this.presentToast('Deskripsi Acara harus diisi');
    } else if (this.lokasi_Acara == '') {
      await this.presentToast('Lokasi Acara harus diisi');
    } else if (this.tanggal_Mulai == '' || this.tanggal_Selesai == '') {
      await this.presentToast('Tanggal Mulai dan Tanggal Selesai harus diisi');
    } else if (this.jenis_Acara == '') {
      await this.presentToast('Jenis Acara harus dipilih');
    } else if (this.kontak_Person == '') {
      await this.presentToast('Kontak Person harus diisi');
    } else if (this.kategori_Acara == '') {
      await this.presentToast('Kategori Acara harus diisi');
    } else {
      let body = {
        nama_Acara: this.nama_Acara,
        deskripsi_Acara: this.deskripsi_Acara,
        lokasi_Acara: this.lokasi_Acara,
        tanggal_Mulai: this.tanggal_Mulai,
        tanggal_Selesai: this.tanggal_Selesai,
        jenis_Acara: this.jenis_Acara,
        kontak_Person: this.kontak_Person,
        kategori_Acara: this.kategori_Acara,
        aksi: 'add_register',
      };

      this.postPvdr.postData(body, 'action.php').subscribe(async (data) => {
        var alertpesan = data.msg;
        if (data.success) {
          await this.presentToast('Formulir berhasil disubmit');
          this.router.navigate(['/tab3']);
        } else {
          // Tampilkan pesan kesalahan jika ada masalah saat mengirimkan formulir
          const toast = await this.toastController.create({
            message: alertpesan,
            duration: 2000,
          });
        }
      });
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
    });
    toast.present();
  }
}
