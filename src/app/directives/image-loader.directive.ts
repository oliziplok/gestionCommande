import {Directive, HostBinding, Input} from '@angular/core';

@Directive({
  selector: '[appImageLoader]',
  host: {
    '(error)': 'updateUrl()',
    '(load)': 'load()',
    '[src]': 'src'
  }
})
export class ImageLoaderDirective {
  @Input() src: string;
  @Input() appImageLoader: string;
  @HostBinding('class') className;

  constructor() { }


  updateUrl() {
    this.src = this.appImageLoader;
  }
  load() {
    this.className = 'image-loaded';
  }
}
