import { Component, provideZonelessChangeDetection, signal } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';

// Completa estos datos cuando esté organizada la celebración.
const invitation = { baby: 'Samuel', date: '15 de noviembre', time: '', venue: '', address: '', qr: 'assets/qr-amor.jpeg', image: 'assets/SAMI.jpeg' };

@Component({selector:'app-root', standalone:true, templateUrl:'./app.html'})
class App {
  readonly details = invitation;
  readonly opened = signal(false);
  showPhoto() { document.querySelector<HTMLDialogElement>('#sami-photo')?.showModal(); }
  hidePhoto() { document.querySelector<HTMLDialogElement>('#sami-photo')?.close(); }
  open() { this.opened.set(true); window.scrollTo({ top:0, behavior:'instant' }); }
  map() { window.open('https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(this.details.address || this.details.venue), '_blank','noopener,noreferrer'); }
}
bootstrapApplication(App, { providers: [provideZonelessChangeDetection()] }).catch(console.error);
