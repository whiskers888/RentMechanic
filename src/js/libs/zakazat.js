//date picker
// const MONTH_NAMES = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
// const DAYS = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
//
// const options = {
//     year: 'numeric',
//     month: 'numeric',
//     day: 'numeric',
//     hour: 'numeric',
//     minute: 'numeric',
//     second: 'numeric'
// };
//
// function app() {
//     return {
//         showDatepicker: false,
//         datepickerValue: '',
//         month: '',
//         year: '',
//         dateFormat: "DD-MM-YYYY",
//         no_of_days: [],
//         blankdays: [],
//         days: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
//
//         initDate() {
//             let today = new Date();
//             this.month = today.getMonth();
//             this.year = today.getFullYear();
//             this.datepickerValue = new Date(this.year, this.month, today.getDate()).toDateString();
//         },
//
//         isToday(date) {
//             const today = new Date();
//             const d = new Date(this.year, this.month, date);
//
//             return today.toDateString() === d.toDateString();
//         },
//
//         getDateValue(date) {
//             let selectedDate = new Date(this.year, this.month, date);
//             this.datepickerValue = selectedDate.toDateString();
//
//             this.$refs.date.value = selectedDate.getFullYear() +"-"+ ('0'+ selectedDate.getMonth()).slice(-2) +"-"+ ('0' + selectedDate.getDate()).slice(-2);
//
//
//
//             this.showDatepicker = false;
//         },
//
//         getNoOfDays() {
//             let daysInMonth = new Date(this.year, this.month + 1, 0).getDate();
//
//             // find where to start calendar day of week
//             let dayOfWeek = new Date(this.year, this.month).getDay();
//             let blankdaysArray = [];
//             for ( let i=1; i <= dayOfWeek; i++) {
//                 blankdaysArray.push(i);
//             }
//
//             let daysArray = [];
//             for ( let i=1; i <= daysInMonth; i++) {
//                 daysArray.push(i);
//             }
//
//             this.blankdays = blankdaysArray;
//             this.no_of_days = daysArray;
//         }
//     }
// }
//
// function range() {
//     return {
//         minprice: 3,
//         maxprice: 5,
//         min: 3,
//         max: 8,
//         minthumb: 3,
//         maxthumb: 8,
//
//         mintrigger() {
//             this.minprice = 3;
//             this.minthumb = 0;
//         },
//
//         maxtrigger() {
//             this.maxprice = Math.max(this.maxprice, this.minprice);
//             this.maxthumb = 100 - (((this.maxprice - this.min) / (this.max - this.min)) * 100);
//         },
//     }
// }
// //counter
function decrement(e) {
    const btn = e.target.parentNode.parentElement.querySelector(
        'button[data-action="decrement"]'
    );
    const target = btn.nextElementSibling;
    let value = Number(target.value);
    value--;
    target.value = value;

    if (value < 0) {
        target.value = 0;
    }
}

function increment(e) {
    const btn = e.target.parentNode.parentElement.querySelector(
        'button[data-action="decrement"]'
    );
    const target = btn.nextElementSibling;
    let value = Number(target.value);
    value++;
    target.value = value;
}

const decrementButtons = document.querySelectorAll(
    `button[data-action="decrement"]`
);

const incrementButtons = document.querySelectorAll(
    `button[data-action="increment"]`
);

decrementButtons.forEach(btn => {
    btn.addEventListener("click", decrement);
});

incrementButtons.forEach(btn => {
    btn.addEventListener("click", increment);
});


const MONTH_NAMES = [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
];
const MONTH_SHORT_NAMES = [
    "Янв",
    "Фев",
    "Март",
    "Апр",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сент",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
];
const DAYS = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

