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
const btnContinue = window.document.querySelectorAll('.btn-continue');
const modalSuccess = window.document.querySelector('.modal-success');
const btnGotIt = modalSuccess.querySelector('.btn');

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

function openModal() {
    modalDefault.classList.add('is-active');

    modalDefault.addEventListener('click', (event) => {
        if(event.target.className == modalDefault.className || event.target.id == 'close-modal') {
            closeModal();
        }
    });
}

function closeModal() {
    modalDefault.classList.remove('is-active');
}

btnSelectReward.forEach((btn, index) => {
    btn.addEventListener('click', () => {
    openModal();
    let pos = index + 1;
    inputRadios[pos].checked = true;
    selectPledge(inputRadios[pos], pos);
}); 
});

// btnSelectReward.forEach((btn, index) => {
//     btn.addEventListener('click', () => {
//     openModal();
//     let pos = index + 1;
//     inputRadios[pos].checked = true;
//     selectPledge(inputRadios[pos], pos);
// }); 
// });

inputRadios.forEach((input, index) => {
    input.addEventListener('click', () => {
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

btnContinue.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        const totalRaised = window.document.querySelector('#total-raised');
        let totalAmountRaised = parseFloat(totalRaised.textContent.replace(',', '.'));
        const totalBackers = window.document.querySelector('#total-backers');
        let numberTotalBackers = parseFloat(totalBackers.textContent.replace(',', '.'));
        let value = parseInt(pledgesAmounts[index].querySelector('input').value);
    
        let totalValue =  (totalAmountRaised + (value/1000)).toFixed(3);
        let resultTotalBackers = (numberTotalBackers += (1/1000)).toFixed(3);
        totalRaised.textContent = totalValue.toString().replace('.', ',');
        totalBackers.textContent = resultTotalBackers.toString().replace('.', ',');
    
        for(let i = 0; i < pledges.length; i++){
            if(index == 0) {
                execSetTimout();
            } else if (index == i) {
                if(pledges[i].classList.contains('bamboo')) {
                    uptadeVacancies('.bamboo-stand-vacancies','.bamboo');
                } else if (pledges[i].classList.contains('black-edition')) {
                    uptadeVacancies('.black-edition-vacancies', '.black-edition');
                }
            }
        }
    });
});

btnGotIt.addEventListener('click', () => {
    closeModal();
    modalSuccess.classList.remove('is-active');
});

function uptadeVacancies(selector, parentElement) {
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

// function uptadeVacancies(selector, parentElement) {
//     const remainingVacancies = window.document.querySelectorAll(selector);
//     const parentElements = window.document.querySelectorAll(parentElement);

//     for(let i = 0; i < remainingVacancies.length; i++) {
//         let numberRemainingVacancies = parseInt(remainingVacancies[i].textContent);
        
//         if(numberRemainingVacancies <= 0) {
//             const btn = parentElements[i].querySelector('.btn');
//             parentElements[i].classList.add('disabled');
//             btn.classList.add('btn--disabled');
//             btn.innerHTML = "Out of Stock";
//         } else {
//             let result = numberRemainingVacancies -= 1;
//             remainingVacancies[i].textContent = result.toString();

//             execSetTimout();
//         }
//     }
// }

function execSetTimout() {
    setTimeout(() => {
        modalSuccess.classList.add('is-active');
    }, 500);
}