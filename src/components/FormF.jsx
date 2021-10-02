import { Form, Formik } from 'formik'
import * as Yup from "yup"
import { useState } from 'react'
import Button from './Button'
import Input from "./Input"
import Balance from "./Balance"
const compoundInterest = (deposit, contribution, years, rate) => {
  let total = deposit
  for (let i = 0; i < years; i++) {
    total = (total + contribution) * (rate + 1)
  }
  return Math.round(total)
}

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

const FormF = () => {

  const [balance, setBalance] = useState(0)

  const handleSubmit = ({ deposit, contribution, years, rate }) => {
    const val = compoundInterest(Number(deposit), Number(contribution), Number(years), Number(rate))
    setBalance(formatter.format(val))
  }

  return (
    <>
      <Formik
        initialValues={{
          deposit: "",
          contribution: "",
          years: "",
          rate: "",
        }}
        onSubmit={handleSubmit}
        validationSchema={Yup.object({
          deposit: Yup
            .number()
            .required("Obligatorio")
            .typeError("Debe ser un numero"),
          contribution: Yup
            .number()
            .required("Obligatorio")
            .typeError("Debe ser un numero"),
          years: Yup
            .number()
            .required("Obligatorio")
            .typeError("Debe ser un numero"),
          rate: Yup
            .number()
            .required("Obligatorio")
            .typeError("Debe ser un numero")
            .min(0.01, "El valor minimo es 0.1")
            .max(1, "El valor maximo es 1"),
        })}
      >
        <Form>
          <Input
            name="deposit"
            label="Deposito Inicial"
          />

          <Input
            name="contribution"
            label="Contribucion Anual"
          />

          <Input
            name="years"
            label="Años"
          />

          <Input
            name="rate"
            label="Interes Estimado"
          />

          <Button
            type="submit"
          >Enviar</Button>
        </Form>
      </Formik>
      {balance !== 0 ? <Balance>Balance Final: {balance}</Balance> : null}
    </>
  )
}

export default FormF
