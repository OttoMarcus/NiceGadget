const selectCustomStyles = {
  control: (provided, state) => ({
    ...provided,
    width: "128px",
    height: "32px",
    color: "#F1F2F9",
    background:
      "linear-gradient(335deg, rgba(71,74,84,0.7091211484593838) 0%, rgba(15,17,33,0.9976365546218487) 56%)",
    border: "none",
    outline: "none",
    "&:focus-within": {
      borderColor: "#905BFF",
    },
    "&:hover": {
      borderColor: state.isFocused ? "transparent" : "#4A4D58",
    },
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? "#323542" : "#0F1121",
    color: state.isSelected ? "#F1F2F9" : "#75767F",
    fontFamily: "Mont",
    fontSize: "14px",
    fontWeight: "600",
    lineHeight: "21px",
    "&:hover": {
      backgroundColor: "#323542",
      color: "#F1F2F9",
    },
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#F1F2F9",
    fontFamily: "Mont",
    fontSize: "14px",
    fontWeight: "700",
    lineHeight: "21px",
    textAlign: "center",
  }),
  indicatorsContainer: (provided) => ({
    ...provided,
    backgroundColor: "#323542",
  }),
  indicatorSeparator: (provided) => ({
    ...provided,
    display: "none",
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    color: "#75767F",
    transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : null,
    "&:hover, &:focus": {
      color: "#75767F",
    },
  }),
  menu: (provided) => ({
    ...provided,
    width: "128px",
    backgroundColor: "#0F1121",
    border: "1px solid #905BFF",
  }),
};

export default selectCustomStyles;
