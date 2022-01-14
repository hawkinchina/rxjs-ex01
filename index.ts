import './style.css';

import { of, map, Observable, timer, fromEvent, take } from 'rxjs';

//01. hello world.
of('World')
  .pipe(map((name) => `Hello, ${name}!`))
  .subscribe(console.log);

//02. 加入时钟
const output = document.createElement('output');
document.body.prepend(output);

timer(0, 1000)
  .pipe(map(() => new Date().toLocaleTimeString()))
  .subscribe((time) => (output.textContent = time));

//03. rxjs 初步使用
// var button = document.querySelector('button');
// button.addEventListener('click', () => console.log('Clicked!'));

var button = document.querySelector('button');
fromEvent(button, 'click').subscribe(() =>
  console.log('Clicked!!!!!!!!!!!!!!!!!')
);

//04. observable原理

//阶段一: 极简版; 同步输出..
function simpleObservable(observer) {
  for (let i = 0; i < 10; i++) {
    observer.next(i, i + 100);
  }
  observer.complete();
}

const observer = {
  next: (value, another) =>
    console.log(`next -> ${value}`, `another -> ${another}`),
  error: () => {},
  complete: () => console.log('complete'),
};

simpleObservable(observer);

//05.01 test map of Array.
console.log(
  Array.from(
    [1, 2, 3].map((n, index) => {
      console.log('index: ' + index);
      return n * 3;
    })
  )
);

//05.02. 将类数组对象或可迭代对象转化为数组。
// Array.from(arrayLike[, mapFn[, thisArg]])
// 返回值为转换后的数组。
//arrayLike: 想要转换的类数组对象或可迭代对象。
// mapFn: 可选，map 函数，用于对每个元素进行处理，放入数组的是处理后的元素。
//thisArg: 可选，用于指定 map 函数执行时的 this 对象。
let mapFunction = {
  do: function (n: number) {
    return n * 100;
  },
};

let arrayLike = [1, 2, 3];

console.log(
  Array.from(
    arrayLike,
    function (n) {
      return this.do(n);
    },
    mapFunction
  )
);

console.log(
  Array.from(
    arrayLike,
    function (n: number, index: number) {
      console.log('n: ', n, 'index: ', index);
      return this.do(n); // this 指： 后面的mapFunction这个对象
    },
    mapFunction
  )
);

//06.
const example = of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10).pipe(
  take(5), //取头5个值
  map((val) => val * 1000)
);

// 输出:
const subscribe = example.subscribe((val) => console.log(val));

// Open the console in the bottom right to see results.
