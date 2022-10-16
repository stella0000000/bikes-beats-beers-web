import styled from 'styled-components'

// fix type
const Journey = (props: any) => {
  console.log(props)
  return (
    <div>
      destination, playlist, beer place
    </div>
  )
}

export default Journey

// fix type
export  const getServerSideProps= (ctx: any)=> {
  const query = ctx.query

  return {
      props: {
         destination: query.destination,
         playlist: query.playlist
      }
  }
}
