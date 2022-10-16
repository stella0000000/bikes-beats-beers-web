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

export  const getServerSideProps= (ctx)=> {
  const query = ctx.query

  return {
      props: {
         destination: query.destination,
         playlist: query.playlist
      }
  }
}
