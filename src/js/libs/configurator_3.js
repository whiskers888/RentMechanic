//Total object
let total = {
    a: 0, b: 0, date_first: 0, date_last: 0, rezhim: [{}], dopItems: {}, selected: [{}], getTarif: function () {

//Получаем значение тарифа
        for (let key in total.selected) {
            getTarif = parseInt(total.selected[key]);
        }

//Получаем значение доп оборудования
        let getDopItems = 0;
        for (let key in total.dopItems) {
            getDopItems += parseInt(total.dopItems[key]);
        }
//Колличество техники
        //значение колличества техники

        let countTech = document.getElementById('custom-input-number');
        if (countTech) {
            total.count = countTech.value;


        //Проверка кол-ва техники на < 1
        let countTech2 = document.getElementById('custom-input-number').value;
        //console.log("countTech2countTech2",countTech2)
        if (countTech2 == 1) {
            btnIncr = document.getElementById('decrement');
            btnIncr.setAttribute('disabled', true);
        } else {
            btnIncr.removeAttribute('disabled');
        }

        }
        let count = total.count;

        //расчет даты
        //console.log("start getDatre");
        let a = moment(total.date_first, "DD.MM.YYYY");
        //console.log("a",a);
        let b = moment(total.date_last, "DD.MM.YYYY").add(1, "days");
        // .add(1, "days");
        //кол-во дней
        let days = b.diff(a, 'days');
        //console.log("кол-во дней",days)

        //определить последнюю цифру в кол-ве дней

        if (document.getElementById("daysOf")){

        let daysOf = days;
        daysOf = daysOf % 10;
        if (daysOf == 1) {
            document.getElementById("daysOf").innerText = 'день';
        } else {
            if ((daysOf == 2) || (daysOf == 3) || (daysOf == 4)) {
                document.getElementById("daysOf").innerText = 'дня';
            } else {
                document.getElementById("daysOf").innerText = 'дней';
            }

        }

        let daysOf1 = days;
        daysOf1 = daysOf1 % 10;
        if (daysOf1 == 1) {
            document.getElementById("daysOf").innerText = 'день';
        } else {
            if ((daysOf1 == 2) || (daysOf1 == 3) || (daysOf1 == 4)) {
                document.getElementById("daysOf1").innerText = 'дня';
            } else {
                document.getElementById("daysOf1").innerText = 'дней';
            }

        }

        //console.log("daysOf",daysOf)
        //Получаем значение режима (одна смена, две смены)
        let getRezhim = 0;
        for (let key in total.rezhim) {
            getRezhim = parseInt(total.rezhim[key]);
        }
        //кол-во часов
        ColHours = getRezhim;
        //console.log("ColHours",ColHours)
        //Общая формула

        totalCost = ((getTarif + getDopItems) * getRezhim * count) * days;



        //Проверка округления итого без НДС до целого
        totalCostWo = parseFloat(totalCost / 1.2).toFixed(0);
        let totalCostWo1 = totalCostWo
        totalCostWo1 = totalCostWo1 % 10;
        if (totalCostWo1 !== 0) {

            //totalCostWo = (parseFloat((parseFloat(totalCost / 1.2).toFixed(0)) / 10).toFixed(0)) * 10;



            // totalCostWo = parseFloat(totalCost/1.2).toFixed(0);
        }

        //Проверка округления до целого цены без НДС
        ndsCost = parseFloat((getTarif + getDopItems) - (parseFloat((getTarif + getDopItems) / 1.2).toFixed(2))).toFixed(2);


        //console.log("ndsCost",ndsCost)
        let ndsCost1 = ndsCost
        ndsCost1 = ndsCost1 % 10;
        if (ndsCost1 == 0) {
            ndsCost = parseFloat((getTarif + getDopItems) - (parseFloat((getTarif + getDopItems) / 1.2).toFixed(2))).toFixed(0);
        }

        //let tarifWo = Intl.NumberFormat('ru-RU').format(parseFloat((getTarif + getDopItems) / 1.2).toFixed(0));

        let tarifWo =  Math.ceil((parseFloat((getTarif + getDopItems) / 1.2).toFixed(0))/10)*10;

        //totalCostWo = Intl.NumberFormat('ru-RU').format((tarifWo * getRezhim * count) * days);

        totalCostWo = (tarifWo * getRezhim * count) * days;

        document.getElementById("tarif").innerHTML = Intl.NumberFormat('ru-RU').format(getTarif + getDopItems);
        document.getElementById("tarifWo").innerHTML = Intl.NumberFormat('ru-RU').format(tarifWo);
        document.getElementById("nds").innerHTML = ndsCost;
        document.getElementById("hours").innerHTML = ColHours/10*days;
        document.getElementById("hoursS").innerHTML = ColHours*days;
        document.getElementById("hours_1").innerHTML = ColHours*days;
        document.getElementById("hours1").innerHTML = ColHours/10*days;
        document.getElementById("days").innerHTML = days;
        document.getElementById("days1").innerHTML = days;
        document.getElementById("totalCost").innerHTML = Intl.NumberFormat('ru-RU').format(totalCost) + " руб";
        document.getElementById("totalCostWo").innerHTML = Intl.NumberFormat('ru-RU').format(totalCostWo) + " руб";
    }
}
}


