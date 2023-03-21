// // 배열 구조 분해
// const err = [1, 2, 3];
// const one = arr[0];
// const two = arr[1];
// const three = arr[2];

// console.log(one, two, three);

// // 배열 구조 분해 사용
// const [deOne, deTwo, deThree] = arr;
// console.log(deOne, deTwo, deThree);

// // 날짜
// const today = new Date();
// console.log(today);
// // 2023-03-19T15:57:58.774Z

// const formatDay = today.toISOString().toString(0, 10);
// console.log(formatDay);
// // "2023-03-19"

// const [year, month, day] = formatDay.split('-');
// // const year = formatDay.split('-')[0]; //같은 코드
// console.log(year, month, day);
// // 2023, 03, 19

// 객체 구조 분호 할당 전
const obj = { firstName: '효석', lastName: '이' };
// const firstName = obj.firstName;
// const lastName = obj.lastName;
// console.log(firstName, lastName);

// 객체 구조 분해 할당 후
const { firstName, lastName } = obj;
console.log(firstName, lastName); // 효석 이

const person = {
  name: 'Lee',
  address: {
    zipCode: '03068',
    city: 'Seoul',
  },
};

const {
  address: { zipCode, city },
} = person;

console.log(city, zipCode);
