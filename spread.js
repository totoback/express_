const { text } = require('express');

// * 전개 구문
const arr = [1, 2, 3, 4, 5];
console.log(arr); // [ 1, 2, 3, 4, 5 ]
console.log(...arr); // 1 2 3 4 5

const obj = {
  name: '이효석',
  status: '취함',
};

console.log(obj);
console.log({ ...obj }); // 객체 가져오기

const tetzData = {
  name: '이효석',
  age: 39,
};

const tetzInfo = {
  nickName: 'chicken head',
  status: '숙취',
};

const tetz = {
  tetzData,
  tetzInfo,
};

console.log(tetz);
// tetzData: { name: '이효석', age: 39 },
// tetzInfo: { nickName: 'chicken head', status: '숙취' }

const tetz1 = {
  ...tetzData,
  ...tetzInfo,
};
console.log(tetz1);
//{ name: '이효석', age: 39, nickName: 'chicken head', status: '숙취' }

const arr1 = [1, 2, 3];
const arr2 = ['4', '5', '6'];

// * 전개 연산자 사용
const merge = [...arr1, ...arr2];
console.log(merge);
//[ 1, 2, 3, '4', '5', '6' ]

const str = 'test';
console.log([...str]);
//[ 't', 'e', 's', 't' ]

// * 나머지 연산자
const tetz2 = {
  name: '이효석',
  gender: 'M',
  nickName: 'chichen head',
  email: '123@naver.com',
};
console.log(tetz2);
const { name, ...restInfo } = tetz2;
console.log(name, restInfo);
// 이효석 { gender: 'M', nickName: 'chichen head', email: '123@naver.com' }
// restInfo 나머지 객체

const arr3 = [1, 2, 3, 4, 5, 6, 7];
const [first, ...rest] = arr3;
console.log(first, rest);
// rest는 나머지 배열
// 1 [ 2, 3, 4, 5, 6, 7 ]

function spread(first, second, ...rest) {
  console.log(first); //1
  console.log(second); //2
  console.log(rest); //[ 3, 4, 5, 6, 7 ]
  console.log(...rest); // 3 4 5 6 7
}
spread(1, 2, 3, 4, 5, 6, 7);
