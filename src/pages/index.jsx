import { useEffect, useState } from "react"
import { instance } from "../ultils"
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';
import { useForm } from "../hooks"
import { Link } from "react-router-dom";

const Home = () => {
    const [projects, setProjects] = useState(null)
    const [filteredProjects, setFilterdProjects] = useState(null)
    const [departments, setDepartments] = useState(null)

    const handleFetch = async () => {
        const res1 = await instance.get("/projects")
        setProjects(res1.data)
        setFilterdProjects(res1.data)
        const res2 = await instance.get("/departments")
        setDepartments(res2.data)
    }

    useEffect(() => {
        handleFetch()
    }, [])

    const getDepartmentFromId = (id) => {
        return departments?.find(d => +d.id === id)?.name
    }

    const departmentForm = useForm({
        department: ""
    })


    const handleChangeDepartment = () => {
        if (departmentForm.values.department === "") {
            setFilterdProjects(projects)
            return
        }
        setFilterdProjects(projects?.filter(p => p.department === +departmentForm.values.department))
    }

    useEffect(() => {
        handleChangeDepartment()
    }, [departmentForm.values])

    return (
        <Container>
            <h3 className="text-center">List of projects</h3>
            <Row>
                <Col xs={ 2 }>
                    <Form.Check type="radio" label="All" { ...departmentForm.getInputProps("department", "radio", "") } />
                    { !departments ? <>Loading</> : departments?.map(d => (
                        <Form.Check key={ d.id } type="radio" label={ d.name } { ...departmentForm.getInputProps("department", "radio", `${d.id}`) } />
                    )) }
                </Col>

                <Col xs={ 10 }>
                    <Button variant="success" className="mb-4" href="/projects/add">
                        Create new Project
                    </Button>
                    {/* <Button onClick={ handleOpenModals }>CLick me!</Button> */ }
                    <Table striped bordered responsive hover>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Project name</th>
                                <th>Description</th>
                                <th>Start date</th>
                                <th>Type</th>
                                <th>Department</th>
                            </tr>
                        </thead>
                        <tbody>
                            { !filteredProjects ? <tr><td colSpan={ 6 }>Loading...</td></tr> :
                                filteredProjects.map(p => (
                                    <tr key={ p.id }>
                                        <td>{ p.id }</td>
                                        <td>{ p.name }</td>
                                        <td>{ p.description }</td>
                                        <td>{ p.startDate }</td>
                                        <td>{ p.type }</td>
                                        <td><Link to={ `departments/${p.department}/employees` }>{ getDepartmentFromId(p.department) }</Link></td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    )
}

export default Home