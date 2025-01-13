import { SLIDER_OPTIONS } from './constants';

export function initSplide(sliderSelector, totalSelector, currentSelector) {
    const splide = new Splide(sliderSelector, SLIDER_OPTIONS).mount();
  
    const totalSlidesElement = document.getElementById(totalSelector);
    const currentSlideElement = document.getElementById(currentSelector);
  
    if (totalSlidesElement) {
      const totalSlides = splide.length;
      totalSlidesElement.textContent = totalSlides;
    }
  
    splide.on('move', (newIndex) => {
      if (currentSlideElement) {
        currentSlideElement.textContent = newIndex + 1;
      }
    });
  
    return splide;
  }
  