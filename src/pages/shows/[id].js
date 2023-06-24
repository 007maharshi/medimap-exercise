import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useState } from "react";
import { FaStar } from "react-icons/fa";

const outerContainerStyles = css`
  padding: 20px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const innerContainerStyles = css`
    display: flex; 
    flex-direction: column;
    
    @media (max-width: 768px) {
        align-items: center;
    }
`;

const nameContainerStyles = css`
  font-weight: lighter;
`;

const showDetailsContainerStyles = css`
    display: flex;
    gap: 1rem; 
    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
`;

const imageContainerStyles = css`
  width: 100%;
  max-width: 400px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    order: 2;
    width: 80%;
  }
`;

const imageStyles = css`
  width: 100%;
  height: auto;
`;

const contentContainerStyles = css`
  text-align: center;
  flex: 1;
  padding: inherit;
  width: 100%;

  @media (max-width: 768px) {
    order: 1;
    text-align: center;
    width: 80%;
  }
`;

const showInfoContainerStyles = css`
  padding: 20px;
  color: black;
  background-color: #F7F7F7;
  border-radius: 4px;
  margin-bottom: 35px;

  @media (max-width: 768px) {
    order: 3;
    padding-left: 20px;
  }

  @media (max-width: 480px) {
    font-size: 10px;
  }
`;

const showInfoHeadingStyles = css`
  font-weight: lighter;
`;

const itemListStyles = css`
  margin-top: 10px;
  padding-left: 0;
  list-style-type: none;
`;

const itemStyles = css`
  margin-bottom: 5px;
`;

const OuterContainer = styled.div`
  ${outerContainerStyles}
`;

const InnerContainer = styled.div`
  ${innerContainerStyles}
`;

const NameContainer = styled.h1`
    ${nameContainerStyles}
`;

const ShowDetailsContainer = styled.div`
    ${showDetailsContainerStyles}
`;

const ImageContainer = styled.div`
  ${imageContainerStyles}
`;

const Image = styled.img`
  ${imageStyles}
`;

const ContentContainer = styled.div`
  ${contentContainerStyles}
`;

const ShowInfoContainer = styled.div`
  ${showInfoContainerStyles}
`;

const ShowInfoHeading = styled.h2`
  ${showInfoHeadingStyles}
`;
const ItemList = styled.ul`
  ${itemListStyles}
`;

const Item = styled.li`
  ${itemStyles}
`;

const ShowDetails = ({ data: show }) => {
  const ShowSchedule = ({ time, days }) => 
    <>
        {days.join(", ")} at {time} (30 min)
    </>
    
  const ShowRating = ({ average }) => {
    const [rating] = useState(average);

    const renderShowStars = () => {
      const showStars = [];
      const maxShowRating = 10;
      const filledStars = Math.floor((rating / maxShowRating) * 5);

      for (let i = 0; i < 5; i++) {
        showStars.push(
          <FaStar
            key={i}
            color={i < filledStars ? "#ffc107" : "#e4e5e9"}
            size={24}
          />
        );
      }

      return showStars;
    };

    return <div>{renderShowStars()}</div>;
  };

  const renderSummary = () => {
    return { __html: show.summary };
  };

  return (
    <OuterContainer>
      <InnerContainer>
          <NameContainer>{show.name}</NameContainer>
        <ShowDetailsContainer>
          <ImageContainer>
            <Image
              src={show.image?.medium || show.image?.original}
              alt={show.name}
            />
          </ImageContainer>
          <ContentContainer>
            <div
              className="summaryContainer"
              dangerouslySetInnerHTML={renderSummary()}
            />
          </ContentContainer>
          <ShowInfoContainer>
            <ShowInfoHeading>Show Info</ShowInfoHeading>
            <ItemList className="itemList">
              <Item className="item">
                <strong>Network:</strong> {show.network?.name} (
                {show.premiered.substring(0, 4)} - now)
              </Item>
              <Item className="item">
                <strong>Schedule: </strong>
                <ShowSchedule
                  time={show.schedule?.time}
                  days={show.schedule?.days}
                />
              </Item>
              <Item className="item">
                <strong>Status: </strong>{show.status}
              </Item>
              <Item className="item">
                <strong>Show Type: </strong>{show.type}
              </Item>
              <Item className="item">
                <strong>Genres: </strong>{show.genres.join(" | ")}
              </Item>
              <Item className="item">
                <strong>Official Site: </strong>
                <a href={show.officialSite}>{show.officialSite}</a>
              </Item>
              <Item>
                <div>
                  <ShowRating average={show.rating?.average} />
                </div>
              </Item>
            </ItemList>
          </ShowInfoContainer>
        </ShowDetailsContainer>
      </InnerContainer>
    </OuterContainer>
  );
};

export default ShowDetails;

export async function getServerSideProps(context) {
  const { id } = context.query;

  const res = await fetch(`https://api.tvmaze.com/shows/${id}`);
  const data = await res.json();

  return { props: { data } };
}
