export class Store {
  private subscribers : Function[];
  private reducers : { [ key:string ]: Function }
  private state : { [ key: string ]: any }
  constructor(reducers={},initialState={}) {
    this.subscribers = [];
    this.reducers = reducers;
    this.state = initialState;
  }
  get value() {
    return this.state;
  }
  subscribe(fn) {
    this.subscribers = [...this.subscribers,fn];
    this.notify();
  }
  dispatch(action) {
    this.state = this.reduce(this.state,action);
    this.notify();
  }
  private notify() {
    this.subscribers.forEach(fn => fn(this.value) )
  }
  private reduce(state, action) {
    const newState = {};
    for(const prop in this.reducers){
      newState[prop] = this.reducers[prop](state[prop],action);
    }
    console.log(newState);
    return newState;
  }
}
