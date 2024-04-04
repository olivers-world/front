import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";
//  import logo from "../src/assets/logo.svg";
import * as React from "react";

export default function AvisEmail({ authorName, authorEmail, contactText }) {
  const previewText = `Read ${authorName}'s review`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>

      <Body style={main}>
        <Container style={container}>
          <Section>
            {/* <Img src={logo} width="96" height="30" alt="Airbnb" /> */}
          </Section>
          <Section>
            {/* <Img
               src={authorImage}
               width="96"
               height="96"
               alt={authorName}
               style={userImage}
             /> */}
          </Section>
          <Section style={{ paddingBottom: "20px" }}>
            <Row>
              <Text style={heading}>Message du formulaire de contact {authorName} </Text>
              <Text style={name}>De : {authorName} </Text>
              <Text style={review}>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Exercitationem nemo vel rerum, eaque illum ex doloremque,
                obcaecati voluptate perferendis quae, excepturi animi in libero
                perspiciatis accusantium dolore ut voluptas quia.
              </Text>
              <Text style={paragraph}>
                Now that the review period is over, we’ve posted {authorName}
                ’s review to your Airbnb profile.
              </Text>
              <Text style={{ ...paragraph, paddingBottom: "16px" }}>
                While it’s too late to write a review of your own, you can send
                your feedback to {authorName} using your Airbnb message thread.
              </Text>

              <Button style={button} href="https://airbnb.com/">
                Send My Feedback
              </Button>
            </Row>
          </Section>

          <Hr style={hr} />

          <Text style={footer}>
          Oliver’s World restaurant © 178 avenue de la Girolle, 13015 Marseille,
          France. Tel 04.94.26.45.45 | Tous droits réservés.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  width: "580px",
  maxWidth: "100%",
};

const userImage = {
  margin: "0 auto",
  marginBottom: "16px",
  borderRadius: "50%",
};

const heading = {
  fontSize: "32px",
  lineHeight: "1.3",
  fontWeight: "700",
  color: "#484848",
};

const name = {
   fontSize: "28px",
   lineHeight: "1.3",
   fontWeight: "600",
   color: "#484848",
 };

const paragraph = {
  fontSize: "18px",
  lineHeight: "1.4",
  color: "#484848",
};

const review = {
  ...paragraph,
  padding: "24px",
  backgroundColor: "#f2f3f3",
  borderRadius: "4px",
};

const button = {
  backgroundColor: "#81764B",
  borderRadius: "3px",
  color: "#fff",
  fontSize: "18px",
  paddingTop: "19px",
  paddingBottom: "19px",
  textDecoration: "none",
  textAlign: "center",
  display: "block",
  width: "100%",
};

const link = {
  ...paragraph,
  color: "#81764B",
  display: "block",
};

const reportLink = {
  fontSize: "14px",
  color: "#9ca299",
  textDecoration: "underline",
};

const hr = {
  borderColor: "#cccccc",
  margin: "20px 0",
};

const footer = {
  color: "#9ca299",
  fontSize: "14px",
  marginBottom: "10px",
};
