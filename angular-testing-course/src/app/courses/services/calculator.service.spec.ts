import { CalculatorService } from "./calculator.service";
import { LoggerService } from "./logger.service";
import Spy = jasmine.Spy;
import { TestBed } from "@angular/core/testing";

let calculator: CalculatorService;
let loggerSpy;

describe("CalculatorService", () => {
  beforeEach(() => {
    // const logger = new LoggerService();
    loggerSpy = jasmine.createSpyObj("LoggerService", ["log"]);

    // logger.log.and.returnValue();
    // spyOn(logger, "log");
    TestBed.configureTestingModule({
      providers: [
        CalculatorService,
        {
          provide: LoggerService,
          useValue: loggerSpy,
        },
      ],
    });

    calculator = TestBed.inject(CalculatorService);
  });

  it("should add 2 numbers", () => {
    const result = calculator.add(1, 2);

    expect(result).toBe(3);
    expect(loggerSpy.log).toHaveBeenCalledTimes(1);
  });

  it("should subtract 2 numbers", () => {
    const result = calculator.subtract(1, 2);

    expect(result).toBe(-1);
    expect(loggerSpy.log).toHaveBeenCalledTimes(1);
  });
});
