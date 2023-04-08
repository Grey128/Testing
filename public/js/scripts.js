function enterSite() {
  window.location.href = 'main.html';
}

document.addEventListener('DOMContentLoaded', function () {
  var video = document.getElementById('bg-video');
  video.play();
});

document.addEventListener('DOMContentLoaded', () => {
  const enterButton = document.getElementById('enter-btn');
  enterButton.addEventListener('click', () => {
    window.location.href = 'main.html';
  });
});
