import React from 'react'
import {Link as RouterLink} from 'react-router-dom'
import Link from '@material-ui/core/Link'
import {makeStyles} from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles({
  card: {
    maxWidth: 345
  },
  media: {
    height: 140
  }
})

const SingleProduct = props => {
  const classes = useStyles()
  const {id, name, image, displayPrice, description} = props.product
  const {userId} = props
  const {handleAddToCart} = props
  return (
    <Card className={classes.card}>
      <Link
        color="inherit"
        underline="none"
        component={RouterLink}
        to={`/products/${id}`}
      >
        <CardActionArea>
          <CardMedia className={classes.media} image={image} title={name} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Description: {description}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Price: {displayPrice}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
      <CardActions>
        <Button
          size="small"
          color="primary"
          onClick={() => handleAddToCart(userId, id)}
        >
          Add To Cart
        </Button>

        <Link color="inherit" component={RouterLink} to={`/products/${id}`}>
          <Button size="small" color="primary">
            Learn More
          </Button>
        </Link>
      </CardActions>
    </Card>
  )
}

export default SingleProduct
