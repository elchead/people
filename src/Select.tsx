import React, { Component } from "react";

// import CreatableSelect from "react-select/creatable";
// import { ActionMeta, OnChangeValue } from "react-select";

// interface Option {
//   readonly label: string;
//   readonly value: string;
// }

// interface State {
//   readonly isLoading: boolean;
//   readonly options: readonly Option[];
//   readonly value: Option | null | undefined;
// }

// const createOption = (label: string) => ({
//   label,
//   value: label.toLowerCase().replace(/\W/g, ""),
// });

// const defaultOptions = [
//   createOption("Family"),
//   createOption("Stifti"),
//   createOption("TUM"),
//   createOption("VIP"),
// ];

// interface CommonProps {
//   contact: Contact;
//   label: string;
//   placeholder: string;
//   multiline: boolean;
//   editing: boolean;
//   setPending: (c: Contact) => void;
//   save: () => void;
// }

// interface ScalarFieldProps extends CommonProps {
//   value: string;
// }
// export function ScalarField({
//   contact,
//   label,
//   editing,
//   value,
//   placeholder,
//   multiline,
//   save,
//   setPending,
// }: ScalarFieldProps) {
//   if (!editing && !value) {
//     return null;
//   }
//   const persistIfEnter = (e: React.KeyboardEvent) => {
//     if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
//       save();
//     }
//   };

//   const Tag = multiline ? "textarea" : "input";
//   return (
//     <div className="inputGroup">
//       <label className="contact-label">{label}</label>
//       <div className="entries">
//         {editing ? (
//           <Tag
//             type="text"
//             name={label}
//             /* kludge hack to avoid autofill nonsense */
//             id={`search-${label}`}
//             value={value}
//             className="contact-input"
//             autoComplete="off"
//             onKeyDown={persistIfEnter}
//             onChange={(e) => {
//               setPending(
//                 produce(contact, (c) => {
//                   c[label] = e.currentTarget.value;
//                 })
//               );
//             }}
//             placeholder={placeholder}
//           />
//         ) : (
//           <div>{value}</div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default class Select extends Component<{}, State> {
//   state: State = {
//     isLoading: false,
//     options: defaultOptions,
//     value: undefined,
//   };
//   handleChange = (
//     newValue: OnChangeValue<Option, false>,
//     actionMeta: ActionMeta<Option>
//   ) => {
//     console.group("Value Changed");
//     console.log(newValue);
//     console.log(`action: ${actionMeta.action}`);
//     console.groupEnd();
//     this.setState({ value: newValue });
//   };
//   handleCreate = (inputValue: string) => {
//     this.setState({ isLoading: true });
//     console.group("Option created");
//     console.log("Wait a moment...");
//     setTimeout(() => {
//       const { options } = this.state;
//       const newOption = createOption(inputValue);
//       console.log(newOption);
//       console.groupEnd();
//       this.setState({
//         isLoading: false,
//         options: [...options, newOption],
//         value: newOption,
//       });
//     }, 1000);
//   };
//   render() {
//     const { isLoading, options, value } = this.state;
//     return (
//       <CreatableSelect
//         isClearable
//         isDisabled={isLoading}
//         isLoading={isLoading}
//         onChange={this.handleChange}
//         onCreateOption={this.handleCreate}
//         options={options}
//         value={value}
//       />
//     );
//   }
// }
