import assert from 'node:assert/strict';
import { readFile, readdir, access } from 'node:fs/promises';
import { JSDOM, VirtualConsole } from 'jsdom';

const output = new URL('../dist/babySami/browser/', import.meta.url);
const files = await readdir(output);
const errors = [];
const console = new VirtualConsole();
console.on('error', (...args) => errors.push(args.join(' ')));
console.on('jsdomError', error => errors.push(error.message));
const dom = new JSDOM(await readFile(new URL('index.html', output), 'utf8'), {
  url: 'http://localhost:4200/', runScripts: 'outside-only', pretendToBeVisual: true,
  virtualConsole: console,
});
dom.window.scrollTo = () => {};
// JSDOM no implementa la apertura nativa de dialog; simulamos solo esa API.
dom.window.HTMLDialogElement.prototype.showModal = function () { this.setAttribute('open', ''); };
dom.window.HTMLDialogElement.prototype.close = function () { this.removeAttribute('open'); };
let copied = '';
Object.defineProperty(dom.window.navigator, 'clipboard', { value: { writeText: async text => { copied = text; } } });
dom.window.eval(await readFile(new URL(files.find(name => /^main-.*\.js$/.test(name)), output), 'utf8'));
const settle = () => new Promise(resolve => setTimeout(resolve, 80));
await settle();
const document = dom.window.document;
const button = label => [...document.querySelectorAll('button')].find(element => element.textContent.includes(label));
assert.ok(document.querySelector('.cover'), 'El sobre debe aparecer al iniciar Angular');
assert.ok(document.querySelector('.envelope'), 'Debe existir el sobre interactivo');
document.querySelector('.seal').click();
await settle();
assert.ok(document.querySelector('.invitation'), 'Abrir el sobre debe mostrar la invitación');
assert.equal(document.querySelector('h2').textContent, 'Samuel');
assert.equal(document.querySelector('.cover'), null);
document.querySelector('.baby-photo').click();
await settle();
assert.ok(document.querySelector('#sami-photo').hasAttribute('open'), 'La foto debe abrirse más grande');
document.querySelector('.photo-close').click();
assert.ok(!document.querySelector('#sami-photo').hasAttribute('open'), 'La foto debe poder cerrarse');
assert.equal(document.querySelector('.gift-qr img').getAttribute('src'), 'assets/qr-amor.jpeg');
assert.ok(document.querySelector('.gift-qr a[download]'), 'Debe poder guardarse el QR original');
for (const img of document.querySelectorAll('img')) {
  await access(new URL(img.getAttribute('src'), output));
}
assert.deepEqual(errors, [], 'La aplicación debe funcionar sin errores de ejecución');
dom.window.close();
process.stdout.write('OK: arranque Angular, sobre, invitación, foto y assets.\n');
