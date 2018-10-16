import styles from './static/sass/style.scss'
import logo from './static/img/db-logo.png'
import balance from './static/img/services-balance.jpg'
import avg from './some';

let image = document.querySelector('.logo-img');
let image2 = document.querySelector('.service__elem-img');
//
image.src = logo;
image2.src = balance;

console.log(logo);
console.log(avg(5, 4, 8));