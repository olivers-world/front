import {Body,Button,Container,Head,Hr,Html,Img,Link,Preview,Row,Section,Text} from "@react-email/components";
import * as React from "react";
//  import logo from "../src/assets/logo.svg";

export default function ContactEmail({ authorName, authorEmail, contactText }) {
  return (
    <Html>
      <Head />

      <Body style={main}>
        <Container style={container}>
          <Section>
            {/* <Img src={logo} width="96" height="30" alt="Airbnb" /> */}
          </Section>
          <Section style={{ paddingBottom: "20px" }}>
            <Row>
              <Text style={heading}>Nouveau message du formulaire de contact! {authorName} </Text>
              <Text style={name}>De : {authorName} </Text>
              <Text style={name}>Email : {authorEmail} </Text>
              <Text style={review}>
                {contactText}
              </Text>
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
  fontSize: "28px",
  lineHeight: "1.3",
  fontWeight: "700",
  color: "#484848",
};

const name = {
   fontSize: "24px",
   lineHeight: "1",
   fontWeight: "400",
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
