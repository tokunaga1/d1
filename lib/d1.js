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

    this.subscriptions.add(atom.workspace.addOpener(uri => {
      if (uri === 'atom://d1-view') {
        return new D1View();
      }
    }));

    require('atom-package-deps')
      .install('d1')
      .then(function() {
        console.log('All dependencies installed, good to go')
      })
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
    atom.workspace.toggle('atom://d1-view');
  }

};
