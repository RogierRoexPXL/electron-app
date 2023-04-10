function loadMenu() {
    const menuContainer = document.getElementById("menu-container");
    if (menuContainer) {
        // Dynamically generate the correct path for fetching the menu.html file
        const prefix = (window.location.pathname.includes('/pages/')) ? '../' : '';

        fetch(prefix + 'components/menu/menu.html')
        .then((response) => response.text())
        .then((html) => {
            menuContainer.innerHTML = html;
            addMenuEventListeners();
        })
        .catch((err) => {
            console.warn("Error loading menu:", err);
        });
    }
}

function addMenuEventListeners() {
    const menuHome = document.getElementById('menu-home');
    const menuAbout = document.getElementById('menu-about');
  
    if (menuHome && !(window.location.pathname.includes('/index.html'))) {
      menuHome.addEventListener('click', () => {
        window.location.href = '../index.html';
      });
    }
  
    const prefix = window.location.pathname.includes('/pages/') ? '' : 'pages/';
    if (menuAbout) {
      menuAbout.addEventListener('click', () => {
        window.location.href = prefix + 'about.html';
      });
    }
  }
  
  loadMenu();