import { useState } from "react"
import { Card, CardBody, Button, CardSubtitle, CardTitle, CardFooter, Row, Col, Modal, ModalBody, ModalHeader } from "shards-react";
export const Result = ({row}) => {
    const [modalOpen, setModalOpen] = useState(false)
    const image_url = `https://storage.googleapis.com/wooline-larem-idf54kje3l/thumbs/${row.file}/${("000000" + (row.page-1)).substr(-5,5)}.jpg`
    const file_url = `https://storage.googleapis.com/wooline-larem-idf54kje3l/pdfs/${row.file}#page=${row.page}`
    return <Row key={row.file + row.page}>
        <Col sm={{ size: 10, offset: 1 }}>
        <Card>
            <CardBody>
            <CardTitle>{row.title}</CardTitle>
            <CardSubtitle>{row.instance} - {new Date(Date.parse(row.date)).toLocaleDateString()}</CardSubtitle>
            <img onClick={() => setModalOpen(true)} className="thumb" src={image_url}/>
            <p dangerouslySetInnerHTML={{__html: row.content}}></p>
            <Modal style="overflow-y: auto;" className="fullimg" size="lg" open={modalOpen} toggle={() => setModalOpen(!modalOpen)}>
                <ModalHeader><Button tag="a" target="_blank" size="sm" href={file_url} theme="secondary">Accéder au fichier {row.file} - page {row.page} </Button></ModalHeader>
                <ModalBody><img className="full" src={image_url}/></ModalBody>
            </Modal>
            </CardBody>
            <CardFooter><Button tag="a" target="_blank" href={file_url} theme="secondary">Accéder au fichier</Button></CardFooter>
        </Card>
        </Col>
    </Row>
}