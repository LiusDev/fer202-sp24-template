import { Form, Container } from 'react-bootstrap';
import { useForm } from '../hooks';

const Home = () => {

    const form = useForm({
        email: "",
        password: "",
        remember: []
    })

    console.log({
        ...form.values,
        remember: form.values.remember.length > 0
    });

    return <Container>
        <form action="">
            <Form.Control type="text" placeholder="Email" { ...form.getInputProps("email") } />
            <Form.Control type="password" placeholder="Password" { ...form.getInputProps("password") } />
            <Form.Check type="checkbox" label="Remember me" { ...form.getInputProps("remember", "checkbox", "true") } />
        </form>
        <button onClick={ () => form.setFieldValue("email", "quydeptrai@gmail.com") }>Set email to quydeptrai@gmail.com</button>
    </Container>
}

export default Home