var images = document.querySelectorAll('.img'),
    textBlocks = document.querySelectorAll('.text__block'),
    thumb = document.querySelector('.range__thumb'),
    slider = document.querySelector('.range__slider'),
    progressBar = document.querySelector('.range__progress'),
    points = document.querySelectorAll('.range__point');

function getCoords(elem) {
    var box = elem.getBoundingClientRect();
    
    return {
      top: box.top + pageYOffset,
      right: box.right + pageXOffset,
      left: box.left + pageXOffset,
      bottom: box.bottom + pageYOffset
    }
    
};

thumb.onmousedown = function(e) {
  
  var thumbCoords = getCoords(thumb),
      sliderCoords = getCoords(slider),
      shiftY = e.pageY - thumbCoords.top;
 
  document.onmousemove =  function(e) {
    
    var newTopPosition = e.pageY - shiftY - sliderCoords.top,
        bottomEdge = slider.offsetHeight - thumb.offsetHeight,
        progressBarHeight = newTopPosition;
    
    if(newTopPosition < 0) {
      newTopPosition = 0;
    }
    
    if(newTopPosition > bottomEdge) {
      newTopPosition = bottomEdge;
    }
    
    thumb.style.top = newTopPosition + 'px';
    
    progressBar.style.height = (progressBarHeight === bottomEdge) ? '100%' : newTopPosition + 'px';
    
    function switchTab() {
      
      var rangeValue = Math.floor((newTopPosition / ((sliderCoords.bottom - sliderCoords.top) - thumb.offsetHeight))*100),
          pointsCoords = Array.prototype.map.call(points, function(point) {
            return Math.floor(((getCoords(point).top - sliderCoords.top) / slider.offsetHeight) * 100);
          });
      
      for(var i=0;i<pointsCoords.length;i++) {
        if(rangeValue === pointsCoords[i]) {
          for(var j=0;j<pointsCoords.length;j++) {
            if(textBlocks[j] !== textBlocks[i] && images[j] !== images[i]) {
              textBlocks[j].classList.remove('js-active-tab');
              images[j].classList.remove('js-active-tab');
            }
          }
          textBlocks[i].classList.add('js-active-tab');
          images[i].classList.add('js-active-tab');
        }
      }
      
    };
    
    switchTab();
    
  };
  
  function stopThumbTransfer() {
    document.onmousemove = null;
    document.onmousedown = null;
  };
  
  thumb.addEventListener('mouseup', stopThumbTransfer);
  
};

 thumb.ondragstart = function() {
      return false;
 };