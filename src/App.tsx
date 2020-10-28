import React from "react";
import logo from "./img/face.png";
import branca from "./img/branca.png";
import extra from "./img/extra.png";
import hooka from "./img/hooka.png";
import os from "./img/os.png";

import styled from "styled-components";
import Modal, { ModalProvider } from "styled-react-modal";
import ReactPlayer from "react-player";
import Rating from "react-rating";

const StyledModal = Modal.styled`
  max-width: 90%;
  width: 20rem;
  height: 20rem;
  display: flex;
  flex-direction: column;
  background-color: lightgrey;
  border-radius: 5px;
  border: 2px solid black;
`;

const ModalHeader = styled.div`
  background-color: blue;
  min-height: 40px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  border-radius: 3px 3px 0 0;
  box-shadow: 0 3px black;
`;

const ModalCloseButton = styled.button`
  margin: 2px 4px 2px auto;
  height: 30px;
  width: 30px;
  display: flex;
  border: 1px solid black;
  justify-content: center;
  align-items: center;
  border-radius: 2px;

  text-decoration: none;
  background: white;
  color: black;
  font-family: sans-serif;
  font-size: 1rem;
  cursor: pointer;
  text-align: center;
  -webkit-appearance: none;
  -moz-appearance: none;
`;

const ModalContent = styled.div`
  margin: 30px 10px;
  line-height: 1.5em;
  font-size: 20px;
  display: flex;
  text-align: center;
`;

const AppContainer = styled.div`
  width: 100vw;
  background-color: whitesmoke;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
`;

const Image = styled.img`
  max-width: 300px;
  max-height: 200px;
`;

const Logo = styled.img`
  max-width: 100px;
  max-height: 50px;
  margin: 10px;
`;

const PlayerWrapper = styled.div`
  max-width: 800px;
  width: 90%;

  margin: 50px 0;
  padding-top: 50%;
  position: relative;
`;

const RatingsWrapper = styled.div`
  margin: 20px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const GiveRatings = () => {
  const initialRatings = [5, 5, 5, 5, 5, 4];
  const [rating, setRating] = React.useState(-1);
  const [ratings, setRatings] = React.useState(initialRatings);

  React.useEffect(() => {
    const localValue = localStorage.getItem("rating");
    if (localValue) {
      setRating(parseInt(localValue));
      if (ratings.length <= initialRatings.length) {
        setRatings([...initialRatings, parseInt(localValue)]);
      }
    }
  }, [initialRatings, ratings.length]);

  const onSubmitRating = (rating: number) => {
    localStorage.setItem("rating", `${rating}`);
    setRating(rating);
    setRatings([...initialRatings, rating]);
    console.log(localStorage.getItem("rating"));
  };

  return (
    <RatingsWrapper>
      <span>Gi rating til Aksel:</span>
      <br />
      <Rating
        initialRating={rating >= 0 ? rating : undefined}
        onClick={(e) => onSubmitRating(e)}
      />
      {rating > 0 && <span>Din rating: {rating}</span>}
      <br />

      <span>
        {Math.round((ratings.reduce((a, b) => a + b) / ratings.length) * 100) /
          100}{" "}
        ({ratings.length} stemmer)
      </span>
    </RatingsWrapper>
  );
};

function App() {
  const [isModalOpen, setIsModalOpen] = React.useState(true);

  const onCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setIsModalOpen(true), 3000);
  };

  return (
    <AppContainer>
      <ModalProvider>
        <StyledModal
          isOpen={isModalOpen}
          onBackgroundClick={onCloseModal}
          onEscapeKeydown={onCloseModal}
        >
          <ModalHeader>
            <ModalCloseButton onClick={onCloseModal}>X</ModalCloseButton>
          </ModalHeader>
          <ModalContent>
            <span>
              Bruk rabattkoden <br />
              <br />
              <code
                style={{
                  backgroundColor: "blue",
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "24px",
                  padding: "10px 10px",
                  margin: "20px",
                }}
              >
                Reiten282
              </code>
              <br />
              <br /> for 28% rabatt på alle produkter fra Oskar Sylte!
            </span>
          </ModalContent>
        </StyledModal>

        <Content>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              padding: "20px 0",
            }}
          >
            <Image src={logo} alt="logo" />
          </div>
          <div
            style={{
              marginTop: "30px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                flexWrap: "wrap",
                borderTop: "1px solid grey",
                borderBottom: "1px solid grey",
                padding: "10px 0",
              }}
            >
              <Logo src={branca} />
              <Logo src={hooka} />
              <Logo src={os} />
              <Logo src={extra} />
            </div>
          </div>

          <GiveRatings />

          <PlayerWrapper>
            <ReactPlayer
              url="https://www.youtube.com/watch?v=gjad6ISwjZE"
              playing={true}
              loop={true}
              width="100%"
              height="100%"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
              }}
            />
          </PlayerWrapper>
        </Content>
      </ModalProvider>
    </AppContainer>
  );
}

export default App;
