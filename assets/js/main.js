// Docker launch handler
document.addEventListener('DOMContentLoaded', function() {
  const launchBtn = document.getElementById('docker-launch-btn');
  const imageInput = document.getElementById('docker-image-input');
  
  if (launchBtn && imageInput) {
    launchBtn.addEventListener('click', function() {
      const dockerImage = imageInput.value.trim();
      
      if (!dockerImage) {
        alert('Please enter a Docker image link');
        return;
      }
      
      // Store the docker image in session storage
      sessionStorage.setItem('dockerImage', dockerImage);
      
      // Redirect to login page
      // Get the current language from the URL or default to English
      const currentPath = window.location.pathname;
      let loginUrl = '/login/';
      
      // Check if we're on a language-specific page
      if (currentPath.startsWith('/fr-fr/') || currentPath.startsWith('/fr/')) {
        loginUrl = '/fr-fr/login/';
      } else if (currentPath.startsWith('/de-de/') || currentPath.startsWith('/de/')) {
        loginUrl = '/de-de/login/';
      }
      
      window.location.href = loginUrl;
    });
    
    // Allow enter key to submit
    imageInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        launchBtn.click();
      }
    });
  }
});
