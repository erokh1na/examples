import { useFormValidator } from "@/core/lib"
import clsx from "clsx"
import styles from "./page-form-validator.module.scss"

export const PageFormValidator = () => {
  const INITIAL_DATA = { name: "", email: "" }
  const INITIAL_ERROR = { name: "", email: "" }
  const rules = {
    name: { required: true, min: 4 },
    email: { required: true, email: true },
  }

  const form = useFormValidator({
    initialData: INITIAL_DATA,
    initialError: INITIAL_ERROR,
    validationRules: rules,
  })

  return (
    <>
      <form
        action=""
        onSubmit={(e) => {
          console.log("formData:", form.submit(e))
        }}
        className={styles.form}
      >
        <label className={styles.label}>
          Name:
          <input
            className={clsx(styles.input, { [styles["input-error"]]: form.error.name })}
            type="text"
            name="name"
            placeholder="JimiHendrix"
            value={form.data.name}
            onChange={form.change}
            autoFocus
          />
          <div className={clsx(styles["error-container"], { [styles["error-container-visible"]]: form.error.name })}>
            <span className={styles.error}>{form.error.name}</span>
          </div>
        </label>

        <label className={styles.label}>
          Email:
          <input
            className={clsx(styles.input, { [styles["input-error"]]: form.error.email })}
            type="text"
            name="email"
            placeholder="rock@star.com"
            value={form.data.email}
            onChange={form.change}
          />
          <div className={clsx(styles["error-container"], { [styles["error-container-visible"]]: form.error.email })}>
            <span className={styles.error}>{form.error.email}</span>
          </div>
        </label>

        <button className={styles.button} type="submit">
          Отправить
        </button>
      </form>
    </>
  )
}
