import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicModule, AlertController, Platform } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { closeOutline } from 'ionicons/icons';

@Component({
  selector: 'app-reclamo',
  templateUrl: './reclamo.page.html',
  styleUrls: ['./reclamo.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule]
})
export class ReclamoPage {
  texto = '';
  photo: string | null = null; 

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  constructor(private router: Router, private alertCtrl: AlertController, private platform: Platform) {
    addIcons({ closeOutline });
  }

  async takePhoto() {
    try {
      const CameraModule = await import('@capacitor/camera');
      const { Camera, CameraResultType, CameraSource } = CameraModule;

      const photo = await Camera.getPhoto({
        quality: 80,
        allowEditing: false,
        resultType: CameraResultType.Base64,
        source: CameraSource.Prompt
      });

      if (photo && photo.base64String) {
        this.photo = 'data:image/jpeg;base64,' + photo.base64String;
      } else if ((photo as any).webPath) {
        this.photo = (photo as any).webPath;
      }
    } catch (e) {
      console.error('Camera error:', e);
      this.alertCtrl.create({
        header: 'Error al acceder a la cámara',
        message: 'No se pudo acceder a la cámara. Puedes seleccionar una foto desde tus archivos.',
        buttons: ['OK']
      }).then(alert => alert.present());
      if (this.fileInput && this.fileInput.nativeElement) {
        this.fileInput.nativeElement.click();
      }
    }
  }

  onFileChange(event: any) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      this.photo = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  async sendReport() {
    // Validación: requiere texto o foto
    if (!this.texto.trim() && !this.photo) {
      const missing = await this.alertCtrl.create({ header: 'Faltan datos', message: 'Agrega texto o una foto antes de enviar.', buttons: ['OK'] });
      await missing.present();
      return;
    }

    // Guardamos localmente como ejemplo. 
    const reports = JSON.parse(localStorage.getItem('reclamos') || '[]');
    reports.unshift({ text: this.texto.trim(), photo: this.photo, date: new Date().toISOString() });
    localStorage.setItem('reclamos', JSON.stringify(reports));

    const sent = await this.alertCtrl.create({ header: 'Enviado', message: 'Tu reclamo fue guardado y enviado.', buttons: ['OK'] });
    await sent.present();

    // reset y volver al home
    this.texto = '';
    this.photo = null;
    this.router.navigateByUrl('/home');
  }

  close() {
    this.router.navigate(['/home']);
  }
}
