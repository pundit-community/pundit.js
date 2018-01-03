import React from 'react'

const When = ({
  can,
  user,
  policy,
  resource,
  children
}) => policy[can](user, resource) ? children : null

export default When
