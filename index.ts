import './style.css';

import { of, map, Observable, timer, fromEvent } from 'rxjs';

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

// Open the console in the bottom right to see results.
