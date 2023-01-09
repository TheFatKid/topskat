//Variables:
//// salary_amount_year = salary summed up yearly
//// salary_amount_month = salary monthly (* 12 to get the yearly amount)
//// tax_percentage = convert a xx number to 0.xx
//// am_percentage = 0.08
//// topskat_percentage = 0.15
//// topskat_limit = 544800
//// tax_amount_paid = salary_amount_year * (tax_percentage + am_percentage)
//// topskat_paid_amount = (tax_amount_paid - topskat_limit) * topskat_percentage
//// under_topskat = salary_amount_year < 544800

var (salary_amount_month = document.getElementsByName("salary_amount_month")[0].value;

var (tax_percentage = document.getElementsByName("tax_percentage")[0].value;


//Input field for salary, first check will be if it is higher than 544800
//If it isn't higher, the site will state "Du skal ikke betale topskat"
//Extra calculation will show if you earn x amount more, you will need to pay topskat
//salary_amount_month - 544800 = "Du skal tjene: " + "under_topskat" + " for at betale topskat."
// The salary is higher than 544800, so the amount bigger than 544800 should have a 15% tax reduction
//The site will output "Du skal betale topskat"
// "Forventet indkomst efter skat: " + "topskat_amount" + " kr."
//Normal tax paid "tax_amount_paid"
//Topskat paid "topskat_amount_paid"
//Extra calculation to show how much less you should earn to avoid paying topskat


//Pay topskat or not?
function beregn_topskat() {
    var topskat;
    if (salary_amount_month*12 >= 544800)
    console.log("Du skal betale topskat")
} else {
    console.log("Du skal ikke betale topskat")
};
//Amount paid to normal skat
let tax_amount_paid =  tax_percentage * (salary_amount_month*12);


//How much should be paid in topskat?
//// topskat_paid_amount = (tax_amount_paid - topskat_limit) * topskat_percentage
let topskat_paid_amount = ((salary_amount_month*12) - 544800) * 0.15;
