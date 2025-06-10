interface InputProps {
    label: string;
    placeholder: string;
    nameInput: string;
    value?: string | number;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type: "text" | "password" | "hidden" | "email";
}

export default function Input(props: InputProps) {
    const { label, nameInput , placeholder, value, type, onChange, ...nativeProps } = props;
  return (
    <>
      <label
        htmlFor="name"
        className="form-label text-lg fw-medium color-palette-1 mb-10"
      >
        {label}
      </label>
      <input
        type={type}
        className="form-control !rounded-lg text-lg"
        id={nameInput}
        name={nameInput}
        aria-describedby="name"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...nativeProps}
      />
    </>
  );
}
