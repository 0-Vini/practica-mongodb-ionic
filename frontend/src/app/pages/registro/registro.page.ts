import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController, LoadingController } from '@ionic/angular';
import { PersonaService } from '../../services/persona'; 

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class RegistroPage implements OnInit {

  persona = {
    nombre: '',
    apellido: '',
    edad: null,
    correo: '',
    telefono: '',
    ciudad: ''
  };

  personas: any[] = [];
  cargando = false;

  constructor(
    private personaService: PersonaService,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.cargarPersonas();
  }

  cargarPersonas() {
    this.personaService.getPersonas().subscribe({
      next: (data: any) => { 
        this.personas = data; 
      },
      error: (err: any) => { 
        console.error('Error al cargar:', err); 
      }
    });
  }

  async guardar() {
    this.cargando = true;
    
    // Mostramos un indicador de carga (opcional, pero profesional)
    const loading = await this.loadingCtrl.create({
      message: 'Guardando...',
    });
    await loading.present();

    this.personaService.guardarPersona(this.persona).subscribe({
      next: async (res: any) => {
        this.cargando = false;
        await loading.dismiss();
        await this.mostrarToast('✅ Persona guardada exitosamente', 'success');
        this.limpiarFormulario();
        this.cargarPersonas();
      },
      error: async (err: any) => {
        this.cargando = false;
        await loading.dismiss();
        await this.mostrarToast('❌ Error al guardar. Revisa la conexión.', 'danger');
        console.error(err);
      }
    });
  }

  limpiarFormulario() {
    this.persona = {
      nombre: '',
      apellido: '',
      edad: null,
      correo: '',
      telefono: '',
      ciudad: ''
    };
  }

  async mostrarToast(mensaje: string, color: any) {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      duration: 3000,
      color: color,
      position: 'top'
    });
    await toast.present();
  }
}