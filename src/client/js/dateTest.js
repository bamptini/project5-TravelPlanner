function run(e) {
const city = "London";
const sDate = new Date();
const eDate = new Date();
eDate.setDate(sDate.getDate() +1);

console.log("Todays date is "+ sDate)
console.log("Tomorrows date is " + eDate)

};

run()