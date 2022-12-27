import Layout from '../../hocs/layout'
import { useParams, useParams } from 'react-router'

const Activate = () => {
    const params = useParams()
    const uid = params.uid
    const token = params.token
    return (
        <Layout>Activate</Layout>
    )
}

export default Activate