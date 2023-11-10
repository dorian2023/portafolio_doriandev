const toggleTheme = document.getElementById('toggle-theme');
const toggleIcon = document.getElementById('toggle-icon');
const toggleText = document.getElementById('toggle-text');

const toggleColors = document.getElementById('toggle-colors');

const rootStyle = document.documentElement.style;

const flagsElement = document.getElementById('flags');

const textsToChange = document.querySelectorAll('[data-section]');


// Simula el tiempo que tarda en cargar la página (puedes quitar esto en producción)
window.addEventListener('load', function () {
    setTimeout(removeLoader, 2000); // 2000 milisegundos = 2 segundos
});

function removeLoader() {
    document.querySelector('.loader-wrapper').style.display = 'none';
}


const changeLanguage = async (language) => {
    const requestJson = await fetch(`./languages/${language}.json`);
    const texts = await requestJson.json();
    

    for (const textToChange of textsToChange) {
  
        const section = textToChange.dataset.section;
        const value = textToChange.dataset.value;
        
        textToChange.innerHTML = texts[section][value];
       
    }
}

flagsElement.addEventListener('click',(e) =>{
    changeLanguage(e.target.parentElement.dataset.language);
}); 

toggleTheme.addEventListener('click', () =>{
    document.body.classList.toggle("dark");
    if (toggleIcon.src.includes('A.png')) {
        toggleIcon.src='assets/img/A.png';
        toggleText.textContent = '🌚';
    }else{
        toggleIcon.src='assets/img/A.svg';
        toggleText.textContent = "🌞";
    }
});

toggleColors.addEventListener('click', (e) =>{
    rootStyle.setProperty('--primary-color', e.target.dataset.color);
});



//container Reloj Fecha
(function ()  {
    var actualizarHora = function () {
        var fecha = new Date(),
            horas = fecha.getHours(),
            ampm,
            minutos = fecha.getMinutes(),
            segundos = fecha.getSeconds(),
            diaSemana = fecha.getDay(),
            dia = fecha.getDate(),
            mes = fecha.getMonth(),
            year = fecha.getFullYear();
           
         var pHoras = document.getElementById('horas'),
            pAMPM = document.getElementById('ampm'),
            pMinutos = document.getElementById('minutos'),
            pSegundos = document.getElementById('segundos'),
            pDiaSemana = document.getElementById('diaSemana'),
            pDia = document.getElementById('dia'),
            pMes = document.getElementById('mes'),
            pYear = document.getElementById('year');

        var semana = ['Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','Sabado'];
        var meses = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','September','Octubre','Noviembre','Diciembre'];

        pDiaSemana.textContent = semana[diaSemana];
        pDia.textContent = dia;
        pMes.textContent = meses[mes];
        pYear.textContent = year;

        //Cambia de AM a PM
        if (horas >= 12) {
            horas = horas - 12;
            ampm = 'PM';
        }else{
            ampm = 'AM';
        }

        //Cuando llegue el reloj a las 0 horas, cambiar a 12 am.
        if (horas == 0) {
            horas = 12;
        }

        pHoras.textContent = horas;
        pAMPM.textContent = ampm;

        //Coloca los minutos de 1 a 01
        if (minutos <10) {
            minutos = "0" + minutos
        };

        //Coloca los minutos de 1 a 01
        if (segundos <10) {
            segundos = "0" + segundos
        };


        pMinutos.textContent = minutos;
        pSegundos.textContent = segundos;
    };
    actualizarHora();
    let intervalo = setInterval(actualizarHora, 1000);
}());