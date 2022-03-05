import React, { Component } from "react";

import CreatableSelect from "react-select/creatable";
import { ActionMeta, OnChangeValue } from "react-select";
import produce from "immer";
import { Contact } from "../models/Contact";
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
  createOption("Family"),
  createOption("VIP"),
  createOption("Stifti"),
];

interface CommonProps {
  contact: Contact;
  label: string;
  editing: boolean;
  value: Array<string>;
  options: Set<string>;
  setPending: (c: Contact) => void;
  save: () => void;
}

interface ScalarFieldProps extends CommonProps {
  //   value: string;
}

export function SelectTag({
  contact,
  label,
  value,
  editing,
  setPending,
  save,
  options,
}: ScalarFieldProps) {
  const handleChange = (tags: Array<string>) => {
    console.log(
      produce(contact, (c) => {
        c[label] = tags;
      })
    );
    setPending(
      produce(contact, (c) => {
        c[label] = tags;
      })
    );
  };
  return (
    <div className="inputGroup">
      <label className="contact-label">{label}</label>
      {editing ? (
        <Select
          changeHandler={handleChange}
          defaultValue={
            value
              ? value.map((v) => {
                  return {
                    label: v,
                    value: v,
                  };
                })
              : undefined
          }
          options={options}
        />
      ) : (
        value?.map((v) => <div key={v}>{v + ","}</div>)
      )}
    </div>
  );
}

function createOptionsFromSet(set: Set<string>): Option[] {
  let options = new Array<Option>();
  set.forEach((tag) => options.push(createOption(tag)));
  return options;
}

export default class Select extends Component<{
  changeHandler: (tags: Array<string>) => void;
  defaultValue: Array<Option> | undefined;
  options?: Set<string>;
}> {
  state: State = {
    isLoading: false,
    options: this.props.options
      ? createOptionsFromSet(this.props.options)
      : defaultOptions,
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
    const tags = newValue.map((tag) => {
      return tag.label;
    });
    this.props.changeHandler(tags);
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
    const { options } = this.state;
    return (
      <CreatableSelect
        isMulti
        onChange={this.handleChange}
        onCreateOption={this.handleCreate}
        options={options}
        defaultValue={this.props.defaultValue}
      />
    );
  }
}
