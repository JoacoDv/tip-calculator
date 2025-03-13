const calculator = document.querySelector(".calculator")
const checkboxes = document.querySelectorAll('input[type="checkbox"]');
const customInput = document.getElementById('custom');
const labels = document.querySelectorAll('.btn-percentage');
const persons = document.querySelector(".person")
const amount = document.querySelector(".amount")
const totalTip = document.getElementById("total-tip")
const tipPerPerson = document.getElementById("tip-person")
const btnReset = document.getElementById("reset")
const firstLabel = document.querySelector(".first-text")
const secondLabel = document.querySelector(".second-text")
const grid = document.querySelector(".grid")
let amountValue
let personsValue
let percentage
import { animate, scroll } from "https://cdn.jsdelivr.net/npm/motion@latest/+esm"


//animations

const calculatorCihlds = Array.from(calculator.children)
animate(calculator, {y: [-50, 0]}, {ease:"easeOut", duration: .5})
calculatorCihlds.forEach(children => {
    animate(children, {x: [20, 0], opacity: [0,1], scale: [.6,1]}, {ease:"easeOut", duration: .5, delay: .5})
})
let timeDelay= .8
Array.from(grid.children).forEach(btn => {
    animate(btn,{y: [-20, 0], opacity: [0,1], scale: [.5, 1]}, {ease:"easeOut", duration: .3, delay: timeDelay})
    timeDelay += .3
})





// Checkboxes marked

checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function() {
        if (this.checked) {
            checkboxes.forEach(cb => cb.checked = false);
            this.checked = true;
            customInput.value = 'Custom'; // Borra el valor del input number
        }
        changeColorLabel()
        registrerPercentage()
        cleanPercentage(percentage)
        if(totalTip != "" && tipPerPerson != ""){
            const [totalTipValue ,tipPerPersonValue] = CalculateTip(amountValue, personsValue)
            render(tipPerPersonValue, totalTipValue)
        }
    });
});

// Change Label Color

function changeColorLabel() {

    checkboxes.forEach((casillero, index) =>{
        if (casillero.checked) {
            // Si está marcado, cambiar el color del label
            labels[index].style.backgroundColor = 'hsl(172, 67%, 45%)';
            labels[index].style.color = 'hsl(183, 100%, 15%)';
        } else {
            // Si no está marcado, volver al color original
            labels[index].style.backgroundColor = 'hsl(183, 100%, 15%)';
            labels[index].style.color = 'hsl(189, 41%, 97%)';
        }})
}

customInput.addEventListener("focus", function() {
    checkboxes.forEach(cb => cb.checked = false);
    drawLabels()
});

function drawLabels() {
    labels.forEach(label => {
        label.style.backgroundColor = 'hsl(183, 100%, 15%)';
        label.style.color = 'hsl(189, 41%, 97%)';
    });
}

// Find Percentage selected

function registrerPercentage() {
    checkboxes.forEach((casillero, index) =>{
        if (casillero.checked) {
            percentage = labels[index].innerText
        } 
    })
}

customInput.addEventListener("input", () => {
    percentage = customInput.value
    //avisar si agreagan una e o un valor negativo
    const [totalTipValue ,tipPerPersonValue] = CalculateTip(amountValue, personsValue)
    render(tipPerPersonValue, totalTipValue)
})

function cleanPercentage(percentageValue) {
        percentage = percentageValue.split("%")[0]
        percentage = parseFloat(percentage)
}

//Calculate tip eventListener and fuction

amount.addEventListener( "input",e => {
    amountValue = e.target.value
    if(amountValue === "0") {
        console.log(firstLabel)
        firstLabel.style.setProperty("--after-content", `"Can't be zero"`)
        firstLabel.style.setProperty("--left-percentage", `60%`)
        amount.style.border = "1px solid red"
        return
    }
    else if(amountValue < 0) {
        firstLabel.style.setProperty("--after-content", `"Can't be negative"`)
        firstLabel.style.setProperty("--left-percentage", `50%`)
        amount.style.border = "1px solid red"
        return
    }
    firstLabel.style.setProperty("--after-content", `""`)
    amount.style.border = "none"
    const [totalTipValue ,tipPerPersonValue] = CalculateTip(amountValue, personsValue)
    render(tipPerPersonValue, totalTipValue)
})
persons.addEventListener("input" , e => {
    personsValue = e.target.value
    if(personsValue === "0") {
        console.log(firstLabel)
        secondLabel.style.setProperty("--after-content", `"Can't be zero"`)
        secondLabel.style.setProperty("--left-percentage", `60%`)
        persons.style.border = "1px solid red"
        return
    }
    else if(personsValue < 0) {
        secondLabel.style.setProperty("--after-content", `"Can't be negative"`)
        secondLabel.style.setProperty("--left-percentage", `50%`)
        persons.style.border = "1px solid red"
        return
    }
    secondLabel.style.setProperty("--after-content", `""`)
    persons.style.border = "none"
    const [totalTipValue ,tipPerPersonValue] = CalculateTip(amountValue, personsValue)
    render(tipPerPersonValue, totalTipValue)
})

function resetAfterContent() {
    firstLabel.style.setProperty("--after-content", `""`)
    secondLabel.style.setProperty("--after-content", `""`)
    amount.style.border = "none"
    persons.style.border = "none"

}


function CalculateTip(amount, persons) {
    const bill = parseFloat(amount)
    const divisor = parseFloat(persons)
    if(bill < 0 | divisor < 0) return
    const totalTipValue = bill / 100 * percentage
    const tipPerPersonValue = totalTipValue / divisor
    return [totalTipValue, tipPerPersonValue]
}

// render results

function render (personTipValue, tipTotal) {
    if(isNaN(personTipValue) || isNaN(tipTotal)) return
    tipPerPerson.innerText = `$${personTipValue}`
    totalTip.innerText = `$${tipTotal}`
}

//Reset results and inputs

btnReset.addEventListener("click", () => {
    amountValue = ""
    personsValue = ""
    persons.value = ""
    amount.value = ""
    percentage = ""
    totalTip.innerText = "0.00"
    tipPerPerson.innerText = "0.00"
    checkboxes.forEach(checkbox => checkbox.checked = false)
    customInput.value = "Custom%"
    drawLabels()
})