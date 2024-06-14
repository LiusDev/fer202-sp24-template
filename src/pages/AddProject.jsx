import { Container, Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from '../hooks';
import { useEffect, useState } from 'react';
import { instance } from '../ultils';

const AddProject = () => {

    const [departments, setDepartments] = useState(null)

    const handleGetDepartments = async () => {
        const res = await instance.get("/departments")
        setDepartments(res.data)
    }

    useEffect(() => {
        handleGetDepartments()
    }, [])


    const form = useForm({
        name: "",
        description: "",
        startDate: "",
        type: "",
        department: "1"
    })

    const validateName = () => {
        if (form.values.name.length === 0) {
            alert("Please enter the form fields that are required")
            return false
        }
        return true
    }

    const navigate = useNavigate()
    const handleCreateProject = async (e) => {
        e.preventDefault()
        if (!validateName()) {
            return
        }

        try {
            await instance.post("/projects", { ...form.values, department: parseInt(form.values.department) })
            alert("Create success")
            navigate("/")
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Container>
            <h3 className='text-center mb-4'>Add a new Project</h3>
            <Link to="/" className='mb-4'>Home page</Link>
            <Form className='my-4' onSubmit={ handleCreateProject }>
                <Form.Label>Project name *</Form.Label>
                <Form.Control type="text" { ...form.getInputProps("name") } className='mb-2' />
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" { ...form.getInputProps("description") } className='mb-2' />
                <Form.Label>Start date</Form.Label>
                <Form.Control type="date" { ...form.getInputProps("startDate") } className='mb-2' />
                <Form.Label>Type</Form.Label>
                <Form.Control type="text" { ...form.getInputProps("type") } className='mb-2' />
                <Form.Label>Department</Form.Label>
                <Form.Select { ...form.getInputProps("department") }>
                    { !departments ? <option value="">Loading...</option> : departments?.map(d => (
                        <option key={ d.id } value={ d.id }>{ d.name }</option>
                    )) }
                </Form.Select>
                <Button type='submit' className='mt-4'>Create</Button>
            </Form>

        </Container>
    )
}

export default AddProject