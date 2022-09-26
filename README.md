# Online-order-management
Online order management system

# Analyzing the E-Shop Database
first we have need to create the list of table 
# this is the product models where we are create a schema
# 1 Products --->
id: string
name: string
description: string
image: string
brand: string
price: number
category: Category [Array]
Date-of-Creation: Date
# Orders
id: string
orderItems: orderItems[]
shippingAddress1: string
shippingAddress2: string

# Category
id: string
name: string
color: string
icon: string
image: string

# Users
id: string
name: string
email: string
password: string
street: string
apartment: string
city: string
country: string
phone: number
isAdmin: boolean

# OrderItems
 id: string
 product:Product
 quantity: number

# Main Steps
 Products & Category Schema
 Categories REST API
 Post a New Products REST API
 Get list of Products REST API
 Get list of Products REST API By ID
 Population of Category in Get a products API
 Update a Product REST API
 Delete a Product REST API
 Get Product Count for statics Purpose
 filtering