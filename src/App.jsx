import FormF from "./components/FormF"
import Container from "./components/Container"
import Section from "./components/Section"

const compoundInterest = (deposit, contribution, years, rate) => {
  let total = deposit
  for (let i = 0; i < years; i++) {
    total = (total + contribution) * (rate + 1)
  }
  return Math.round(total)
}

const App = () => {



  return (
    <Container>
      <Section>
        <FormF />
      </Section>
    </Container>
  )
}


export default App
