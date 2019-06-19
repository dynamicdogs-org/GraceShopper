import React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'

const OrderProduct = props => {
  const products = props.products
  console.log(props)
  return (
    <List disablePadding>
      <div>
        {products.map((product, idx) => (
          <ListItem key={idx}>
            <ListItemText primary={product.name} />
            <ListItemText
              secondary={`unit price: $${product.displayPrice / 100}`}
            />
            <ListItemText secondary={`quantity: ${product.quantity}`} />
            <Typography variant="body2">
              {`$${product.price * product.quantity / 100}`}
            </Typography>
          </ListItem>
        ))}
      </div>
    </List>
  )
}

export default OrderProduct
