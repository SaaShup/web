// Docker launch handler
document.addEventListener('DOMContentLoaded', function() {
  const launchBtn = document.getElementById('docker-launch-btn');
  const imageInput = document.getElementById('docker-image-input');
  
  if (launchBtn && imageInput) {
    launchBtn.addEventListener('click', function() {
      const dockerImage = imageInput.value.trim();
      
      if (!dockerImage) {
        alert('Please enter a Docker image');
        return;
      }
      
      // Store the docker image in session storage
      sessionStorage.setItem('dockerImage', dockerImage);
      window.location.href = '/login';
    });
    
    // Allow enter key to submit
    imageInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        launchBtn.click();
      }
    });
  }
});
