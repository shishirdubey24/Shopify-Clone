import { Link } from 'react-router-dom';
import useCategory from '../hooks/CategoryHook';
import Layout from '../components/Layout/Layout';
import { Container, Row, Col, Card } from 'react-bootstrap'; // Import Bootstrap components

const Category = () => {
  const categories = useCategory();

  return (
    <Layout title={"Category"}>
      <Container>
        <h1 className="mt-5 mb-4">All Categories</h1>
        <Row>
          {categories?.map(category => (
            <Col key={category._id} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <Card className="h-100">
                <Card.Body>
                  <Link to={`/category/${category.slug}`} className="text-decoration-none text-dark">
                    <Card.Title>{category.name}</Card.Title>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </Layout>
  );
}

export default Category;