//нажимаем на кнопки режим и масса (делаем по умолчанию)
let activeBtn = document.querySelectorAll('#massa .activated')[0];

if (activeBtn) {
    activeBtn.classList.add('not-shadow-mass-button');

loadparams(activeBtn.getAttribute('data-id')).then(start);
}
function start() {

    let activeBtn = document.querySelectorAll('#massa .activated')[0];
    if (activeBtn) {
        activeBtn.click();
    }

    let activeRezhim = document.querySelectorAll('#rezhim .activated')[0];
    if (activeRezhim) {
        activeRezhim.click();
    }
}

let activeBtn1 = document.querySelectorAll('#massa button');

activeBtn1.forEach((elem) => {

    elem.addEventListener('click', () => {

        loadparams(elem.getAttribute('data-id'));
        console.log("getAttribute",elem.getAttribute('data-id'));


    });
});

//обработка кнопок из запроса ajax
function getClassBtn(isLoad = false) {

    let allBtnClass = document.querySelectorAll('.-mt-48 button');


    allBtnClass.forEach((elem) => {
        elem.addEventListener('click', () => {

            let selected = elem.parentNode;

            if (selected.classList.contains('selected-1')) {

                if (elem.classList.contains('activated')) {

                    let btnActiveMassa = document.querySelectorAll('#massa button')
                    //console.log("btnActiveMassa", btnActiveMassa)
                    for (let i = 0; i < btnActiveMassa.length; i++) {
                        if (btnActiveMassa[i].classList.contains('activated')) {

                            //console.log(btnActiveMassa[i])

                                //loadparams(btnActiveMassa[i].getAttribute('data-id'));

                            if (btnActiveMassa[i].hasAttribute('data-button')) {
                                let elemName = btnActiveMassa[i].innerHTML;
                                total.selected[elemName] = btnActiveMassa[i].getAttribute('data-button');

                                //console.log("total-111",total)
                            } else {
                            }
                        } else {
                            let elemName = btnActiveMassa[i].innerHTML;
                            delete total.selected[elemName];
                            ////console.log("total-222",total)
                        }
                    }

                    let btnActiveRezhim = document.querySelectorAll('.rezhim button')
                    for (i = 0; i < btnActiveRezhim.length; i++) {
                        if (btnActiveRezhim[i].classList.contains('activated')) {
                            if (btnActiveRezhim[i].hasAttribute('data-button')) {
                                let elemName = btnActiveRezhim[i].innerHTML;
                                total.rezhim[elemName] = btnActiveRezhim[i].getAttribute('data-button');
                                ////console.log("total-111",total)
                            } else {
                            }
                        } else {
                            let elemName = btnActiveRezhim[i].innerHTML;
                            delete total.rezhim[elemName];
                            ////console.log("total-222",total)
                        }
                    }

                    total.getTarif();
                }

            } else {

                if (elem.hasAttribute('data-action')) {

                } else {

                    let elemSel2 = elem.parentNode.parentNode.parentNode.querySelectorAll('.selected-2 button');

                    elemSel2.forEach((elem) => {

                        elem.addEventListener('click', () => {

                            let elemB = elem.parentNode.querySelectorAll('button');

                            for (let i=0; i < elemB.length; i++) {

                               elemB[i].classList.remove('activated','not-shadow-mass-button')
                            }

                            elem.classList.add('activated','not-shadow-mass-button');

                        })

                    });

                        elem.classList.toggle('activated')
                        elem.classList.toggle('not-shadow-mass-button')
                        if (elem.classList.contains('activated')) {
                            if (elem.hasAttribute('data-value')) {
                                let elemName = elem.innerHTML;
                                total.dopItems[elemName] = elem.getAttribute('data-value');
                            } else {
                            }
                        } else {
                            let elemName = elem.innerHTML;
                            delete total.dopItems[elemName];
                        }
                }
                total.getTarif();
                //console.log("total",total)
            }
        })
    })

}

