const toggleTheme = document.getElementById('toggle-theme');
const toggleIcon = document.getElementById('toggle-icon');
const toggleText = document.getElementById('toggle-text');

const toggleColors = document.getElementById('toggle-colors');

const rootStyle = document.documentElement.style;

const flagsElement = document.getElementById('flags');

const textsToChange = document.querySelectorAll('[data-section]');

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
        toggleIcon.src='assets/img/A.png';
        toggleText.textContent = "🌞";
    }
});

toggleColors.addEventListener('click', (e) =>{
    rootStyle.setProperty('--primary-color', e.target.dataset.color);
});