import React from "react";
import logo from "./IMG_1800.jpeg";
import "./App.css";
import styled from "styled-components";
import Modal, { ModalProvider } from "styled-react-modal";
import ReactPlayer from "react-player";

const StyledModal = Modal.styled`
  width: 20rem;
  height: 20rem;
  display: flex;
  flex-direction: column;
  background-color: lightgrey;
  border-radius: 5px;
`;

const ModalHeader = styled.div`
  background-color: blue;
  height: 40px;
  display: flex;
  align-items: center;
`;

const ModalCloseButton = styled.button`
  margin: 0 10px 0 auto;
  height: 30px;
  width: 30px;
`;

const ModalContent = styled.div`
  margin: 30px 10px;
  line-height: 1.5em;
  font-size: 20px;
`;

function App() {
  const [isModalOpen, setIsModalOpen] = React.useState(true);

  const toggleModal = () => setIsModalOpen((prev) => !prev);

  const onCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setIsModalOpen(true), 1500);
  };

  return (
    <div className="App">
      <ModalProvider>
        <StyledModal
          isOpen={isModalOpen}
          onBackgroundClick={toggleModal}
          onEscapeKeydown={toggleModal}
        >
          <ModalHeader>
            <ModalCloseButton onClick={onCloseModal}>X</ModalCloseButton>
          </ModalHeader>
          <ModalContent>
            <span>
              Bruk rabattkoden <br />
              <code
                style={{
                  backgroundColor: "lightblue",
                  fontWeight: "bold",
                  padding: "0 10px",
                }}
              >
                Reiten28
              </code>
              <br /> for 28% rabatt på alle produkter fra Oskar Sylte!
            </span>
          </ModalContent>
        </StyledModal>
        <header className="App-header">
          <img
            src={logo}
            className="App-logo"
            alt="logo"
            style={{ borderRadius: "500px" }}
          />
          <p>Aksel Reiten</p>
          <ReactPlayer
            url="https://www.youtube.com/watch?v=gjad6ISwjZE"
            playing={true}
            width={0}
            height={0}
            loop={true}
          />
        </header>
      </ModalProvider>
    </div>
  );
}

export default App;