//функция получения параметров даты
//Объявить пикер1

    let m = { dateFirst: 0, dateLast: 0 }

    let dp1;
    let dp2;
    let date_1;


    //пикер2

    dp2 = new Datepicker('#datepicker_2', {

        min: (function () {
            var date = new Date()
            date.setDate(date.getDate() + 28)
            //console.log('date-min', date)
            return date
        })(),

        fromValue: function () {
            var date = new Date()
            let newDate = date.setDate(date.getDate() + 29)
            return newDate
        },

        onRender: function () {
            this.min = date_1;
            this.minDate = date_1;
            this._opts.min = date_1;
            this._opts.minDate = date_1;
            //console.log('render ', this.min);
        },

        onChange: function (date) {
            //date_1 = date;

            total.date_last = date;
            total.getTarif();

        },

    })

//пикер 1

dp1 = new Datepicker('#datepicker', {

    min: (function () {
        var date = new Date()
        date.setDate(date.getDate() - 1)
        return date
    })(),

    fromValue: function () {
        var date = new Date()
        var today = date.setDate(date.getDate())
        return today
    },

    onInit: function () {
        m.dateFirst = new Date()
        let date1 = new Date(m.dateFirst)
        date1.setDate(date1.getDate() + 29)
        return m.dateFirst
    },

    onChange: function (date) {
        m.dateFirst = date
        let date1 = new Date(m.dateFirst)
        date1.setDate(date1.getDate() + 29)
        date_1 = date1;
        dp2.render();
        if (dp2.getDate() <= date1) {
            dp2.setDate(date1)
            total.date_last = date_1;
        }

        total.date_first = m.dateFirst;
        total.getTarif();
    },

});

//range slider
function fun1() {

    let slider = document.getElementById('myinput')
    if(slider) {
    let bubble = document.querySelector('.bubble')
    //let valMin = document.getElementById('valueMin')
    //let valMax = document.getElementById('valueMax')
    let min = slider.min
    let max = slider.max
    let value = slider.value

    //valMin.innerText = min
    //valMax.innerText = max

    slider.style.background = `linear-gradient(to right, #999999 0%, #999999 ${
        ((value - min) / (max - min)) * 100
    }%, #f5f5f5 ${((value - min) / (max - min)) * 100}%, #f5f5f5 100%)`

    slider.oninput = function () {
        this.style.background = `linear-gradient(to right, #999999 0%, #999999 ${
            ((this.value - this.min) / (this.max - this.min)) * 100
        }%, #f5f5f5 ${
            ((this.value - this.min) / (this.max - this.min)) * 100
        }%, #f5f5f5 100%)`
    }

    slider.addEventListener('input', () => {
        setBubble(slider, bubble)
    })
    setBubble(slider, bubble)

    function setBubble(range, bubble) {
        const val = range.value
        const min = range.min ? range.min : 0
        const max = range.max ? range.max : 100
        const newVal = Number(((val - min) * 100) / (max - min))
        bubble.innerHTML = val

        bubble.style.left = `calc(${newVal}% + (${12 - newVal * 0.19}px))`
    }


    // let rng = document.getElementById('r1'); //rng - это Input
    // if (rng) {
    //     let div = document.getElementById('test'); // div - блок test
    //     let max_rng = rng.getAttribute('max');
    //     let min_rng = rng.getAttribute('min');
    //     let step_rng = rng.getAttribute('step');
    //     let valueObj = document.getElementsByClassName('value_obj');
    //
    //     valueObj[0].innerHTML = rng.value + 'м';
    //
    //     //console.log("rng.value++", rng.value)
    //
    //     let divide = 100 / (max_rng - min_rng);
    //
    //     if (rng.value !== undefined) {
    //
    //         if (rng.value == min_rng) {
    //             //console.log("start value min")
    //             div.style.width = 0 + '%';
    //         }
    //
    //         if (rng.value == max_rng) {
    //             //console.log("start value max")
    //             div.style.width = 97 + '%';
    //         }
    //
    //         if ((rng.value !== max_rng) && (rng.value !== min_rng)) {
    //
    //             let minRng = min_rng;
    //             let dividePlus = 0;
    //
    //             for (i = 0; i <= (max_rng - min_rng); i++, dividePlus = dividePlus + (divide - 0.5)) {
    //
    //                 let range = minRng++
    //
    //                 let obj = {i, dividePlus, range}
    //
    //                 if (obj.range == rng.value) {
    //
    //                     div.style.width = obj.dividePlus + '%';
    //
    //                     //console.log("obj.dividePlus", obj.dividePlus)
    //                 }
    //
    //                 //console.log(obj)
    //             }
    //         }
    //     }
    // }
}
}
//fun1();


