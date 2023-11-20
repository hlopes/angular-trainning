import { fakeAsync, flush, flushMicrotasks, tick } from "@angular/core/testing";
import { of } from "rxjs";
import { delay } from "rxjs/operators";

describe("Async Example", () => {
  it("jasmine done", (done) => {
    let test = false;

    setTimeout(() => {
      test = true;

      expect(test).toBe(true);

      done();
    }, 1000);
  });

  it("test", fakeAsync(() => {
    let test = false;

    setTimeout(() => {
      test = true;
    }, 1000);

    // tick(1000);
    flush();
    // flushMicrotasks();

    expect(test).toBe(true);
  }));

  it("multiple", fakeAsync(() => {
    let counter = 0;

    Promise.resolve().then(() => {
      counter += 10;

      setTimeout(() => {
        counter += 1;
      }, 1000);
    });

    expect(counter).toBe(0);

    flushMicrotasks();
    expect(counter).toBe(10);

    flush();
    expect(counter).toBe(11);
  }));

  it("Observable", fakeAsync(() => {
    let flag = false;

    const test$ = of(flag).pipe(delay(1000));

    test$.subscribe(() => {
      flag = true;
    });

    tick(1000);

    expect(flag).toBe(true);
  }));
});
