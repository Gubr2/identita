import gsap from 'gsap'

export default class UI {
  constructor() {
    this.selectors = {
      names: [...document.querySelectorAll('.ui__names__name')],
      years: [...document.querySelectorAll('.ui__years__year')],
      toggle: [...document.querySelectorAll('.ui__names__name__toggle')],
      content: [...document.querySelectorAll('.ui__names__name__content')],
      container: [...document.querySelectorAll('.ui__names__name__content__container')],
      gradients: [...document.querySelectorAll('.ui__names__name__content__gradients')],
      toggle: [...document.querySelectorAll('.ui__names__name__toggle')],
      toggleIcon: [...document.querySelectorAll('.ui__names__name__toggle__icon')],
      toggleCover: document.querySelector('.ui__togglecover'),
    }

    this.handleContent()

    this.flags = {
      content: false,
      buttons: true,
    }
  }

  handleNames(_destination, _index) {
    gsap.to('.ui__names__container', {
      x: `${_destination}vw`,
      duration: 0.5,
      ease: 'expo.inOut',
      overwrite: true,
    })

    this.active = document.querySelector('.ui__names__name--active')
    if (this.active) {
      this.active.classList.remove('ui__names__name--active')
    }
    this.selectors.names[_index].classList.add('ui__names__name--active')
  }

  handleYears(_destination, _index) {
    gsap.to('.ui__years__container', {
      x: `${_destination}vw`,
      duration: 0.5,
      ease: 'expo.inOut',
      overwrite: true,
    })

    this.active = document.querySelector('.ui__years__year--active')
    if (this.active) {
      this.active.classList.remove('ui__years__year--active')
    }
    this.selectors.years[_index].classList.add('ui__years__year--active')
  }

  animateExtraButtons(_status) {
    return new Promise((resolve) => {
      // ---> Animate
      if (_status == true) {
        gsap.fromTo(
          '.ui__extra__btn',
          {
            y: '75%',
            opacity: 0,
          },
          {
            y: '0%',
            opacity: 1,
            duration: 0.5,
            ease: 'back.out',
            stagger: 0.05,
            onComplete: () => {
              resolve()
            },
          }
        )
      } else {
        gsap.fromTo(
          '.ui__extra__btn',
          {
            y: '0%',
            opacity: 1,
          },
          {
            y: '-50%',
            opacity: 0,
            duration: 0.25,
            ease: 'power2.in',
            stagger: 0.05,
            onComplete: () => {
              resolve()
            },
          }
        )
      }
    })
  }

  handleExtraButtons(_current) {
    // ---> Remove previous active button
    this.previousActive = document.querySelector('.ui__extra__btn--active')
    if (this.previousActive) {
      this.previousActive.classList.remove('ui__extra__btn--active')
    }

    // ---> Add active to current
    _current.classList.add('ui__extra__btn--active')
  }

  handleExtraTexts(_current) {
    // ---> Remove previous active button
    this.previousActive = document.querySelector('.ui__extra__text__content--active')
    if (this.previousActive) {
      this.previousActive.classList.remove('ui__extra__text__content--active')
    }

    // ---> Add active to current
    _current.classList.add('ui__extra__text__content--active')
  }

  handleToggle(_index) {
    // ---> Remove previous active button
    this.previousActive = document.querySelector('.ui__names__name__toggle--active')
    if (this.previousActive) {
      this.previousActive.classList.remove('ui__names__name__toggle--active')
    }

    // ---> Add active to current
    this.selectors.toggle[_index].classList.add('ui__names__name__toggle--active')
  }

  handleContent() {
    this.selectors.toggle.forEach((_item, _index) => {
      _item.addEventListener('click', () => {
        if (this.flags.content) {
          // ---> Content
          gsap.to(this.selectors.content[_index], {
            height: '100%',
            width: '100%',
            left: '0%',
            duration: 0.75,
            ease: 'expo.inOut',
            overwrite: true,
          })

          // ---> Container
          gsap.to(this.selectors.container[_index], {
            opacity: 0,
            duration: 0.75,
            ease: 'expo.inOut',
            overwrite: true,
            onComplete: () => {
              this.selectors.container[_index].style.display = 'none'
            },
          })

          // ---> Gradients
          gsap.to(this.selectors.gradients[_index], {
            opacity: 0,
            duration: 0.75,
            ease: 'expo.inOut',
            overwrite: true,
            onComplete: () => {
              this.selectors.gradients[_index].style.display = 'none'
            },
          })

          // ---> Icon
          gsap.to(this.selectors.toggleIcon[_index], {
            rotate: '-90deg',
            duration: 0.75,
            ease: 'expo.inOut',
            overwrite: true,
          })

          // ---> Toggle Cover
          gsap.to(this.selectors.toggleCover, {
            opacity: 0,
            duration: 0.75,
            ease: 'expo.inOut',
            overwrite: true,
          })

          // ---> Flag
          this.flags.content = false
          this.flags.buttons = true

          // ---> Remove active
          this.selectors.content[_index].classList.add('ui__names__name__content--active')
        } else {
          // ---> Content
          gsap.to(this.selectors.content[_index], {
            height: '80vh',
            width: '130%',
            left: '-15%',
            duration: 0.75,
            ease: 'expo.inOut',
            overwrite: true,
          })

          // ---> Container
          gsap.to(this.selectors.container[_index], {
            opacity: 1,
            duration: 0.75,
            ease: 'expo.inOut',
            overwrite: true,
            onStart: () => {
              this.selectors.container[_index].style.display = 'flex'
            },
          })

          // ---> Gradients
          gsap.to(this.selectors.gradients[_index], {
            opacity: 1,
            duration: 0.75,
            ease: 'expo.inOut',
            overwrite: true,
            onStart: () => {
              this.selectors.gradients[_index].style.display = 'flex'
            },
          })

          // ---> Icon
          gsap.to(this.selectors.toggleIcon[_index], {
            rotate: '90deg',
            duration: 0.75,
            ease: 'expo.inOut',
            overwrite: true,
          })

          // ---> Toggle Cover
          gsap.to(this.selectors.toggleCover, {
            opacity: 0.75,
            duration: 0.75,
            ease: 'expo.inOut',
            overwrite: true,
          })

          // ---> Flag
          this.flags.content = true
          this.flags.buttons = false

          // ---> Add active
          this.selectors.content[_index].classList.add('ui__names__name__content--active')
        }
      })
    })
  }
}
