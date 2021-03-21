import Head from 'next/head'
import '../styles/Home.module.css'
import { Container, Row, Col, FormInput, Form, Button, Card, CardBody, CardSubtitle, CardTitle, CardFooter, Progress } from "shards-react";
import { useState } from 'react';
import { Result } from '../lib/Result';

export default function Home() {
  const [results, setResults] = useState([])
  const [keywords, setKeywords] = useState(null)
  const [searching, setSearching] = useState(false)
  const handleChange = (e) => {
    setKeywords(e.target.value)
  }
  const doSearch = async (e) => {
    e.preventDefault();
    setSearching(true)
    const api_search = await fetch(`/api/search?criteria=${keywords}`)
    const content = await api_search.json()
    setResults(content.hits.hits.map(hit => ({...hit._source, content: hit.highlight.content})))
    setSearching(false)
  }
  return (
    <Container>
      <Row>
        <Col sm={{ size: 8, order: 2, offset: 2 }}>
          <Form onSubmit={doSearch}>
            <FormInput size="lg" placeholder="Entrez votre recherche et cliquez sur Rechercher" onChange={handleChange}/>
            <Button action="submit" block>Rechercher</Button>
          </Form>
        </Col>
      </Row>
      { searching && <Row>
        <Col sm={{ size: 10, offset: 1 }}><Progress theme="primary" animated={true} stripped="true" value="100"/></Col>
      </Row> }
        { results.map( res => <Result row={res}/>) }
        
    </Container>
  )
}
