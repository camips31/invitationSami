import { Component, provideZonelessChangeDetection, signal } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';

// Completa estos datos cuando esté organizada la celebración.
const invitation = { baby: 'Samuel', day: 'Sábado', date: '14 de noviembre', time: '15:00', venue: 'Club Bisa', address: 'Calle 37 de Chasquipampa nro. 352', mapUrl: 'https://maps.app.goo.gl/dZhsfH2aqc5foKP38', qr: 'assets/QR.jpeg', image: 'assets/SAMI-acuarela-manos-suaves.png' };

@Component({selector:'app-root', standalone:true, templateUrl:'./app.html'})
class App {
  readonly details = invitation;
  readonly opened = signal(false);
  showPhoto() { document.querySelector<HTMLDialogElement>('#sami-photo')?.showModal(); }
  hidePhoto() { document.querySelector<HTMLDialogElement>('#sami-photo')?.close(); }
  open() { this.opened.set(true); window.scrollTo({ top:0, behavior:'instant' }); }
  map() { window.open(this.details.mapUrl || 'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(this.details.address || this.details.venue), '_blank','noopener,noreferrer'); }
}
bootstrapApplication(App, { providers: [provideZonelessChangeDetection()] }).catch(console.error);