function app() {
    return {
        showDatepicker: false,
        datepickerValue: "",
        selectedDate: new Date(),
        dateFormat: "DD-MM-YYYY",
        month: "",
        year: "",
        no_of_days: [],
        blankdays: [],
        initDate() {
            let today;
            if (this.selectedDate) {
                today = new Date(Date.parse(this.selectedDate));
            } else {
                today = new Date();
            }
            this.month = today.getMonth();
            this.year = today.getFullYear();
            this.datepickerValue = this.formatDateForDisplay(
                today
            );
        },
        formatDateForDisplay(date) {
            let formattedDay = DAYS[date.getDay()];
            let formattedDate = ("0" + date.getDate()).slice(
                -2
            ); // appends 0 (zero) in single digit date
            let formattedMonth = MONTH_NAMES[date.getMonth()];
            let formattedMonthShortName =
                MONTH_SHORT_NAMES[date.getMonth()];
            let formattedMonthInNumber = (
                "0" +
                (parseInt(date.getMonth()) + 1)
            ).slice(-2);
            let formattedYear = date.getFullYear();
            if (this.dateFormat === "DD-MM-YYYY") {
                return `${formattedDate}.${formattedMonthInNumber}.${formattedYear}`; // 02-04-2021
            }
            if (this.dateFormat === "YYYY-MM-DD") {
                return `${formattedYear}-${formattedMonthInNumber}-${formattedDate}`; // 2021-04-02
            }
            if (this.dateFormat === "D d M, Y") {
                return `${formattedDay} ${formattedDate} ${formattedMonthShortName} ${formattedYear}`; // Tue 02 Mar 2021
            }
            return `${formattedDay} ${formattedDate} ${formattedMonth} ${formattedYear}`;
        },
        isSelectedDate(date) {
            const d = new Date(this.year, this.month, date);
            return this.datepickerValue ===
                this.formatDateForDisplay(d);
        },
        isToday(date) {
            const today = new Date();
            const d = new Date(this.year, this.month, date);
            return today.toDateString() === d.toDateString();
        },
        getDateValue(date) {
            let selectedDate = new Date(
                this.year,
                this.month,
                date
            );
            this.datepickerValue = this.formatDateForDisplay(
                selectedDate
            );
            // this.$refs.date.value = selectedDate.getFullYear() + "-" + ('0' + formattedMonthInNumber).slice(-2) + "-" + ('0' + selectedDate.getDate()).slice(-2);
            this.isSelectedDate(date);
            this.showDatepicker = false;
        },
        getNoOfDays() {
            let daysInMonth = new Date(
                this.year,
                this.month + 1,
                0
            ).getDate();
            // find where to start calendar day of week
            let dayOfWeek = new Date(
                this.year,
                this.month
            ).getDay();
            let blankdaysArray = [];
            for (let i = 1; i <= dayOfWeek; i++) {
                blankdaysArray.push(i);
            }
            let daysArray = [];
            for (let i = 1; i <= daysInMonth; i++) {
                daysArray.push(i);
            }
            this.blankdays = blankdaysArray;
            this.no_of_days = daysArray;
        },
    };
}

function range() {
    return {
        minprice: 3,
        maxprice: 5,
        min: 3,
        max: getWidth.max,
        minthumb: 3,
        maxthumb: 8,
        mintrigger()
    {
        this.minprice = 3;
        this.minthumb = 0;
    }
,

    maxtrigger()
    {
        this.maxprice = Math.max(this.maxprice, this.minprice);
        this.maxthumb = 100 - (((this.maxprice - this.min) / (this.max - this.min)) * 100);
    },

}
}

//mass null

function functionName(currentTargetElement) {

    let btns = currentTargetElement.getElementsByClassName('push-button')

    //console.log("111",btns)

    for (let elem of btns) {

        if (elem.classList.contains('activated')) {

            elem.classList.remove('activated');
            elem.classList.remove("not-shadow-mass-button");

        } else {
            //console.log('не нашел')

        }


    }
};

function push_btn(e) {

    if (e.currentTarget.parentNode.parentElement.classList.contains('selected-1'))  {

        functionName(e.currentTarget.parentNode.parentElement);

    }

    this.classList.toggle("activated");

    this.classList.toggle('not-shadow-mass-button');

}

//push button

// Выбираем все кнопки на странице и получаем массив
let btns = document.querySelectorAll('.push-button')

// Проходим по массиву
btns.forEach(function (btn) {

    str = 0;
//
//     // Вешаем событие клик
    btn.addEventListener('click', push_btn)
})

