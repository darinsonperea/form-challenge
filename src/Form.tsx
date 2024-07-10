import { useForm } from "react-hook-form";

interface IForm {
  name: string;
  password: string;
}

const messages = {
  weak: "You password needs to have numbers, special characters and must have at least 8 characters",
  medium:
    "Your password needs to contain special characters and must have at least 8 characters",
};

function Form() {
  const { register, formState, handleSubmit } = useForm<IForm>();
  const { errors } = formState;
  const isErrorMessage = errors.password?.message === messages.medium;

  function onSubmit(data: IForm) {
    alert(`new username: ${data.name}, new password: ${data.password}`);
  }

  return (
    <>
      <h4>React Hook Form</h4>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="">New username</label>
          <input
            type="text"
            className={errors.name?.message ? "weak" : ""}
            {...register("name", {
              required: "This field can't be empty",
              minLength: {
                value: 3,
                message: "the length must be at least of 3 characters",
              },
              validate: (value) => {
                if (value === "admin" || value === "root")
                  return "Username not available!";
              },
            })}
          />
          <span className="error">{errors.name?.message}</span>
        </div>
        <div>
          <label htmlFor="">New password</label>
          <input
            type="text"
            className={
              isErrorMessage
                ? "medium"
                : errors.password?.message === undefined
                ? ""
                : "weak"
            }
            {...register("password", {
              required: "This field is required",
              validate: (value) => {
                if (
                  /[a-zA-Z]/.test(value) &&
                  /[0-9]/.test(value) &&
                  /[!@#$%^&*()_+\-=[\]{};':"\\|,<>/?]/.test(value) &&
                  value.length >= 8
                ) {
                  return true;
                } else if (/[0-9]/.test(value) && /[a-zA-Z]/.test(value)) {
                  return messages.medium;
                } else if (/[a-zA-Z]/.test(value)) {
                  return messages.weak;
                } else {
                  return messages.weak;
                }
              },
            })}
          />
          <div className="errors">
            <span className={isErrorMessage ? "medium" : "weak"}>
              {errors.password?.message}
            </span>
          </div>
        </div>
        <button>Submit</button>
      </form>
    </>
  );
}

export default Form;
