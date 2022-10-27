import Image from "next/image"
import styled from "styled-components"

const Logo = styled.div`
  -webkit-filter: invert(100%);
  filter: invert(100%);
`

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-size: 15px;
  height: 70%;
  color: #d0d0d0;

  @media only screen and (min-width: 700px) {
    font-size: 20px;
  }
`

const Details = styled.div`
  width: 80vw;
  font-size: 14px;
  font-style: italic;
  padding: 20px 0px 7px 0px;

  @media only screen and (min-width: 700px) {
    width: 55vw;
    font-size: 17px;
  }
`

// fix type
export const BeerResult = ({
  destination,
  details
}: any) => {
    const formatPriceAndRating = (price: number, rating: string) => {
        if (price && rating) {
          return ("$").repeat(destination.price_level) + ` / ` + `✰ ${destination.rating} ✰`
        } else if (price) {
          return ("$").repeat(destination.price_level)
        } else {
          return `✰ ${destination.rating} ✰`
        }
      }
    
      const formatReview = (review: string) => {
        const maxLength = 150
        if (review.length > maxLength) {
          return `${review.slice(0, maxLength)}...`
        } else {
          return review
        }
      }
      
    return (
        <>
          <Logo>
            <Image src="/beer.png" alt="beer" width={100} height={90} />
          </Logo>
          <Content>
              <a href={details.url} target="_blank" rel="noreferrer">{destination.name} ↗</a>
              {destination.vicinity}<br></br>
              {/* Open til {formatTime(closingTime)}<br></br> */}
              {formatPriceAndRating(destination.price_level, destination.rating)}<br></br><br></br>
              <Details>
                  &laquo; {formatReview(details.review)} &raquo; - random reviewer
              </Details>
          </Content>
        </>
    )
}

// make clear i did not write the review