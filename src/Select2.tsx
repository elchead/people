import React, { Component } from "react";

import CreatableSelect from "react-select/creatable";
import { ActionMeta, OnChangeValue } from "react-select";

interface State {
  readonly isLoading: boolean;
  readonly options: readonly Option[];
  readonly value: Option | null | undefined;
}

interface Option {
  readonly label: string;
  readonly value: string;
}

const createOption = (label: string) => ({
  label,
  value: label.toLowerCase().replace(/\W/g, ""),
});

const defaultOptions = [
  createOption("One"),
  createOption("Two"),
  createOption("Three"),
];

export default class Select extends Component<{}> {
  state: State = {
    isLoading: false,
    options: defaultOptions,
    value: undefined,
  };
  handleChange = (
    newValue: OnChangeValue<Option, true>,
    actionMeta: ActionMeta<Option>
  ) => {
    console.group("Value Changed");
    console.log(newValue);
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
  };
  handleCreate = (inputValue: string) => {
    this.setState({ isLoading: true });
    console.group("Option created");
    console.log("Wait a moment...");
    setTimeout(() => {
      const { options } = this.state;
      const newOption = createOption(inputValue);
      console.log(newOption);
      console.groupEnd();
      this.setState({
        isLoading: false,
        options: [...options, newOption],
        value: newOption,
      });
    }, 1000);
  };

  render() {
    const { isLoading, options, value } = this.state;
    return (
      <CreatableSelect
        isMulti
        onChange={this.handleChange}
        onCreateOption={this.handleCreate}
        options={options}
      />
    );
  }
}
