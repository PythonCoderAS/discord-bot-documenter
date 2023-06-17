"use client"

import {Button, Card, Col, Container, Row} from "react-bootstrap";

function BotLink({botName, slug}: {botName: string, slug: string}) {
    return (
            <Col>
                <div className="d-grid">
                <Button variant="outline-secondary" size="lg" href={`./${slug}`}>
                    {botName}
                </Button>
            </div>
            </Col>
    )
}

export default function Home() {
  return (
          <div style={{
              display: "flex",
              alignItems: "center",
              minHeight: "95vh"
          }}>
              <div style={{border: "1px solid black",
              width: "50%",
              margin: "auto",padding: 20}}>
              <h1 className="text-center">Choose a Discord Bot</h1>
                <hr />
                  <Container>
                      <Row>
                          <BotLink botName="PokestarBot" slug="pokestarbot"/>
                          <BotLink botName="MangaReleaseBot" slug="mangareleasebot" />
                      </Row>
                  </Container>
              </div>
          </div>
  )
}
