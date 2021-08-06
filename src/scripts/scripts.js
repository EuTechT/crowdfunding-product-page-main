const btnMenu = window.document.querySelector('.btn-menu');
const navigation = window.document.querySelector('.navigation');
const overlay = window.document.querySelector('.overlay');
const btnBookmark = window.document.querySelector('.btn-bookmark');
const btnBackProject = window.document.querySelector('#btn-back-project');
const modalDefault = window.document.querySelector('.modal-default');
const btnSelectReward = window.document.querySelectorAll('.btn-select-reward');
const inputRadios = window.document.querySelectorAll('.input input');
const pledges = window.document.querySelectorAll('.pledge');
const pledgesAmounts = window.document.querySelectorAll('.pledge-amount');
const inputNumber = window.document.querySelectorAll('.amount__input input');
const btnContinue = window.document.querySelectorAll('.btn-continue');
const modalSuccess = window.document.querySelector('.modal-success');
const btnGotIt = modalSuccess.querySelector('.btn');
const projects = window.document.querySelectorAll('.project');
const progressBar = window.document.querySelector('.progress-bar');


// NAVIGATION MENU
btnMenu.addEventListener('click', () => {
    btnMenu.classList.toggle('btn-menu--active');
    navigation.classList.toggle('navigation--show');
    overlay.classList.toggle('is-active');
});

overlay.addEventListener('click', () => {
    if(overlay.classList.contains('is-active') && navigation.classList.contains('navigation--show')){
        closeNavigation();
    }
});

window.onresize = function() {
    if(window.innerWidth > 1024 && navigation.classList.contains('navigation--show')){
        closeNavigation();
    }
}

function closeNavigation(){
    btnMenu.classList.remove('btn-menu--active');
    navigation.classList.remove('navigation--show');
    overlay.classList.remove('is-active');
}


// BUTTON BOOKMARK
btnBookmark.addEventListener('click', () => {
    btnBookmark.classList.toggle('btn-bookmark--active');

    if(btnBookmark.classList.contains('btn-bookmark--active')){
        btnBookmark.lastElementChild.innerHTML = "Bookmarked";
    } else {
        btnBookmark.lastElementChild.innerHTML = "Bookmark";
    }
});

btnBackProject.addEventListener('click', () => {
    openModal();
});

// MODAL OPENING FUNCTION
function openModal() {
    modalDefault.classList.add('is-active');

    modalDefault.addEventListener('click', (event) => {
        if(event.target.className == modalDefault.className || event.target.id == 'close-modal') {
            closeModal();
        }
    });
}

// MODAL CLOSING FUNCTION
function closeModal() {
    modalDefault.classList.remove('is-active');
}


// SELECT REWARD
btnSelectReward.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        openModal();
        let pos = index + 1;
        inputRadios[pos].checked = true;
        selectPledge(inputRadios[pos], pos);
    }); 
});

inputRadios.forEach((input, index) => {
    input.addEventListener('change', () => {
        selectPledge(input, index);
    });
});

function selectPledge(input, pos){
    if(input.checked){
        pledges[pos].classList.add('pledge--selected');
        pledgesAmounts[pos].classList.add('pledge-amount--show');

        for(let i = 0; i < pledges.length; i++){
            if(i != pos){
                inputRadios[i].checked = false;
                pledges[i].classList.remove('pledge--selected');
                pledgesAmounts[i].classList.remove('pledge-amount--show');
            }
        }
    }
}


// AMOUNT INPUT
inputNumber.forEach((input) => {
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('amount__input--focused');
    });
});

inputNumber.forEach((input) => {
    input.addEventListener('blur', () => {
        input.parentElement.classList.remove('amount__input--focused');
    });
});


// CONTINUE BUTTON
btnContinue.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        const elements = getElements();
        let totalRaised = parseFloat(elements.totalRaised.textContent.replace(',', '.'));
        let totalBackers = parseFloat(elements.totalBackers.textContent.replace(',', '.'));
        let amount = parseInt(pledgesAmounts[index].querySelector('input').value);
        
        let amountValue = totalRaised + (amount/1000);
        let numberTotalBackers = totalBackers + (1/1000);

        let resultAmountValue =  amountValue.toFixed(3);
        let resultTotalBackers = numberTotalBackers.toFixed(3);

        elements.totalRaised.textContent = resultAmountValue.toString().replace('.', ',');
        elements.totalBackers.textContent = resultTotalBackers.toString().replace('.', ',');

        updateProgressBar(amount);
    
        for(let i = 0; i < pledges.length; i++){
            if(index == 0) {
                execSetTimout();
            } else if (index == i) {
                if(pledges[i].classList.contains('bamboo')) {
                    updateVacancies('.bamboo-stand-vacancies','.bamboo');
                } else if (pledges[i].classList.contains('black-edition')) {
                    updateVacancies('.black-edition-vacancies', '.black-edition');
                }
            }
        }
    });
});

function getElements() {
    const elements = {};
    elements.totalRaised = window.document.querySelector('#total-raised');
    elements.totalBackers = window.document.querySelector('#total-backers');

    return elements;
}


// PROGRESS BAR
function updateProgressBar(amount) {
    let widthProgressBar = progressBar.style.width;
    let width = parseFloat(widthProgressBar.split('').slice(0, -1).join(''));
    let percentage = (amount*100) / 100000;

    if((width + percentage) > 100) {
        progressBar.style.width = "100%";
    } else {
        progressBar.style.width = (width + percentage) + "%";
    }
}

// CLOSE MODAL SUCCESS
btnGotIt.addEventListener('click', () => {
    closeModal();
    modalSuccess.classList.remove('is-active');
});


// UPDATED VACANCIES
function updateVacancies(selector, parentElement) {
    const remainingVacancies = window.document.querySelectorAll(selector);
    const parentElements = window.document.querySelectorAll(parentElement);

    for(let i = 0; i < remainingVacancies.length; i++) {
        let numberRemainingVacancies = parseInt(remainingVacancies[i].textContent);
        
        if(numberRemainingVacancies <= 0) {
            const btn = parentElements[i].querySelector('.btn');
            parentElements[i].classList.add('disabled');
            btn.classList.add('btn--disabled');
            btn.innerHTML = "Out of Stock";
        } else {
            let result = numberRemainingVacancies -= 1;
            remainingVacancies[i].textContent = result.toString();

            execSetTimout();
        }
    }
}

function execSetTimout() {
    setTimeout(() => {
        modalSuccess.classList.add('is-active');
    }, 100);
}