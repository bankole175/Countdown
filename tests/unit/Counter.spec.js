import { mount } from "@vue/test-utils";
import Countdown from "../../src/components/Countdown";
import TestHelpers from "./test-helper";
import expect from "expect";
import sinon from "sinon";
import moment from "moment";

describe("Countdown", () => {
  let wrapper;
  let clock;
  let h;

  beforeEach(() => {
    clock = sinon.useFakeTimers();

    wrapper = mount(Countdown, {
      propsData: {
        until: moment().add(30, "seconds")
      }
    });

    h = new TestHelpers(wrapper, expect);
  });

  afterEach(() => clock.restore());

  it("renders without errors", () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  it("renders a countdown timer", () => {
    h.see("30 Seconds");
  });

  it("reduces the countdown every second", done => {
    h.see("30 Seconds");

    clock.tick(1000);

    // nextTick will update the DOM
    h.assertOnNextTick(() => {
      h.see("29 Seconds");
    }, done);
  });

  it("confirms that completed is emitted when counter is 0", done => {
    clock.tick(30000);

    h.assertOnNextTick(() => {
      expect(wrapper.emitted("completed")).toBeTruthy();
    }, done);
  });

  it("clears the interval once completed", done => {
    clock.tick(30000);

    expect(wrapper.vm.now.getSeconds()).toBe(30);

    h.assertOnNextTick(() => {
      clock.tick(100);

      expect(wrapper.vm.now.getSeconds()).toBe(30);
    }, done);
  });
});
