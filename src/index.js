import Template from '@templates/Template.js';

//aqui es donde importaremos nuestras hojas de estilos
import '@styles/main.css';  
import '@styles/vars.scss';

(async function App() {
  const main = null || document.getElementById('main');
  main.innerHTML = await Template();
})();
