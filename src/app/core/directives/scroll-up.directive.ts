import { Directive, HostListener, Renderer2, ElementRef, OnInit } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[appScrollUp]'
})
export class ScrollUpDirective implements OnInit {
  private button: HTMLElement | undefined;

  constructor(private renderer: Renderer2, private el: ElementRef) { }

  ngOnInit(): void {
    this.createScrollButton();
  }

  private createScrollButton(): void {
    this.button = this.renderer.createElement('button');
    this.renderer.setStyle(this.button, 'display', 'none');
    this.renderer.setStyle(this.button, 'position', 'fixed');
    this.renderer.setStyle(this.button, 'bottom', '20px');
    this.renderer.setStyle(this.button, 'right', '30px');
    this.renderer.setStyle(this.button, 'z-index', '99');
    this.renderer.setStyle(this.button, 'border', 'none');
    this.renderer.setStyle(this.button, 'outline', 'none');
    this.renderer.setStyle(this.button, 'background-color', '#ffb661');
    this.renderer.setStyle(this.button, 'color', 'white');
    this.renderer.setStyle(this.button, 'cursor', 'pointer');
    this.renderer.setStyle(this.button, 'padding', '1px');
    this.renderer.setStyle(this.button, 'font-size', '18px');
    this.renderer.setStyle(this.button, 'height', '40px');
    this.renderer.setStyle(this.button, 'width', '40px');
    this.renderer.setStyle(this.button, 'border-radius', '50%');
    this.renderer.listen(this.button, 'click', this.scrollToTop.bind(this));
    // this.renderer.setProperty(this.button, 'innerText', 'Top');
    // const icon = this.renderer.createElement('i');
    // this.renderer.addClass(icon, 'bi');
    // this.renderer.addClass(icon, 'bi-arrow-up');
    // this.renderer.setStyle(icon, 'font-size', '24px');
    const svgIcon = this.renderer.createElement('span');
    svgIcon.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="18" viewBox="0 0 14 18" fill="none">
        <path d="M7 17V1M7 1L1 7M7 1L13 7" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `;

    this.renderer.appendChild(this.button, svgIcon);
    this.renderer.appendChild(this.el.nativeElement, this.button);
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    if (window.pageYOffset > 20) {
      this.renderer.setStyle(this.button, 'display', 'block');
    } else {
      this.renderer.setStyle(this.button, 'display', 'none');
    }
  }

  private scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
