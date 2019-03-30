// https://gist.github.com/evertbouw/94d4a9fdce93b34c31614a673acab73f
import { ActionsObservable, StateObservable } from 'redux-observable';
import { TestScheduler } from 'rxjs/testing';

const assertDeepEquals = (actual, expected) => {
  expect(actual).toEqual(expected);
};

export const marbleTest = ({
  epic,
  actions,
  states = '',
  expected,
  values,
  dependencies,
}) => {
  const testScheduler = new TestScheduler(assertDeepEquals);

  testScheduler.run(({ hot, expectObservable }) => {
    const state$ = new StateObservable(hot(states, values), values.s);
    const action$ = new ActionsObservable(hot(actions, values));
    const output$ = epic(action$, state$, dependencies);

    expectObservable(output$).toBe(expected, values);
  });
};
