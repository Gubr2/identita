import gsap from 'gsap'

export default class Controls {
  constructor() {
    this.selectors = {
      logo: document.querySelector('.menu__logo'),
      controls: document.querySelector('.controls'),
      controlsWrapper: document.querySelector('.controls__wrapper'),
      controlsItems: document.querySelectorAll('[data-controls="item"]'),
      button: document.querySelector('.controls__button'),
      loading: document.querySelector('.controls__loading'),
      loadingText: document.querySelector('.controls__loading__text'),
    }

    this.handleMenuLogo()
  }

  handleMenuLogo() {
    this.selectors.logo.addEventListener('click', () => {
      location.reload()
    })
  }

  handleStart() {
    return new Promise((resolve) => {
      this.selectors.button.addEventListener('click', () => {
        gsap.to(this.selectors.controlsItems, {
          y: '2rem',
          opacity: 0,
          duration: 0.5,
          ease: 'back.in',
          stagger: 0.05,
          onComplete: () => {
            this.showLoading()
            this.showLoadingText()
            resolve()
          },
        })
      })
    })
  }

  showLoading() {
    gsap.fromTo(
      this.selectors.loading,
      {
        y: '-2rem',
        opacity: 0,
      },
      {
        y: '0rem',
        opacity: 1,
        duration: 0.5,
        ease: 'expo.inOut',
      }
    )
  }

  hideLoading() {
    gsap.to(this.selectors.controls, {
      y: '100vh',
      duration: 1,
      ease: 'expo.inOut',
    })
  }

  showLoadingText() {
    gsap.fromTo(
      this.selectors.loadingText,
      {
        y: '-2rem',
        opacity: 0,
      },
      {
        y: '0rem',
        opacity: 1,
        duration: 0.5,
        ease: 'expo.inOut',
      }
    )
  }
}
