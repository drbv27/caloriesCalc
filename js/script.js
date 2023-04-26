const d = document;
const calcForm = d.getElementById('calcForm');
const showDiv = d.getElementById('showDiv');

calcForm.addEventListener('submit', (e) => {
    e.preventDefault();
    calcCalories();
})


function calcCalories() {
    showCalculus();
    
    const userName = d.querySelector('#name');
    const idType = d.querySelector('#idType');
    const idNumber = d.querySelector('#idNum');
    const age = d.querySelector('#age');
    const weight = d.querySelector('#weight');
    const height = d.querySelector('#height');
    const gender = d.querySelector('input[name="gender"]:checked');
    const level = d.querySelector('#level');
    // const totalCalorias = document.querySelector('#total-calorias');

    const TMBFactor = {
        weight: 10,
        height: 6.25,
        age: 5
    }

    if(weight.value < 30){
        showError('Por favor ingrese un peso válido');
        return; 
    }else if ( !(Boolean(userName.value) 
                && Boolean(idType.value) 
                && Boolean(idNumber.value) 
                && Boolean (age.value) 
                && Boolean (weight.value) 
                && Boolean (height.value) 
                && Boolean(level.value)) ) {
        showError('Todos los campos son obligatorios');
        return;  
    } else if (age.value < 15 
                || age.value > 80) {
        showError('Ingrese una edad valida');
        return;
    } else if (height.value < 100 
                || height.value >250){
        showError('La altura ingresada no es permitida');
        return;
    }
    
    let caloriesCalc;
    if (gender.id === 'hombre') {
        //Hombres: valor actividad x (10 x peso en kg) + (6,25 × altura en cm) - (5 × edad en años) + 5
        caloriesCalc = level.value * ((TMBFactor.weight * weight.value) +
                                             (TMBFactor.height * height.value) -
                                             (TMBFactor.age * age.value)) + 5;
    } else {
        //Mujeres: valor actividad x (10 x peso en kg) + (6,25 × altura en cm) - (5 × edad en años) - 161
        caloriesCalc = level.value * ((TMBFactor.weight * weight.value) +
                                             (TMBFactor.height * height.value) -
                                             (TMBFactor.age * age.value)) -161
    }
    
    // totalCalorias.value = `${Math.floor(caloriesCalc)} kcal`;
    
    showDiv.innerHTML = ` 
        <div class=" 
                d-flex 
                flex-column 
                justify-content-center 
                align-items-center 
                h-100" 
            id="calculo" >
             <div>
                <h5 class="
                        card-title 
                        h2" 
                    style="color: #5dc1b9; font-weight: bold;">
                    Calorías requeridas
                </h5>
             </div>
            <div class="mb-3">
                <input class="
                            form-control 
                            text-center" 
                        value="${Math.floor(caloriesCalc)} kcal" 
                        style="font-size: 2rem; width: 10rem; background-color: #c7f7f7; border: 0; color: #338b85; border-radius: 0.5rem;" disabled>
            </div>
            <div>
                <p class="text-center" 
                        style="font-size: 1.5rem"> 
                            El/La paciente 
                            <span style="font-weight: bold;"> ${userName.value} </span> 
                            identificado con 
                            <span style="font-weight: bold;">${idType.value}  </span> 
                            No. ${idNumber.value}.
                </p>
            
                <p class="text-center" 
                        style="font-size: 1.5rem">  
                            Requiere un total de 
                            <span style="font-weight: bold;"> 
                            ${Math.floor(caloriesCalc)} kcal </span> 
                            para el sostenimiento de su Tasa Basal Metabólica 
                            <span style="font-weight: bold;"> TBM. </span> 
                </p>
            </div>
            <div>
                <h7 class="card-title h2" 
                    style="color: #5dc1b9; font-weight: bold;">
                            Grupo poblacional
                </h7>
             </div>
            <div class="mb-3">
            <p class="text-center" 
                style="font-size: 1.5rem;"> 
                ${popGroup(age.value)}
            </p>
            </div>
        </div>
    `

    userName.value = null;
    idType.value = null,
    idNumber.value = null;
    weight.value = null;
    height.value = null;
    age.value = null;
    level.value = null;

}

//grupo poblacional
function popGroup(age){
    var message = '';
    if (age >= 15 && age <= 29){
        message = "Según la edad, el paciente pertenece a la población joven."
        return message;
    }else if(age >= 30 && age <= 59){
        message = "Según la edad, el paciente pertenece a la población adulta."
        return message;
    }else if (age >= 60){
        message = "Según la edad, el paciente pertenece a la población de adultos mayores."
        return message;
    }

}

function showError(msg) {
    const calculo = d.querySelector('#calculo');
    if (calculo) {
        calculo.remove();
    }
    const divError = d.createElement('div');
    divError.className = 'd-flex justify-content-center align-items-center h-100';
    divError.innerHTML = `<span class="alert alert-danger text-center">${msg}</span>`;
    showDiv.appendChild(divError);
    setTimeout(() => {
        divError.remove();
        clearData();
    }, 5000);
}


// Animaciones
function showCalculus() {
    showDiv.style.top = '100vh';
    showDiv.style.display = 'block';
    
    let distance = 100;
    let sustractor = 0.3;
    let id = setInterval(() => {
        sustractor *= 1.1;
        showDiv.style.top = `${distance - sustractor}vh`;
        if (sustractor > 100) {
            clearInterval(id);
        }
    }, 10)
}

function clearData() {
    let distance = 1;

    let id = setInterval(() => {
        distance *= 2;
        showDiv.style.top = `${distance}vh`;
        if (distance > 100) {
            clearInterval(id);
            showDiv.style.display = 'none';
            showDiv.style.top = 0;
        }
    }, 10)
}