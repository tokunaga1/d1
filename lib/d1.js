'use babel';

import D1View from './d1-view';
import { CompositeDisposable } from 'atom';

export default {

  d1View: null,
  subscriptions: null,

  activate(state) {
    this.d1View = new D1View(state.d1ViewState);

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'd1:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.subscriptions.dispose();
    this.d1View.destroy();
  },

  serialize() {
    return {
      d1ViewState: this.d1View.serialize()
    };
  },

  toggle() {
    console.log('D1 was toggled!');
  }

};
