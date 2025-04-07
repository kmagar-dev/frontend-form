import React, { useState } from "react";
import { Container, TextField, Button, Typography, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

// Styled Components
const BackgroundContainer = styled("div")(() => ({
  background: "linear-gradient(to right, #83a4d4, #b6fbff)",
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "30px",
}));

const GlassPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(5),
  borderRadius: "20px",
  background: "rgba(255, 255, 255, 0.25)",
  boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(255, 255, 255, 0.18)",
  width: "100%",
  maxWidth: "500px",
}));

const FormTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: "28px",
  textAlign: "center",
  marginBottom: theme.spacing(3),
  color: "#333",
}));

const StyledForm = styled("form")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
}));

const StyledTextField = styled(TextField)(() => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    backgroundColor: "#ffffffcc",
  },
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  textTransform: "none",
  fontWeight: "600",
  fontSize: "16px",
  borderRadius: "12px",
  padding: theme.spacing(1.5),
  background: "linear-gradient(to right, #667eea, #764ba2)",
  color: "#fff",
  "&:hover": {
    background: "linear-gradient(to right, #5a67d8, #6b46c1)",
  },
}));

const ContactForm = () => {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetch("http://localhost:8080/api/mail/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: email,
        subject: subject,
        message: message,
      }),
    })
      .then((res) => res.text())
      .then((data) => {
        alert(data);
      })
      .catch((err) => console.error("Error:", err));
  };

  return (
    <BackgroundContainer>
      <GlassPaper elevation={3}>
        <FormTitle>Contact Us</FormTitle>
        <StyledForm onSubmit={handleSubmit}>
          <StyledTextField
            label="Full Name"
            variant="outlined"
            fullWidth
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <StyledTextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <StyledTextField
            label="Subject"
            variant="outlined"
            fullWidth
            onChange={(e) => setSubject(e.target.value)}
          />
          <StyledTextField
            label="Message"
            multiline
            rows={4}
            variant="outlined"
            fullWidth
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <SubmitButton type="submit" variant="contained">
            Send Message
          </SubmitButton>
        </StyledForm>
      </GlassPaper>
    </BackgroundContainer>
  );
};

export default ContactForm;
