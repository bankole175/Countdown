class TestHelpers {
  constructor(wrapper, expect) {
    this.wrapper = wrapper;
    this.expect = expect;
  }

  see(text, selector) {
    let wrap = selector ? this.wrapper.find(selector) : this.wrapper;

    this.expect(wrap.html()).toContain(text);
  }

  type(text, selector) {
    let node = this.wrapper.find(selector);

    node.element.value = text;
    node.trigger("input");
  }

  click(selector) {
    this.wrapper.find(selector).trigger("click");
  }

  assertOnNextTick() {
    this.wrapper.vm.$nextTick();
  }
}
export default TestHelpers;
