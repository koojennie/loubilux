interface InputProps {
    label: string;
}

export default function Input(props: InputProps) {
    const { label, ...nativeProps } = props;
  return (
    <>
      <label
        htmlFor="name"
        className="form-label text-lg fw-medium color-palette-1 mb-10"
      >
        {label}
      </label>
      <input
        type="text"
        className="form-control !rounded-lg text-lg"
        id="name"
        name="name"
        aria-describedby="name"
        placeholder="Enter your name"
        {...nativeProps}
      />
    </>
  );
}
