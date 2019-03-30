import React, { PureComponent } from 'react';
import { from } from 'rxjs';
import {
  mergeMap,
} from 'rxjs/operators';

import store from '../store';

const createLoader = (WrappedComponent, loads) => (
  class extends PureComponent {
    static displayName = `loader(${WrappedComponent.displayName || ''})`;

    state = {
      isLoaded: !loads,
    };

    componentDidMount() {
      this.loadModule();
    }

    componentWillUnmount() {
      if (this.loader$) {
        this.loader$.unsubscribe();
      }
    }

    loadModule = () => {
      if (!loads) {
        return;
      }
      this.loader$ = from([].concat(loads))
        .pipe(
          mergeMap((load) => load(store))
        )
        .subscribe(
          () => {
            this.setState({
              isLoaded: true,
            });
          },
          () => {
            console.warn('loading error');
          }
        );
    }

    render() {
      const { isLoaded } = this.state;

      if (isLoaded) {
        return (
          <WrappedComponent {...this.props} />
        );
      }

      return null;
    }
  }
);

export default createLoader;
