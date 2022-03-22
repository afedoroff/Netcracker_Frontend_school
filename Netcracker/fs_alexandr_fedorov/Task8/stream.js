import {Observable, range, filter, merge, fromEvent} from "rxjs";

function subtask1(){
    const stream1$ = range(1, 100);

    stream1$
        .pipe(
            filter(n => {
                if (n < 2) return false;
                let q = Math.floor(Math.sqrt(n));
                for (let i = 2; i <= q; i++) {
                    if (n % i == 0) return false;
                }
                return true;
            })
        )
        .subscribe({
        next: v => console.log(v),
        error: e => console.error(e),
        complete: () => {
            console.log("complete");
        }
    });
}

function subtask2(){
    const stream$ = new Observable(observer => {
        observer.next(5);
        observer.next(4);
        observer.next(3);
        observer.next(2);
        observer.next(1);
        observer.error("some error");
    });

    const subscription = stream$.subscribe({
        next: v => alert(v),
        error: e => alert(e),
        complete: () => alert("complete")
    })
    //subscription.unsubscribe();
}

function subtask3(){
    let body = document.querySelector("body"),
        btns = document.getElementsByTagName("button");

    const s1$ = fromEvent(btns[0], 'click');
    const s2$ = fromEvent(btns[1], 'click');
    const s3$ = fromEvent(btns[2], 'click');

    merge(s1$, s2$, s3$).subscribe(event => {
            let r = Math.floor(Math.random() * (256)),
                g = Math.floor(Math.random() * (256)),
                b = Math.floor(Math.random() * (256)),
                color = '#' + r.toString(16) + g.toString(16) + b.toString(16);
            body.style.backgroundColor = color;
            console.log(event);
        }
    );

}

subtask1();
subtask2();
subtask3();


