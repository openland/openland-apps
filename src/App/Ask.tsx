import * as React from 'react';
import { Segment, Container, Header, Form, Button } from 'semantic-ui-react';
export function Ask() {
    return (
        <div style={{ marginTop: 64 }}>
            <Container>
                <Segment>
                    <Header
                        as="h1"
                        content="Ask Questions"
                    />
                    <Header
                        as="h3"
                        content="Here you can request your question from government"
                    />
                    <Form>
                        <label>Message</label>
                        <Form.TextArea required={true} />
                        <Button content="Submit" />
                    </Form>
                </Segment>
            </Container>
        </div>
    );
}