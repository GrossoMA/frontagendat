// InputField.jsx

function InputField({ label, name, value, placeholder, onChange, formparams }) {
  return (
    <div className="form-group">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <input
        type="text"
        name={name}
        id={name}
        value={value || ""}
        placeholder={placeholder}
        onChange={onChange}
        className="input"
        {...formparams}
      />
    </div>
  );
}

export default InputField;
