import React from "react";
import { navigate } from "@reach/router";

const SelectionContext = React.createContext({
  selection: [],
  addToSelection: () => {},
  removeFromSelection: () => {}
});

export const { Consumer } = SelectionContext;

export class SelectionProvider extends React.Component {
  state = {
    selection: [],
    // eslint-disable-next-line react/no-unused-state
    addToSelection: this.addToSelection,
    // eslint-disable-next-line react/no-unused-state
    removeFromSelection: this.removeFromSelection
  };
  addToSelection = product =>
    this.setState(
      state => ({ selection: [...state.selection, product] }),
      () => navigate("/selection")
    );
  removeFromSelection = index =>
    this.setState(state => {
      const nextSelection = [...state.selection];
      nextSelection.splice(index, 1);
      return { selection: nextSelection };
    });
  render() {
    const { children } = this.props;
    return (
      <SelectionContext.Provider value={this.state}>
        {children}
        <button data-selection-length={this.state.selection.length}>
          Your selection
        </button>
      </SelectionContext.Provider>
    );
  }
}
