import gsap from 'gsap'

export default class About {
  constructor() {
    this.selectors = {
      about: document.querySelector('.about'),
      aboutContainer: document.querySelector('.about__container'),
      open: [...document.querySelectorAll('[data-about="open"]')],
      close: document.querySelector('[data-about="close"]'),
    }

    this.open()
    this.close()
  }

  open() {
    this.selectors.open.forEach((_item) => {
      _item.addEventListener('click', () => {
        gsap.fromTo(
          this.selectors.aboutContainer,
          {
            y: '100vh',
          },
          {
            y: '0vh',
            duration: 0.75,
            ease: 'expo.inOut',
            overwrite: true,
            onStart: () => {
              this.selectors.about.style.display = 'flex'
            },
          }
        )
      })
    })
  }

  close() {
    this.selectors.close.addEventListener('click', () => {
      gsap.fromTo(
        this.selectors.aboutContainer,
        {
          y: '0vh',
        },
        {
          y: '100vh',
          duration: 0.75,
          ease: 'expo.inOut',
          overwrite: true,
          onComplete: () => {
            this.selectors.about.style.display = 'none'
          },
        }
      )
    })
  }
}
