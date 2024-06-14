import { Container, Table } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { instance } from '../ultils';
import { useEffect, useState } from 'react';

const Employees = () => {
    const { id } = useParams()
    const [employees, setEmployees] = useState(null)
    const [department, setDepartment] = useState(null)
    const handleFetch = async () => {
        const res0 = await instance.get(`/departments/${id}`)
        setDepartment(res0.data)
        const res = await instance.get("/employees", {
            params: {
                department: id
            }
        })
        setEmployees(res.data)
    }

    useEffect(() => {
        handleFetch()
    }, [id])

    return (
        <Container>
            <h3 className='text-center mb-4'>List of Employees</h3>
            <Link to="/">Home page</Link>
            <h4 className='mb-3'>Department: { !department ? "Loading..." : department.name }</h4>
            <Table striped bordered responsive hover>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Employee name</th>
                        <th>Date of birth</th>
                        <th>Gender</th>
                        <th>Position</th>
                    </tr>
                </thead>
                <tbody>
                    { !employees ? <tr><td colSpan={ 5 }>Loading...</td></tr> : employees.map(e => (

                        <tr key={ e.id }>
                            <td>{ e.id }</td>
                            <td>{ e.name }</td>
                            <td>{ e.dob }</td>
                            <td>{ e.gender }</td>
                            <td>{ e.position }</td>
                        </tr>
                    )) }
                </tbody>
            </Table>
        </Container>
    )
}

export default Employees