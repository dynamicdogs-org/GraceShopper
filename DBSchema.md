User Table

1.  ID
2.  Email
3.  Last Name
4.  First Name
5.  PW:

Product Table

1.  ID
2.  Name
3.  Description
4.  Price
5.  Image
6.  Tags/Department
7.  Stock (Available/Unavailable)

Cart Table Joint Table (User and Product)
( Cart belongs to a User Or User has a Cart )
( Cart has many Products Or Cart belongsToMany Product )

1.  UserId
2.  ProductId
3.  Quantity
4.  Price (current)
5.  Price (when added)

Order Table - BelongsTo Users
User Table - hasMany Orders

1.  userId - Foreign Key - Automatically generate by Sequlize
2.  Address - payment from order form or user data (if available)
3.  Payment ID - payment from order form or user data (if available)
4.  Products: [product ids] - array of products
5.  Order Status - ENUM - [Submitted, Open, Pending, Shipped, Closed]

Address

1.  AddressID
2.  Street
3.  City
4.  State
5.  Country
6.  UserID - (Address belongs to a UserID - One User hasMany Addresses)

Payment ID:

1.  UserID
2.  Payment Name/Type
