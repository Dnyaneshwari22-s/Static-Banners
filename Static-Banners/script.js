if (Enabler.isInitialized()) {
  init();
} else {
  Enabler.addEventListener(studio.events.StudioEvent.INIT, init);
}

function init(){
  const sliders = document.querySelectorAll('.slider');

  sliders.forEach(slider=>{
    const images = slider.querySelectorAll('img');
    const progress = slider.querySelector('.progress');
    let index = 0;
    let interval;

    images[index].classList.add('active');
    progress.style.width = '0%';

    function start(){
      interval = setInterval(()=>{
        images[index].classList.remove('active');
        index = (index + 1) % images.length;
        images[index].classList.add('active');

        // Animate progress bar
        progress.style.transition = 'none';
        progress.style.width = '0%';
        setTimeout(()=>{
          progress.style.transition = 'width 2s linear';
          progress.style.width = '100%';
        },50);

      },2000);
    }

    function stop(){
      clearInterval(interval);
    }

    start();

    slider.addEventListener("mouseenter",stop);
    slider.addEventListener("mouseleave",start);

    slider.querySelector(".cta").addEventListener("click",e=>{
      e.stopPropagation();
      Enabler.exit("CTA_Click", slider.dataset.url);
    });

    slider.addEventListener("click",()=>{
      Enabler.exit("Banner_Click", slider.dataset.url);
    });

    // Start progress bar
    progress.style.width = '100%';
  });
}
