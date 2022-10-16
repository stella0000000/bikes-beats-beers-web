const Journey = (props) => {
  console.log(props)
  return (
    <div>
      destination, playlist, beer place
    </div>
  )
}

export default Journey

export  const getServerSideProps= (ctx)=> {
  console.log(ctx.query)
  return {
      props: {
         destination: ctx.query.destination //pass it to the page props
      }
  }
}
